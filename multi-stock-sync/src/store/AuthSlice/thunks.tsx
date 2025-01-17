import axios from "axios";
import { AppDispatch } from "../store";
import { checkingCredentials, logout } from "./AuthSlice";


export const startLogin = (email: string, password: string) => {
  return async (dispatch: AppDispatch) => {

    dispatch(checkingCredentials());

    try{
      const response = await axios.post(`${process.env.VITE_API_URL}/login`, { email, password });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }catch(error){

      if(axios.isAxiosError(error)) dispatch(logout({errorMessage:'Credenciales incorrectas'}));
    }
    
  }
};