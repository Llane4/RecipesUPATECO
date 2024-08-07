import { useEffect, useState } from "react"
import "./recetapage.css"
import axios from "axios"
import { useParams } from "react-router-dom"
import Comentarios from "../Comentarios/Comentarios"
import Pasos from "../Pasos/Pasos"
import Ingredientes from "../Ingredientes/Ingredientes"
import Videotutorial from "../Videotutorial/Videotutorial"

const RecetaPage=()=>{
    const params = useParams();
    const [receta, setReceta]=useState({})
    const [isLoading, setIsLoading]=useState(true)

    useEffect(()=>{
        
        const fetchReceta=async ()=>{
            try {
                setIsLoading(true)
                const respondeReceta=await axios.get(`${import.meta.env.VITE_BASE_URL}/reciperover/recipes/${params.id}`)
                const datosReceta=respondeReceta.data

                setReceta({
                    id: datosReceta.id,
                    title: datosReceta.title,
                    description: datosReceta.description,
                    preparation_time: datosReceta.preparation_time,
                    cooking_time: datosReceta.cooking_time,
                    servings: datosReceta.servings,
                    image:datosReceta.image,
                    view_count: datosReceta.view_count,
                    owner: datosReceta.owner,
                    ingredients: datosReceta.ingredients,
                    locations: datosReceta.locations,
                    categories: datosReceta.categories
                })
                
                setIsLoading(false)
            } catch (error) {
                
            }
        }
        
        fetchReceta();


    } ,[])
    if (isLoading) {
        return <div className="contenedor"><h2>Cargando...</h2></div>
    }
    return (
        (receta && <div className="contenedor">
        <h2>{receta.title}</h2>
        <img src={receta.image?receta.image:"https://cdn0.recetasgratis.net/es/posts/6/2/9/galletas_con_chispas_de_chocolate_caseras_35926_600.webp"}/>
        <div className="descrip">
            <h2>{receta.description}</h2>
        </div>
        <div className="boxinfo">
            <h2 className="info">Porciones: {receta.servings}</h2>
            <h2 className="info">Tiempo de preparacion: {receta.preparation_time}</h2>
            <h2 className="info">Tiempo de cocinado: {receta.cooking_time}</h2>
            <h2 className="info">Visitas: {receta.view_count}</h2>
        </div>
        <div className="descrip">
            <h2>Ingredientes: </h2>
                <Ingredientes recetaID={receta.id}/>
        </div>
        <div className="descrip">
            <h2>Pasos a seguir: </h2>
            <Pasos recetaId={receta.id}/>
        </div>
        <div className="descrip">
           <h2>Video:</h2> 
           <Videotutorial url={"9nh1zUX54pw"}/>
        </div>
        <div className="descrip">
            <Comentarios recetaId={receta.id}/>

        </div>
    </div>))
}

export default RecetaPage