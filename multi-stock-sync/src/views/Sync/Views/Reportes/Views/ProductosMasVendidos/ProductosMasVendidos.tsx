import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";

const ProductosMasVendidos: React.FC = () => {
    const { client_id } = useParams<{ client_id: string }>();
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Estado para la paginación
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchProducts = async () => {
        try {
            const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/mercadolibre/top-selling-products/${client_id}`
            );

            if (response.data.status === "success" && Array.isArray(response.data.data)) {
            setData(response.data.data);
            } else {
            setError("Error al procesar los datos recibidos.");
            }
        } catch (err) {
            console.error("Error al conectar con la API:", err);
            setError("No se pudo conectar con la API.");
        } finally {
            setLoading(false);
        }
        };

        fetchProducts();
    }, [client_id]);

    if (loading) return <p>Cargando datos...</p>;
    if (error) return <p>Error: {error}</p>;

  // Obtener métricas
    const mostSoldProduct = data.reduce((prev, current) =>
        current.quantity > prev.quantity ? current : prev
    );
    const mostRepeatedProduct = data.reduce((prev, current) =>
        current.total_sales > prev.total_sales ? current : prev
    );
    const leastSoldProduct = data.reduce((prev, current) =>
        current.quantity < prev.quantity ? current : prev
    );

  // Datos para la paginación
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Manejo de la paginación
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };
    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

  // Datos para los gráficos
    const chartDataBar = {
        labels: data.map((item) => item.title),
        datasets: [
        {
            label: "Cantidad Vendida",
            data: data.map((item) => item.quantity),
            backgroundColor: "rgba(75, 192, 192, 0.5)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
        },
        ],
    };

    const chartDataPie = {
        labels: data.map((item) => item.title),
        datasets: [
        {
            label: "Ventas Totales",
            data: data.map((item) => item.total_sales),
            backgroundColor: data.map(
            () => `hsl(${Math.random() * 360}, 70%, 70%)` // Colores aleatorios
            ),
            borderWidth: 1,
        },
        ],
    };

    return (
        <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Productos Más Vendidos</h1>

        {/* Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold">Producto Más Vendido</h2>
            <p>{mostSoldProduct.title}</p>
            <p className="text-sm text-gray-600">Cantidad: {mostSoldProduct.quantity}</p>
            </div>
            <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold">Producto Más Repetido</h2>
            <p>{mostRepeatedProduct.title}</p>
            <p className="text-sm text-gray-600">Total Ventas: {mostRepeatedProduct.total_sales}</p>
            </div>
            <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold">Producto Menos Vendido</h2>
            <p>{leastSoldProduct.title}</p>
            <p className="text-sm text-gray-600">Cantidad: {leastSoldProduct.quantity}</p>
            </div>
        </div>

      {/* Listado Paginado */}
        <div className="bg-white shadow rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold mb-4">Listado de Productos</h2>
            <ul>
            {currentItems.map((item) => (
                <li
                key={item.id}
                className="border-b py-2 flex justify-between items-center"
                >
                <span>{item.title}</span>
                <span className="text-gray-600">Cantidad: {item.quantity}</span>
                </li>
            ))}
            </ul>
            <div className="flex justify-between mt-4">
            <button
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={prevPage}
                disabled={currentPage === 1}
            >
                Anterior
            </button>
            <button
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={nextPage}
                disabled={currentPage === totalPages}
            >
                Siguiente
            </button>
            </div>
        </div>

      {/* Gráficos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Gráfico de Barras</h2>
            <Bar data={chartDataBar} options={{ responsive: true }} />
            </div>
            <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Gráfico de Torta</h2>
            <Pie data={chartDataPie} options={{ responsive: true }} />
            </div>
        </div>
        </div>
    );
};

export default ProductosMasVendidos;
