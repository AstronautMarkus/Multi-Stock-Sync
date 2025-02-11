import { useContext, useEffect, useState } from "react";
import { PieChart } from "./Graphic";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IngresosProductosContext } from "./Context";
import { ItemTable } from "./components/ItemTable";
import { LoadingDinamico } from "../../../../../../components/LoadingDinamico/LoadingDinamico";
import { exportToExcel, exportToPdf, formatNumber, handleFilterCategory } from "./helpers";

import styles from "./IngresosCategoriaProducto.module.css";

type eventChange = React.ChangeEvent<HTMLInputElement>;
type eventForm = React.FormEvent<HTMLFormElement>;

const IngresosCategoriaProducto = () => {

  const { ProductoState, getVentas, dispatch } = useContext(IngresosProductosContext);
  const { categorias, isLoading, totalFinal, categoriasFiltradas, categoriaActiva } = ProductoState;

  const [initDate, setInitDate] = useState<string>('2025-01-01');
  const [endDate, setEndDate] = useState<string>('2025-01-10');

  const handleInitDateChange = ({ target }: eventChange) => {
    const date = target.value;
    setInitDate(date);
  };

  const handleEndDateChange = ({ target }: eventChange) => {
    const date = target.value
    setEndDate(date);
  };

  const handleSubmit = (e: eventForm) => {
    e.preventDefault();
    if (initDate === '' || endDate === '') return;
    getVentas(initDate, endDate);
  };

  useEffect(() => {
    getVentas(initDate, endDate);
  },[])

  return (
    <div className={styles.view__container}>
      {/**CONTENIDO IZQUIERDO */}
      <div className={`border ${styles.container__left}`}>
        {/**CONTENEDOR HEADER */}
        {
          (isLoading)
            ? <LoadingDinamico variant="container" />
            :
            (<>
              <form onSubmit={handleSubmit} className={`${styles.left__header}`}>
                <div className="dropdown">
                  <button className={`dropdown-toggle ${styles.header__dropdown}`} type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                    {categoriaActiva}
                  </button>
                  <ul className="dropdown-menu">
                    <li onClick={() => handleFilterCategory('Todo', dispatch, categorias)} className={`dropdown-item ${styles.dropdown__item}`}>Todo</li>
                    <hr className={styles.dropdown__line}/>
                    {
                      categorias.map((categoria) => (
                        <li onClick={() => handleFilterCategory(categoria.category, dispatch, categorias)} key={categoria.id} className={`dropdown-item ${styles.dropdown__item}`}>{categoria.category}</li>
                      ))
                    }
                  </ul>
                </div>
                <input
                  id="initDate"
                  className={`form-control ${styles.header__btnDate}`}
                  onChange={handleInitDateChange}
                  type="date"
                  value={initDate}
                >
                </input>
                <input
                  id="endDate"
                  className={`form-control ${styles.header__btnDate}`}
                  onChange={handleEndDateChange}
                  type="date"
                  value={endDate}
                >
                </input>
                <button
                  type="submit"
                  className={`btn ${styles.header__btnBuscar}`}
                >
                  Buscar
                </button>
              </form>
              <PieChart />
              <div className={styles.left__data}>
                <table className={styles.data__table}>
                  <thead className={styles.table__head}>
                    <tr className={styles.head__row}>
                      <th>Tipo de producto</th>
                      <th></th>
                      <th>Cantidad</th>
                      <th>Precio producto</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody className={styles.table__body}>
                    {
                      categoriasFiltradas.map((categoria) => (
                        <ItemTable
                          key={categoria.id}
                          categoria={categoria}
                        />
                      ))
                    }
                  </tbody>
                </table>
                <div className={styles.data__total}>
                  <div className={styles.total__item}>
                    <div className={styles.item__total}>
                      <p className={styles.total__p}>Total de ingresos</p>
                      <p className={styles.total__p}>{formatNumber(totalFinal)}</p>
                    </div>
                  </div>
                  <div className={styles.total__buttonExport}>
                    <div className={styles.buttonExport__container}>
                      <button className={styles.buttonExport_btn} onClick={() => exportToPdf(categoriasFiltradas)}>
                        <FontAwesomeIcon className={`${styles.btn__icon}`} icon={faDownload} />
                        Exportar a Pdf
                      </button>
                      <button className={styles.buttonExport_btn} onClick={() => exportToExcel(categoriasFiltradas)}>
                        <FontAwesomeIcon className={`${styles.btn__icon}`} icon={faDownload} />
                        Exportar a Excel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
          </>)
        }
      </div>
      {/**CONTENIDO DERECHO */}
      <div className={styles.container__right}>
        <h3 className={styles.right__title}>Formas De Pago Y Devoluciones</h3>
        <hr className={styles.right__hr} />
        <div className={styles.right__data}>

        </div>
      </div>
    </div>
  );
};

export default IngresosCategoriaProducto;