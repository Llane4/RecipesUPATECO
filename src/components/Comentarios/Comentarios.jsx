import { useEffect, useState } from "react"
import "./comentarios.css"
import axios from "axios"


const Comentarios= ({recetaId})=>{
    console.log(recetaId)
    const [comment, setComment]=useState([])
    const recetaID=recetaId

    useEffect(()=>{
        const fetchComentarios=async () =>{
            try {
                const responseComentarios=await axios.get("https://sandbox.academiadevelopers.com/reciperover/comments/")
                const datosComentarios=responseComentarios.data

                const comentariosActual=[]

                for(let comentario of datosComentarios){
                    if(comentario.id == recetaID){
                        console.log("Comentario de la receta actual", comentario.content)
                        comentariosActual.push(comentario)
                    }
                }

                setComment(comentariosActual)
            } catch (error) {
                
            }
        }
        fetchComentarios()
    },[])


    return (
        <div>
            <h2>Comentarios: </h2>
            {
                comment && comment.map((comentario, index)=>(
                    <div className="comentario" key={index}>
                        {comentario.content}
                    </div>
                ))
            }
        </div>
    )
}

export default Comentarios