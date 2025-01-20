import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hook";

interface PrublicRouterProps {
  children: React.ReactNode;
}

export const PublicRouter = ({children}: PrublicRouterProps) => {

  const { status } = useAppSelector((state) => state.auth);

  return ( status === 'authenticated')
    ? <Navigate to="/sync/home" />
    : children;

}