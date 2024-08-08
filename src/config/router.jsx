import { createBrowserRouter } from "react-router-dom";
import NavbarLayout from "../components/NavbarLayout";
import Recetas from "../components/Recetas";
import Categorias from "../components/Categorias";
import Login from "../components/Login";
import { useContext } from "react";
import Context from "./context";
import ProtectedRoute from "./ProtectedRoute";
import RecetaPage from "../components/RecetaPage/RecetaPage";
import CrearReceta from "../components/CrearReceta/CrearReceta";
import EditarPage from "../components/EditarPage/EditarPage";



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
                    path: '/editar/:id',
                    element: <CrearReceta />
                  },
                  {
                    path: '/misrecetas',
                    element: <EditarPage />
                  },
                  {
                    path: '/crear',
                    element: <CrearReceta />
                  },
                  {
                    path: '/recetas',
                    children: [
                      {
                          index: true,
                          element: <Recetas />
                      },
                      {
                          path: "/recetas/:id",
                          element: <RecetaPage />
                      },
                  ]
                  }
                ]
              },
              {
                path: '*',
                element: <p style={{marginTop: "54px"}}>404 Error</p>
              }]
    },
    
  ],{
    basename: "/RecipesUPATECO",  
  }

);

export default router