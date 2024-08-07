import "./pasos.css"
import { useEffect, useState } from "react"
import axios from "axios"

const Pasos=({recetaId})=>{
    const recetaID=recetaId
    const [pasos, setPasos]=useState([])
    //Hacer fetch a los pasos, conseguir los que corresponden a mi receta, y ordenar los pasos dependiendo del order
    useEffect(()=>{
        const pasosFetch=async()=>{
        try {
            const responsePasos=await axios.get(`${import.meta.env.VITE_BASE_URL}/reciperover/steps?page_size=100`)
            const datosPasos=responsePasos.data.results

            const pasosReceta=[]

            for(let paso of datosPasos){
                if(paso.recipe == recetaID){
                    pasosReceta.push(paso)
                    }
                }
            pasosReceta.sort((a, b) => a.order - b.order)
            setPasos(pasosReceta)
        } catch (error) {
            
        }
    }
        pasosFetch()

    }, [recetaID])
    console.log("PASOS RECETA", pasos)
    return (
        <div>
            <ul>
                {pasos && pasos.map((paso, index)=>(
                    <li className="paso" key={index}>
                        {index + 1}. {paso.instruction}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Pasos