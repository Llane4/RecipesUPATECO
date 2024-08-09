import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MisComentarios=()=>{
    const navigate=useNavigate()
    const [comentarios, setComentarios]=useState([])
    const fetchComentarios=async()=>{
        const responseComentarios=await axios.get(`${import.meta.env.VITE_BASE_URL}/reciperover/comments/?page=1&page_size=3000`)
        const comentariosAux=[]
        const comentariosData=responseComentarios.data.results
        for(var i=0;i<comentariosData.length;i++){
            if(comentariosData[i].author==localStorage.getItem("id")){
                console.log("Comentario", comentariosData[i].content)
                comentariosAux.push(comentariosData[i])
            }
        }
        setComentarios(comentariosAux)
    }
    useEffect(()=>{
        fetchComentarios()
    },[])

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
    console.log(comentarios)
    return (<div className="contenedoreditar">
        <h2>Mis comentarios</h2>
        <div className="misRecetas">
            {comentarios && comentarios.map((rec, index)=>(
                <div className="item" key={index}>
                    <div ><h2 style={{cursor:"pointer"}}onClick={() => navigate(`/recetas/${rec.recipe}`)}>{rec.content}</h2></div>
                    <div className="misBotones">
                        <button onClick={()=>borrarComentario(rec.id)}>Borrar</button>
                    </div>
                </div>
            ))}
        </div>
    </div>)
}

export default MisComentarios