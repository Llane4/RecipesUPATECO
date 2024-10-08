import "./editarPage.css"
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
const EditarPage=()=>{
    const [misRecetas, setMisRecetas]=useState([])
    const navigate=useNavigate()
    const fetchRecetas=async ()=>{
        try {
            const response=await axios.get(`${import.meta.env.VITE_BASE_URL}/reciperover/recipes?page_size=100`)
            const recetasData = await response.data.results
                 .filter((receta) => receta.owner == localStorage.getItem("id"))  
                 .map((receta) => ({
                   id: receta.id,
                   title: receta.title,
                   description: receta.description,
                   preparation_time: receta.preparation_time,
                   cooking_time: receta.cooking_time,
                   servings: receta.servings,
                   image: receta.image,
                   view_count: receta.view_count,
                   owner: receta.owner,
                   ingredients: receta.ingredients,
                   locations: receta.locations,
                   categories: receta.categories
                 }));
            setMisRecetas(recetasData)
        } catch (error) {
            
        }
    }
    useEffect(()=>{
        
        fetchRecetas()
    },[])

    const borrarReceta=async (recetaID)=>{
        try {
            await axios.delete(`${import.meta.env.VITE_BASE_URL}/reciperover/recipes/${recetaID}/`,{
                headers: {
                  'Authorization': `Token ${localStorage.getItem("token")}`,
                  'Content-Type': 'application/json'
                }
              })
            fetchRecetas()
        } catch (error) {
            
        }
    }
    return (<div className="contenedoreditar">
        <h2>Mis recetas</h2>
        <div className="misRecetas">
            {misRecetas && misRecetas.map((rec, index)=>(
                <div className="item" key={index}>
                    <div ><h2 style={{cursor: "pointer"}} onClick={() => navigate(`/recetas/${rec.id}`)}>{rec.title}</h2></div>
                    <div className="misBotones">
                        <button onClick={() => navigate(`/editar/${rec.id}`)}>Editar</button>
                        <button onClick={()=>borrarReceta(rec.id)}>Borrar</button>
                    </div>
                </div>
            ))}
        </div>
    </div>)
}

export default EditarPage