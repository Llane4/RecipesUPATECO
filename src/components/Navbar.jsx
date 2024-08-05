import { useNavigate } from 'react-router-dom';
import "./navbar.css"

const Navbar=()=>{
    const navigate = useNavigate();
    const borrarDatos=(e)=>{
        e.preventDefault()
        localStorage.removeItem("token")
        localStorage.removeItem("id")
        navigate("/")
      }

    return (
        <header className="navheader">
            <nav className="navbar">
                <div className="navcontainer">
                    <a>
                        Hola
                    </a>
                    <div className="navcontainerbuttons"   >
                        <button className="navbuttons" onClick={() => navigate('/recetas')}>
                            Recetas
                        </button>
                        <button className="navbuttons" onClick={() => navigate('/misrecetas')}>
                            Mis recetas
                        </button>
                        <button className="navbuttons" onClick={() => navigate('/crear')}>
                            Crear recetas
                        </button>
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