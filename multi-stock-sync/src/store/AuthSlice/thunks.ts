import axios from "axios";
import { AppDispatch } from "../store";
import { checkingCredentials, login, logout } from "./AuthSlice";
import { NavigateFunction } from "react-router-dom";


export const startLogin = (email: string, password: string, navigate: NavigateFunction) => {
  return async (dispatch: AppDispatch) => {

    dispatch(checkingCredentials());

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/login`, { email, password });

      const user = {
        nombre: data.user.nombre,
        apellidos: data.user.apellidos,
        telefono: data.user.telefono,
        email: data.user.email,
        nombre_negocio: data.user.nombre_negocio
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      dispatch(login(user));

      navigate('/sync/home');
      
    } catch (error) {

      if (axios.isAxiosError(error)) dispatch(logout({ errorMessage: 'Credenciales incorrectas' }));
    }
  }
};

export const startLogOut = () => {
  return (dispatch: AppDispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(logout({ errorMessage: null }));
  }
}