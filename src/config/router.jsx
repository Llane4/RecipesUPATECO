import { createBrowserRouter } from "react-router-dom";
import NavbarLayout from "../components/NavbarLayout";
import Recetas from "../components/Recetas";
import Categorias from "../components/Categorias";
import Login from "../components/Login";
import { useContext } from "react";
import Context from "./context";
import ProtectedRoute from "./ProtectedRoute";



const router = createBrowserRouter([
    {
        element: <NavbarLayout />,
        children: [
            {
                path: '/',
                element: <Login />,
                index: true
              },
              {
                element: <ProtectedRoute/>,
                children: [
                  {
                    path: '/categorias',
                    element: <Categorias />
                  },
                  {
                    path: '/recetas',
                    element: <Recetas />
                  }
                ]
              },
              {
                path: '*',
                element: <p>404 Error - Nothing here...</p>
              }]
    },
]);

export default router