import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type checking = 'checking' | 'authenticated' | 'not-authenticated';

interface AuthState {
  status?: checking,
  nombre: string | null,
  apellidos: string | null,
  telefono: string | null,
  email: string | null,
  nombre_negocio: string| null,
  errorMessage?: string | null
};

const initialState: AuthState = {
  status: 'not-authenticated',
  nombre: null,
  apellidos: null,
  telefono: null,
  email: null,
  nombre_negocio: null,
  errorMessage: null
};

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, {payload}: PayloadAction<AuthState>) => {
      state.status = 'authenticated';
      state.nombre = payload.nombre
      state.apellidos = payload.apellidos
      state.telefono = payload.telefono
      state.email = payload.email
      state.nombre_negocio = payload.nombre_negocio
      state.errorMessage = null
    },
    logout: (state, {payload}) => {
      state.status = 'not-authenticated';
      state.nombre = null
      state.apellidos = null
      state.telefono = null
      state.email = null
      state.nombre_negocio = null
      state.errorMessage = payload?.errorMessage
    },
    checkingCredentials: (state) => {
      state.status = 'checking';
    }
  }
})

export const { 
  login,
  logout,
  checkingCredentials 
} = AuthSlice.actions;