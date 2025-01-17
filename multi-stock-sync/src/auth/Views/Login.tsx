import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { startLogin } from '../../store/AuthSlice/thunks';
import styles from '../Css/Login.module.css';

export const Login = () => {

  const { status, errorMessage } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch()

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(startLogin(email, password));
  };

  return (
    <div className={`${styles.loginContainer}`}>
      <div className={`${styles.loginBox__loginContainer}`}>
        <header className={`${styles.header__loginBox}`}>
          <h1 className={`${styles.title__header}`}>Login</h1>
        </header>
        <hr />
        <form className={`${styles.form__loginContainer}`} onSubmit={handleSubmit}>
          <div className={`${styles.formGroup__loginContainer}`}>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Correo@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={`${styles.formGroup__loginContainer}`}>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <button
            disabled={isAuthenticating}
            type="submit"
            className={`btn btn-primary w-100 ${styles.btn__loginContainer}`}
          >
            {
              (isAuthenticating)
                ? <div className="spinner-border" role="status" />
                : 'Iniciar sesión'
            }
          </button>
          <div>
            <p>¿No tienes una cuenta?</p>
            <Link
              to="/auth/register"
              className="d-block text-decoration-none text-primary"
            >
              Registrarse
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
