import { useNavigate } from 'react-router-dom';
import "./navbar.css"

const Navbar=()=>{
    const navigate = useNavigate();
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
                        <button className="navbuttons" onClick={() => navigate('/categorias')}>
                            Categorias
                        </button>
                        <button className="navbuttons" onClick={() => navigate('/crear')}>
                            Crear recetas
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar