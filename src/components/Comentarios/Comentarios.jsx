import { useEffect, useState } from "react"
import "./comentarios.css"
import axios from "axios"


const Comentarios= ({recetaId})=>{
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
                        const responseUser=await axios.get(`https://sandbox.academiadevelopers.com/users/profiles/${comentario.author}`, {
                            headers: {
                              'Authorization': `Token ${import.meta.env.VITE_API_TOKEN}`,
                              'Content-Type': 'application/json'
                            }
                          })
                        comentariosActual.push({
                            ...comentario,
                            author: responseUser.data.first_name + " " + responseUser.data.last_name,
                            image: responseUser.data.image
                          })
                    }
                }

                setComment(comentariosActual)
            } catch (error) {
                
            }
        }
        fetchComentarios()
    },[])
    console.log(comment)

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