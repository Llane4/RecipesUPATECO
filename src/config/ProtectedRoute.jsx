import React, { useContext } from 'react';
import { Navigate, Outlet ,useNavigate} from 'react-router-dom';
import Context from './context';


const ProtectedRoute = ({children}) => {
    const navigate=useNavigate()
    const data=useContext(Context)
    let login=localStorage.getItem("token")
    console.log(login?true:false)
    return login ? <Outlet/> : <Navigate to="/" />;
};

export default ProtectedRoute;