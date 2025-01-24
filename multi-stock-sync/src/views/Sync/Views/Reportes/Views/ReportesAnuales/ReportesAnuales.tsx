import steyles from "./ReportesAnuales.module.css";
import React from "react";

const ReportesAnuales:React.FC=()=>{
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/users");
            if (!response.ok) {
                throw new Error("Error al obtener los datos");
            }
                const result = await response.json();
            setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
    };
    
    fetchData();
    }, []);
    
        if (loading) {
            return <p>Cargando datos...</p>;
        }
        
        if (error) {
        return <p>Error: {error}</p>;
    }
    
    return (
        <div>
            <h1>Tabla de Usuarios</h1>
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
                <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Compañía</th>
                </tr>
            </thead>
            <tbody>
                {data.map((user) => (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.company.name}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    );
}

export default ReportesAnuales;