import { createBrowserRouter } from "react-router-dom";
import NavbarLayout from "../components/Navbar/NavbarLayout";
import Recetas from "../components/Recetas/Recetas";
import Login from "../components/Login/Login";
import ProtectedRoute from "./ProtectedRoute";
import RecetaPage from "../components/RecetaPage/RecetaPage";
import CrearReceta from "../components/CrearReceta/CrearReceta";
import EditarPage from "../components/EditarPage/EditarPage";
import ProfilePage from "../components/ProfilePage/ProfilePage";
import ContextProvider from "./ContextProvider";



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
                path: '/recetas',
                element:  <Recetas /> 
            },
              {
                element: <ProtectedRoute/>,
                children: [
                  {
                    path: '/recetas/:id',
                    element: <ContextProvider><RecetaPage /></ContextProvider>
                  },
                  {
                    path: '/editar/:id',
                    element: <CrearReceta />
                  },
                  {
                    path: '/misrecetas',
                    element: <EditarPage />
                  },
                  {
                    path: '/profile',
                    element: <ProfilePage />
                  },
                  {
                    path: '/crear',
                    element: <CrearReceta />
                  },
                  
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