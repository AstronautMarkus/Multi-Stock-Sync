import { useState } from "react";
import styles from "./LoginMercado.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faLockOpen,
  faAddressCard,
} from "@fortawesome/free-solid-svg-icons";

const LoginMercado = () => {
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setStatus("");

    const payload = {
      client_id: clientId,
      client_secret: clientSecret,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/mercadolibre/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setStatus(data.status || "success");
        setMessage(data.message || "URL generada correctamente. Redirigiendo...");

        if (data.redirect_url) {
          window.open(data.redirect_url, "_blank");
        }
      } else {
        setStatus("error");
        setMessage(
          data.message || "Error: No se pudieron validar las credenciales."
        );
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage("Error: Ocurrió un problema inesperado. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleLogin} className={styles.formContainer}>
        <div className={styles.formControl}>
          <div>
            <h3 className={styles.title}>Agregar Conexión</h3>
            <p className={styles.subtitle}>
              Ingrese las credenciales para generar la URL de autenticación.
            </p>
          </div>

          <div className={styles.inputContainer}>
            <FontAwesomeIcon
              icon={faAddressCard}
              className={styles.inputIcon}
            />
            <input
              id="clientId"
              type="text"
              onChange={(e) => setClientId(e.target.value)}
              className={styles.inputField}
              placeholder=" "
              value={clientId}
              required
            />
            <label htmlFor="clientId" className={styles.floatingLabel}>
              ID del Cliente
            </label>
          </div>
          <div className={styles.inputContainer}>
            <FontAwesomeIcon
              icon={showPassword ? faLockOpen : faLock}
              className={styles.lockIcon}
              onClick={togglePasswordVisibility}
            />
            <input
              id="clientSecret"
              type={showPassword ? "text" : "password"}
              onChange={(e) => setClientSecret(e.target.value)}
              className={styles.inputField}
              placeholder=" "
              value={clientSecret}
              required
            />
            <label htmlFor="clientSecret" className={styles.floatingLabel}>
              Client Secret
            </label>
          </div>

          {message && (
            <div
              className={`alert ${
                status === "success" ? "alert-success" : "alert-danger"
              }`}
              role="alert"
            >
              {message}
            </div>
          )}

          <div className={styles.buttonGroup}>
            <button
              type="submit"
              className={`${styles.button} ${styles.buttonSave}`}
              disabled={loading}
            >
              {loading ? "Generando URL..." : "Generar URL de Autenticación"}
            </button>
          </div>
        </div>
      </form>

      {loading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingSpinner}></div>
          <p className={styles.loadingMessage}>Procesando...</p>
        </div>
      )}
    </div>
  );
};

export default LoginMercado;
