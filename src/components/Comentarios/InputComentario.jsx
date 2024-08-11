import axios from "axios"
import "./inputComentario.css"
import { useContext, useEffect, useState } from "react"
import Context from "../../config/context"

const InputComentario=({fetchComentarios})=>{
    const data=useContext(Context)
    const recetaID=data.recetaID
    const [comentario, setComentario]=useState("")

    const handleSubmit=async(e)=>{
        e.preventDefault()
        const sinEspacios=comentario.trim()
        if(sinEspacios){
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_BASE_URL}/reciperover/comments/`,
                    {
                      content: comentario,
                      recipe: recetaID
                    },
                    {
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Token ${localStorage.getItem("token")}`
                      }
                    }
                  );
                fetchComentarios()
               
            } catch (error) {
                console.log(error)
            }
            setComentario("")
        }else{
            alert("No se puede enviar comentarios vacios.")
        }
    }
    const handleChange=(e)=>{
        setComentario(e.target.value)
    }
    return (
        <div className="container">
            <form className="form" onSubmit={handleSubmit}>
                <textarea className="comentario-textarea"
                        placeholder="Escribe tu comentario..."
                        value={comentario}
                        onChange={handleChange}
                        rows="3">
                </textarea>
                <button type="submit">Enviar comentario</button>
            </form>
        </div>)
}

export default InputComentario