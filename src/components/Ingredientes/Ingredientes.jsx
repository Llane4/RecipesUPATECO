import { useContext, useEffect, useState } from "react"
import "./ingredientes.css"
import axios from "axios"
import Context from "../../config/context"


const Ingredientes=()=>{
    const data=useContext(Context)
    const [ingredientes, setIngredientes]=useState([])

    useEffect(() => {
        const fetchIngredientes = async () => {
          try {
            const url = `${import.meta.env.VITE_BASE_URL}/reciperover/recipes/${data.recetaID}/ingredients/`;
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
      }, [data.recetaID]);
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