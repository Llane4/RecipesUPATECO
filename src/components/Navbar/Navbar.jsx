import { useNavigate } from 'react-router-dom';
import "./navbar.css"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { dataUser } from '../../config/UserContextProvider';

const Navbar=()=>{
    const { user, fetchUser, setUser } = dataUser();
    const navigate = useNavigate();
    const [userData, setUserData]=useState(null)
    const borrarDatos=(e)=>{
        e.preventDefault()
        localStorage.removeItem("token")
        localStorage.removeItem("id")
        setUser(null)
        navigate("/")
      }
    

    useEffect(()=>{
        fetchUser()
        console.log("USER", user)
    }, [fetchUser])
    console.log("USER", user)
    return (
        <header className="navheader">
            <nav className="navbar">
                <div className="navcontainer">
                    <div>
                      {
                        user && <div className='navProfile'>
                            <img src={`${import.meta.env.VITE_BASE_URL}${user.image}`}/>
                            <p>{user.userName}</p>
                        </div>
                      }  
                    </div>
                    <div className="navcontainerbuttons"   >
                        <button className="navbuttons" onClick={() => navigate('/recetas')}>
                            Recetas
                        </button>
                        <button className="navbuttons" onClick={() => navigate('/crear')}>
                            Crear recetas
                        </button>
                        {localStorage.getItem("id") &&
                        <button className="navbuttons" onClick={() => navigate('/profile')}>
                            Mi perfil
                        </button>
                        }
                        {!localStorage.getItem("id") &&
                        <button className="navbuttons" onClick={() => navigate('/')}>
                            Iniciar sesion
                        </button>
                        }
                        {localStorage.getItem("id") && <button className="navbuttons" onClick={borrarDatos}>
                            Logout
                        </button>}
                        
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar