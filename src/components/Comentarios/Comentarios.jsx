import { useContext, useEffect, useState } from "react"
import "./comentarios.css"
import axios from "axios"
import InputComentario from "./InputComentario"
import Context from "../../config/context"


const Comentarios= ()=>{
    const datos=useContext(Context)
    const [comment, setComment]=useState([])
    const recetaID=datos.recetaID

    const borrarComentario=async (id)=>{
        console.log(id)
        try {
            await axios.delete(`${import.meta.env.VITE_BASE_URL}/reciperover/comments/${id}`, {
                headers: {
                  'Authorization': `Token ${localStorage.getItem("token")}`,
                  'Content-Type': 'application/json'
                }
              });
            fetchComentarios()
        } catch (error) {
            console.log(error)
        }
    }

    const fetchComentarios=async () =>{
        try {
            const responseComentarios=await axios.get(`${import.meta.env.VITE_BASE_URL}/reciperover/comments/?page=1&page_size=3000`)
            const datosComentarios=responseComentarios.data.results

            const comentariosActual=[]
            if(localStorage.getItem("token")){

            
            for(let comentario of datosComentarios){
                if(comentario.recipe == recetaID){
                    const responseUser=await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profiles/${comentario.author}`, {
                        headers: {
                          'Authorization': `Token ${localStorage.getItem("token")}`,
                          'Content-Type': 'application/json'
                        }
                      })
                    comentariosActual.push({
                        ...comentario,
                        author_data: responseUser.data.first_name + " " + responseUser.data.last_name,
                        image: responseUser.data.image
                      })
                }
            }
        }

            setComment(comentariosActual)
        } catch (error) {
            
        }
    }
    useEffect(()=>{
        
        fetchComentarios()
    },[])
   
    
    return (
        <div>
            <h2>Comentarios: </h2>
            {localStorage.getItem("token")?<InputComentario fetchComentarios={fetchComentarios}/>:<div  className="buttonComment"><button>Para ver los comentarios iniciar sesion</button></div>}
            {
                comment && comment.map((comentario, index)=>(
                    <div    className="box"  key={index}>
                        <div >
                            <img className="imagen" src={comentario.image ? `${import.meta.env.VITE_BASE_URL}${comentario.image}` : "https://thumbs.dreamstime.com/b/icono-an%C3%B3nimo-de-la-cara-del-perfil-persona-gris-silueta-avatar-masculino-defecto-placeholder-foto-aislado-en-el-fondo-blanco-107327860.jpg"}/>
                        </div>
                        <div className="datos">
                            <div className="nombre">
                                <div>
                                    {comentario.author_data}

                                </div>
                                {localStorage.getItem("id")==comentario.author?
                                <div className="borrar" onClick={()=>borrarComentario(comentario.id)}>
                                    X
                                </div>:null}
                                
                            </div>
                            <div className="comentario">
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