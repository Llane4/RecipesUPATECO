import { useEffect, useState } from "react"
import "./comentarios.css"
import axios from "axios"
import InputComentario from "./InputComentario"


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
                    console.log(comentario)
                    console.log(comentario.recipe == recetaID)
                    console.log(comentario.recipe)
                    console.log(recetaID)
                    if(comentario.recipe == recetaID){
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
            <InputComentario rID={recetaID}/>
            {
                comment && comment.map((comentario, index)=>(
                    <div    className="box">
                        <div >
                            <img className="imagen" src={comentario.image ? comentario.image : "https://thumbs.dreamstime.com/b/icono-an%C3%B3nimo-de-la-cara-del-perfil-persona-gris-silueta-avatar-masculino-defecto-placeholder-foto-aislado-en-el-fondo-blanco-107327860.jpg"}/>
                        </div>
                        <div className="datos">
                            <div className="nombre">
                                {comentario.author}
                            </div>
                            <div className="comentario" key={index}>
                                {comentario.content}
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Comentarios