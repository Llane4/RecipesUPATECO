import { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./recetas.css"
import Context from "../config/context";
import RecetaCard from "./RecetaCard";

const datosHard=[{
    "title": "Ensalada César",
    "description": "La ensalada César es una ensalada clásica que combina lechuga romana, crotones crujientes y un aderezo cremoso a base de anchoas, ajo y queso parmesano. Es una opción perfecta para una comida ligera y saludable.",
    "preparation_time": 15,
    "cooking_time": 0,
    "servings": 4,
    "image": null,
    "view_count": 25,
    "ingredients": [
      { "name": "Lechuga romana", "quantity": "1 cabeza", "type": "vegetal" },
      { "name": "Crotones", "quantity": "1 taza", "type": "pan" },
      { "name": "Queso parmesano", "quantity": "1/4 taza", "type": "queso" },
      { "name": "Anchoas", "quantity": "4 filetes", "type": "pescado" },
      { "name": "Ajo", "quantity": "1 diente", "type": "condimento" },
      { "name": "Jugo de limón", "quantity": "2 cucharadas", "type": "condimento" },
      { "name": "Aceite de oliva", "quantity": "1/3 taza", "type": "aceite" },
      { "name": "Mostaza de Dijon", "quantity": "1 cucharadita", "type": "condimento" },
      { "name": "Yema de huevo", "quantity": "1", "type": "huevo" }
    ],
    "categories": [
      { "name": "Ensaladas" },
      { "name": "Comida Saludable" }
    ]
  },{
    "title": "Sopa de Tomate",
    "description": "La sopa de tomate es una sopa deliciosa y reconfortante, perfecta para cualquier día del año. Esta receta es sencilla y rápida de preparar, usando ingredientes frescos como tomates, cebolla y ajo, y se puede servir con crutones o queso rallado.",
    "preparation_time": 10,
    "cooking_time": 30,
    "servings": 4,
    "image": null,
    "view_count": 18,
    "ingredients": [
      { "name": "Tomates", "quantity": "6 grandes", "type": "vegetal" },
      { "name": "Cebolla", "quantity": "1 grande", "type": "vegetal" },
      { "name": "Ajo", "quantity": "2 dientes", "type": "condimento" },
      { "name": "Caldo de pollo", "quantity": "4 tazas", "type": "líquido" },
      { "name": "Aceite de oliva", "quantity": "2 cucharadas", "type": "aceite" },
      { "name": "Sal", "quantity": "al gusto", "type": "condimento" },
      { "name": "Pimienta", "quantity": "al gusto", "type": "condimento" },
      { "name": "Albahaca fresca", "quantity": "1/4 taza", "type": "hierba" }
    ],
    "categories": [
      { "name": "Sopas" },
      { "name": "Comida Saludable" }
    ]
  }
,{
    "title": "Pollo al Curry",
    "description": "El pollo al curry es un plato sabroso y aromático, típico de la cocina india. Esta receta combina trozos de pollo tiernos con una mezcla de especias y leche de coco, creando un curry cremoso y delicioso que se puede servir con arroz basmati o naan.",
    "preparation_time": 15,
    "cooking_time": 25,
    "servings": 4,
    "image": null,
    "view_count": 30,
    "ingredients": [
      { "name": "Pechugas de pollo", "quantity": "500 gramos", "type": "carne" },
      { "name": "Cebolla", "quantity": "1 grande", "type": "vegetal" },
      { "name": "Ajo", "quantity": "3 dientes", "type": "condimento" },
      { "name": "Jengibre fresco", "quantity": "1 cucharada", "type": "condimento" },
      { "name": "Tomate", "quantity": "2 medianos", "type": "vegetal" },
      { "name": "Leche de coco", "quantity": "1 lata", "type": "líquido" },
      { "name": "Aceite vegetal", "quantity": "2 cucharadas", "type": "aceite" },
      { "name": "Curry en polvo", "quantity": "2 cucharadas", "type": "especia" },
      { "name": "Cúrcuma", "quantity": "1 cucharadita", "type": "especia" },
      { "name": "Comino", "quantity": "1 cucharadita", "type": "especia" },
      { "name": "Sal", "quantity": "al gusto", "type": "condimento" },
      { "name": "Cilantro fresco", "quantity": "para decorar", "type": "hierba" }
    ],
    "categories": [
      { "name": "Platos principales" },
      { "name": "Comida India" }
    ]
  }
    
  ]
const Recetas=()=>{
    const data= useContext(Context)

    const [recetas, setRecetas]=useState([])
    const [filtroRecetas, setFiltroRecetas]=useState(datosHard)
    const [filtro, setFiltro]=useState("")
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
                setRecetas([...recetas, recetasDato])
            })
  .catch(error => {
    console.error('Error al hacer la solicitud:', error);
  });
    },[data])
 

    async function handleChange(e){
        const valor=e.target.value
        setFiltro(valor)
        console.log("FILTRO", valor)
        if(valor==""){
            console.log("No hay nada", valor)
            setFiltroRecetas(datosHard)
        }else{
            const filtrado= datosHard.filter(receta => receta.title.toLowerCase().includes(valor.toLowerCase()))
            console.log("FILTRADO", filtrado)
            setFiltroRecetas(filtrado)
        }
    }
    console.log(filtroRecetas)
    return (
        (recetas && <div className="recetas">

        <input  placeholder="Buscar recetas..."
                value={filtro}
                onChange={handleChange}
                type="text"
        />
        <div className="contenedor">
            {filtroRecetas.map(receta=>(
                <div className="contenedorDeRecetas">
                <RecetaCard receta={receta}/>
            </div>
            ))}
        </div></div>)
    )
}

export default Recetas