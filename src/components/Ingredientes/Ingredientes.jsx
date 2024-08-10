import { useEffect, useState } from "react"
import "./ingredientes.css"
import axios from "axios"


const Ingredientes=({recetaID})=>{
    const [ingredientes, setIngredientes]=useState([])

    useEffect(() => {
        const fetchIngredientes = async () => {
          try {
            const url = `${import.meta.env.VITE_BASE_URL}/reciperover/recipes/${recetaID}/ingredients/`;
            const responseIngredientes = await axios.get(url);
            const datosIngredientes = responseIngredientes.data.results;
    
            const datosUnidos = [];
            for (let ingrediente of datosIngredientes) {
              const responseDetalle = await axios.get(`${import.meta.env.VITE_BASE_URL}/reciperover/ingredients/${ingrediente.ingredient}`);
              datosUnidos.push({
                ...ingrediente,
                name: responseDetalle.data.name
              });
            }
    
            setIngredientes(datosUnidos);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchIngredientes();
      }, [recetaID]);
    return (
        <div>
            {ingredientes && ingredientes.map((ingrediente, index)=>(
                <div key={index}>
                    <h4>{ingrediente.quantity}{ingrediente.measure} {ingrediente.name}</h4>
                </div>
            ))}
        </div>
    )
}

export default Ingredientes