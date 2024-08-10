import axios from "axios";
import "./modal.css"
import { useState } from "react";

const Modal=({tipo, fetchIngredientes, commentID=0, recipeID=0})=>{
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
        var metodo="POST"
        if(tipo== "Ingrediente"){
            ruta="ingredients"
        }
        else{
            ruta="categories"
        }
        switch (tipo) {
            case "Ingrediente":
                ruta="ingredients"
                break;
            case "Categoria":
                ruta="categories"
                break;
            case "Comentario":
                ruta=`comments/${commentID}`
                metodo="PUT"
            default:
                break;
        }
        try {
            await axios({
                method: metodo,
                url: `${import.meta.env.VITE_BASE_URL}/reciperover/${ruta}/`,
                data: {
                    recipe: recipeID,
                    content: objeto.name
                },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${localStorage.getItem("token")}`
                }
            })
            
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
        <>
            <button onClick={handleOpenModal}>{tipo}</button>
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
        </>
    )
}

export default Modal