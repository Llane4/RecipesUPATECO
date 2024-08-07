import axios from "axios";
import "./modal.css"
import { useState } from "react";

const Modal=({tipo, fetchIngredientes})=>{
    const [showModal, setShowModal] = useState(false);
    const [objeto, setObjeto]=useState({
        name:"",
        description:""
    })
    const handleOpenModal=()=>{
        setShowModal(!showModal)
    }
    const handleSubmit=async (e)=>{
        if(objeto.name=="")return
        e.preventDefault()
        var ruta=""
        if(tipo== "Ingrediente"){
            ruta="ingredients"
        }
        else{
            ruta="categories"
        }
        try {
            await axios.post(`${import.meta.env.VITE_BASE_URL}/reciperover/${ruta}/`,objeto
            ,{
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Token ${import.meta.env.VITE_API_TOKEN}`
                }
              }
            )
            await fetchIngredientes()
            setShowModal(!showModal)
        } 
            catch (error) {
            
        }
        
    }

    const handleChange=(e)=>{
        e.preventDefault();
        setObjeto({
            ...objeto,
            name: e.target.value
          });
    }
    return (
        <div>
            <div onClick={handleOpenModal}>{tipo && tipo=="Ingrediente"?<h3 className="crearmodal">Nuevo ingrediente</h3>:<h3 className="crearmodal">Nueva categoria</h3>}</div>
            <div className={showModal?"modal-background":"disabled"}>

            <div className="modal-item" >
                <div>
                    <label>
                        {tipo && tipo=="Ingrediente"?<h2>Ingrediente</h2>:<h2>Categoria</h2>}
                        <input type="text" value={objeto.name  || ''} onChange={handleChange} />
                    </label>
                </div>
            <button type="button" onClick={handleOpenModal}>Cancelar</button>
            <button type="button" onClick={handleSubmit}>Enviar</button>
            </div>
            </div>
        </div>
    )
}

export default Modal