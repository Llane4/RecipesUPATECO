import { useContext, useEffect, useState } from "react"
import "./puntuacion.css"
import axios from "axios"
import ModalRating from "../Modal/ModalRating"
import Context from "../../config/context"
const Puntuacion=()=>{
    const data=useContext(Context)
    const [rating, setRating]=useState("")
    const [cantRating, setCantRating]=useState("")
    const fetchRating=async () =>{
        const responseRating=await axios.get(`${import.meta.env.VITE_BASE_URL}/reciperover/ratings/?page_size=1000`)
        const miRating=await responseRating.data.results.filter(e=>e.recipe==data.recetaID)
        let prom=0
        for(var i=0;i<miRating.length;i++){
            prom+=miRating[i].rating
        }
        setRating(Math.floor(prom/(miRating.length)))
        setCantRating(miRating.length)
    }
    useEffect(()=>{   
        fetchRating()
    },
    [])
    console.log("Puntuacion", data.recetaID)
    return (rating?<div>
        ⭐ {rating}/5 {`(Votos: ${cantRating})`}
        {localStorage.getItem("token") && <ModalRating fetchComments={fetchRating}/>}
    </div>:<div><p>⭐ Sin votos</p>  {localStorage.getItem("token") && <ModalRating fetchComments={fetchRating}/>}</div>)
}

export default Puntuacion