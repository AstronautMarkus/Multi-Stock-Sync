import { AppDispatch } from "../store";
import { addProductos, loadingProductos } from "./productosSlice";

export const startGetAllProductos = () => {
  return async (dispatch: AppDispatch) => {

    dispatch(loadingProductos(true))

    try {

      const producto = {
        img: 'https://via.placeholder.com/150',
        nombre: 'Zapatilla Nike',
        sku: `SKU87897897`,
        precio: 10000,
        precioMayor: 200000,
        cantidad: 123
      }

      dispatch(addProductos(producto))

    }catch (error) {
    console.log(error)
    dispatch(loadingProductos(false))
    }
    
  }
};