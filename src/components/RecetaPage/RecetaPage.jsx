import { useEffect, useState } from "react"
import "./recetapage.css"
import axios from "axios"
import { useParams } from "react-router-dom"
import Comentarios from "../Comentarios/Comentarios"

const RecetaPage=()=>{
    const params = useParams();
    const [receta, setReceta]=useState({})
    const [ingredientes, setIngredientes]=useState(null)
    const [isLoading, setIsLoading]=useState(true)

    useEffect(()=>{
        
        const fetchReceta=async ()=>{
            try {
                setIsLoading(true)
                const respondeReceta=await axios.get(`https://sandbox.academiadevelopers.com/reciperover/recipes/${params.id}`)
                const datosReceta=respondeReceta.data

                const datosIngredientes=[]
                console.log(respondeReceta)
                for(let ingredienteID of datosReceta.ingredients){
                    try {
                        let url=`https://sandbox.academiadevelopers.com/reciperover/ingredients/${ingredienteID}`
                        const ingredientesData =await axios.get(url);
                        console.log(ingredientesData.data)
                        datosIngredientes.push(ingredientesData.data)    
                    } catch (error) {
                        console.log("Error consiguiendo el ingrediente")
                    }
                }

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
                setIngredientes(datosIngredientes)
                setIsLoading(false)
            } catch (error) {
                
            }
        }
        
        fetchReceta();


    } ,[])
    if (isLoading) {
        return <div className="contenedor"><h2>Cargando...</h2></div>
    }
    
    console.log(ingredientes)
    return (
        (receta && <div className="contenedor">
        <h2>{receta.title}</h2>
        <img src="https://cdn0.recetasgratis.net/es/posts/6/2/9/galletas_con_chispas_de_chocolate_caseras_35926_600.webp"/>
        <div className="descrip">
            <h2>{receta.description}</h2>
        </div>
        <div className="boxinfo">
            <h2 className="info">Porciones: {receta.servings}</h2>
            <h2 className="info">Tiempo de preparacion: {receta.preparation_time}</h2>
            <h2 className="info">Tiempo de cocinado: {receta.cooking_time}</h2>

        </div>
        <div className="descrip">
            <h2>Ingredientes: </h2>
                {
                    ingredientes && ingredientes.length > 0 && (
                        <div>
                            {ingredientes.map((ingrediente, index) => (
                                <div key={index}>
                                    <ul>{ingrediente.name}</ul>
                                </div>
                            ))}
                        </div>
                    )
                }
        </div>
        <div className="descrip">
            <h2>Pasos a seguir: </h2>
            <ul>1</ul>
            <ul>2</ul>
            <ul>3</ul>
        </div>
        <div className="descrip">
            <Comentarios recetaId={receta.id}/>

        </div>
    </div>))
}

export default RecetaPage