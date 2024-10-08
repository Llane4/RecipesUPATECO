import React, { useContext } from 'react';
import { Navigate, Outlet ,useNavigate} from 'react-router-dom';
import Context from './context';


const ProtectedRoute = ({children}) => {
    let login=localStorage.getItem("token")
    return login ? <Outlet/> : <Navigate to="/" />;
};

export default ProtectedRoute;