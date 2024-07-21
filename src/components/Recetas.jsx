import { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./recetas.css"
import Context from "../config/context";


const Recetas=()=>{
    const data= useContext(Context)
    console.log(data)
    const [recetas, setRecetas]=useState(null)
    const url="https://sandbox.academiadevelopers.com/reciperover/recipes/"
    useEffect(()=>{
        axios.get(url)
            .then(response => {
                console.log(response.data);
                const recetasDato={
                    title: response.data[0].title,
                    description: response.data[0].description,
                    preparation_time: response.data[0].preparation_time,
                    cooking_time: response.data[0].cooking_time,
                    servings: response.data[0].servings,
                    image:response.data[0].image,
                    view_count: response.data[0].view_count,
                    owner: response.data[0].owner,
                    ingredients: response.data[0].ingredients,
                    locations: response.data[0].locations,
                    categories: response.data[0].categories
                }
                setRecetas(recetasDato)
            })
  .catch(error => {
    console.error('Error al hacer la solicitud:', error);
  });
    },[])
    console.log(recetas)
    return (
        (recetas && <div className="contenedor">
            <div className="contenedorDeRecetas">
                <h1>{recetas.title}</h1>
                <h3>{recetas.description}</h3>
                <h3>Tiempo de preparacion: {recetas.preparation_time}</h3>
                <h3>Tiempo de coccion: {recetas.cooking_time}</h3>
            </div>
            <div className="contenedorDeRecetas">
                <h1>{recetas.title}</h1>
                <h3>{recetas.description}</h3>
                <h3>Tiempo de preparacion: {recetas.preparation_time}</h3>
                <h3>Tiempo de coccion: {recetas.cooking_time}</h3>
            </div>
        </div>)
    )
}

export default Recetas