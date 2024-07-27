import axios from "axios"
import "./inputComentario.css"
import { useEffect, useState } from "react"

const InputComentario=({rID})=>{
    const recetaID=rID
    const [comentario, setComentario]=useState("")

    const handleSubmit=async(e)=>{
        e.preventDefault()
        const sinEspacios=comentario.trim()
        if(sinEspacios){
            console.log({
                content: comentario,
                recipe: recetaID
              })
            try {
                const response = await axios.post(
                    'https://sandbox.academiadevelopers.com/reciperover/comments/',
                    {
                      content: comentario,
                      recipe: recetaID
                    },
                    {
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Token ${import.meta.env.VITE_API_TOKEN}`
                      }
                    }
                  );

                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
            setComentario("")
        }else{
            console.log("Comentario vacio")
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