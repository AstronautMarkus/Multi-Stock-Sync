import React, { useState } from 'react';
import styles from './CrearProducto.module.css';

const CrearProducto: React.FC = () => {
  const [titulo, setTitulo] = useState('');
  const [categorias, setCategorias] = useState<{ id: string, name: string }[]>([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [atributos, setAtributos] = useState<any[]>([]);
  const [producto, setProducto] = useState<any>({});

  const handleTituloChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitulo(e.target.value);
  };

  const buscarCategorias = async () => {
    if (!titulo.trim()) return alert('Por favor, ingresa un título.');

    try {
      const SITE_ID = 'MLC';
      const url = `https://api.mercadolibre.com/sites/${SITE_ID}/domain_discovery/search?q=${encodeURIComponent(titulo)}`;
      console.log('Buscando categorías con URL:', url);
      const response = await fetch(url);
      const data = await response.json();
      console.log(response)
      if (data && Array.isArray(data) && data.length > 0) {
        setCategorias(data.map((item: any) => ({
          id: item.category_id,
          name: item.category_name,
        })));
        console.log('Categorías encontradas:', data);
      } else {
        setCategorias([]);
        alert('No se encontraron categorías relacionadas.');
      }
    } catch (error) {
      console.error('Error al buscar categorías:', error);
      alert('Hubo un error al buscar categorías.');
    }
  };

  const obtenerAtributosCategoria = async (categoria: string) => {
    try {
      console.log('Obteniendo atributos para la categoría:', categoria);
      const url = `https://api.mercadolibre.com/categories/${categoria}/attributes`;
      console.log('Llamando a la URL de atributos:', url);
      const response = await fetch(url);
      const data = await response.json();

      if (data && Array.isArray(data) && data.length > 0) {
        setAtributos(data.filter((attr: any) => attr.tags?.required));
        console.log('Atributos obligatorios encontrados:', data);
      } else {
        setAtributos([]);
        alert('No se encontraron atributos obligatorios para esta categoría.');
      }
    } catch (error) {
      console.error('Error al obtener atributos de la categoría:', error);
      alert('Hubo un error al obtener los atributos de la categoría.');
    }
  };

  const handleCategoriaSeleccionada = (categoria: string) => {
    console.log('Categoría seleccionada:', categoria);
    setCategoriaSeleccionada(categoria);
    setProducto({ titulo, categoria });
    obtenerAtributosCategoria(categoria);
  };

  const handleAtributoChange = (id: string, value: string) => {
    setProducto((prevProducto: any) => ({
      ...prevProducto,
      [id]: value,
    }));
  };

  const crearProducto = async () => {
    try {
      const url = `https://api.mercadolibre.com/items`;
      console.log('Enviando producto a:', url);

      // Example payload with product data
      const payload = {
        title: producto.nombre || "Sin título",
        category_id: categoriaSeleccionada,
        price: producto.precio || 0,
        currency_id: "CLP",
        available_quantity: producto.cantidad || 1,
        buying_mode: "buy_it_now",
        listing_type_id: "gold_special",
        condition: producto.condition || "new",
        description: {
          plain_text: producto.descripcion || "Sin descripción",
        },
        pictures: [
          { source: "https://example.com/image1.jpg" }, // Add image pictures
        ],
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer YOUR_ACCESS_TOKEN`, // Use your access token
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("Respuesta al crear producto:", data);

      if (response.ok) {
        alert("Producto creado exitosamente.");
      } else {
        alert("Error al crear el producto: " + data.message);
      }
    } catch (error) {
      console.error("Error al crear el producto:", error);
      alert("Hubo un error al intentar crear el producto.");
    }
  };


  return (
    <div className={styles.crearProducto}>
      <h1>Crear Producto</h1>

      <div className="mb-3">
        <input
          type="text"
          value={titulo}
          onChange={handleTituloChange}
          placeholder="Ingresa el título del producto"
          className="form-control"
        />
        <button onClick={buscarCategorias} className="btn btn-primary mt-2">Buscar categorías</button>
      </div>

      {categorias.length > 0 && (
        <div>
          <h2>Categorías sugeridas:</h2>
          <ul>
            {categorias?.map((categoria) => (
              <li key={categoria.id}>
                <button onClick={() => handleCategoriaSeleccionada(categoria.id)} className="btn btn-success">
                  {categoria.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {atributos.length > 0 && (
        <div>
          <h2>Atributos obligatorios para la categoría seleccionada</h2>
          <form>
            {atributos.map((atributo) => (
              <div key={atributo.id} className="mb-3">
                <label>{atributo.name}</label>
                {atributo.values && atributo.values.length > 0 ? (
                  <select
                    onChange={(e) => handleAtributoChange(atributo.id, e.target.value)}
                    className="form-select"
                  >
                    <option value="">Seleccione una opción</option>
                    {atributo.values.map((value: any) => (
                      <option key={value.id} value={value.id}>
                        {value.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    onChange={(e) => handleAtributoChange(atributo.id, e.target.value)}
                    className="form-control"
                  />
                )}
              </div>
            ))}
          </form>
        </div>
      )}

      <button onClick={crearProducto} className="btn btn-primary">Crear Producto</button>

      {categoriaSeleccionada && (
        <div>
          <h3>Producto generado:</h3>
          <pre>{JSON.stringify(producto, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CrearProducto;
