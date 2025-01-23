import React, { useState } from "react";
// import ExcelJS from "exceljs";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import { saveAs } from "file-saver";
import styles from './ExportarDatos.module.css';

const ExportarDatos: React.FC = () => {
// Datos estáticos para prueba
const [data] = useState([
        {
        imagen: "https://via.placeholder.com/50",
        nombre: "Producto A",
        precio: 100,
        bodega: "Bodega 1",
        cantidad: 10,
        monto: 1000,
        },
        {
        imagen: "https://via.placeholder.com/50",
        nombre: "Producto B",
        precio: 200,
        bodega: "Bodega 2",
        cantidad: 5,
        monto: 1000,
        },
        {
        imagen: "https://via.placeholder.com/50",
        nombre: "Producto C",
        precio: 150,
        bodega: "Bodega 3",
        cantidad: 7,
        monto: 1050,
        },
    ]);

    // // Exportar a Excel
    // const exportToExcel = async () => {
    //   const workbook = new ExcelJS.Workbook();
    //   const worksheet = workbook.addWorksheet("Productos");

    //   // Definir columnas
    //   worksheet.columns = [
    //     { header: "Imagen", key: "imagen", width: 30 },
    //     { header: "Nombre", key: "nombre", width: 20 },
    //     { header: "Precio", key: "precio", width: 10 },
    //     { header: "Bodega", key: "bodega", width: 15 },
    //     { header: "Cantidad", key: "cantidad", width: 10 },
    //     { header: "Monto", key: "monto", width: 10 },
    //   ];

    //   // Agregar filas
    //   data.forEach((item) => {
    //     worksheet.addRow({
    //       imagen: item.imagen,
    //       nombre: item.nombre,
    //       precio: `$${item.precio}`,
    //       bodega: item.bodega,
    //       cantidad: item.cantidad,
    //       monto: `$${item.monto}`,
    //     });
    //   });

    //   // Crear un archivo Excel
    //   const buffer = await workbook.xlsx.writeBuffer();
    //   const blob = new Blob([buffer], {
    //     type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    //   });
    //   saveAs(blob, "productos.xlsx");
    // };

    // // Exportar a PDF
    // const exportToPDF = () => {
    //   const doc = new jsPDF();
    //   doc.text("Reporte de Productos", 20, 10);
    //   doc.autoTable({
    //     head: [["Imagen", "Nombre", "Precio", "Bodega", "Cantidad", "Monto"]],
    //     body: data.map((item) => [
    //       { content: "", styles: { cellWidth: 20 } }, // Espacio reservado para la imagen
    //       item.nombre,
    //       `$${item.precio}`,
    //       item.bodega,
    //       item.cantidad,
    //       `$${item.monto}`,
    //     ]),
    //   });
    //   doc.save("productos.pdf");
    // };

    return (
    <div className={styles.tableContainer}>
        <h1>Lista de Productos</h1>
        <br />
        <table className={styles.table}>
            <thead>
            <tr>
                <th className="table_header">Imagen</th>
                <th className="table_header">Nombre del Producto</th>
                <th className="table_header">Precio</th>
                <th className="table_header">Bodega</th>
                <th className="table_header">Cantidad</th>
                <th className="table_header">Monto</th>
            </tr>
            </thead>
            <tbody>
            {/* Datos comentados para ejemplo */}
            {data.map((item, index) => (
                <tr key={index}>
                <td>
                    <img
                    src={item.imagen}
                    alt={item.nombre}
                    style={{ width: "50px", height: "50px" }}
                    />
                </td>
                <td>{item.nombre}</td>
                <td>${item.precio}</td>
                <td>{item.bodega}</td>
                <td>{item.cantidad}</td>
                <td>${item.monto}</td>
                </tr>
            ))}
            </tbody>
        </table>
        <div style={{ marginTop: "20px" }}>
            {/* Botones con funciones comentadas */}
            <button
            onClick={() => console.log("Exportar a Excel (función comentada)")}
            className={"btn btn-primary mx-1"}
            >
            Exportar a Excel
            </button>
            <button
            onClick={() => console.log("Exportar a PDF (función comentada)")}
            className={"btn btn-warning"}
            >
            Exportar a PDF
            </button>
        </div>
    </div>
    );
};

export default ExportarDatos;