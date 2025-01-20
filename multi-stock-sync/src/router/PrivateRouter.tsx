import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hook";

interface PrivateRouterProps {
  children: React.ReactNode;
}

export const PrivateRouter = ({ children }: PrivateRouterProps) => {

  const { status } = useAppSelector((state) => state.auth);

  return ( status === 'authenticated')
    ? children
    : <Navigate to="/auth/login" />;
};

