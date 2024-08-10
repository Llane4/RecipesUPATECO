import { useEffect, useState } from "react"
import "./puntuacion.css"
import axios from "axios"
import ModalRating from "../Modal/ModalRating"
const Puntuacion=({recetaID})=>{
    const [rating, setRating]=useState("")
    const [cantRating, setCantRating]=useState("")
    const fetchRating=async () =>{
        const responseRating=await axios.get(`${import.meta.env.VITE_BASE_URL}/reciperover/ratings/?page_size=1000`)
        const miRating=await responseRating.data.results.filter(e=>e.recipe==recetaID)
        console.log(miRating)
        let prom=0
        for(var i=0;i<miRating.length;i++){
            console.log(miRating[i].rating)
            prom+=miRating[i].rating
        }
        setRating(prom/(miRating.length))
        setCantRating(miRating.length)
    }
    useEffect(()=>{   
        fetchRating()
    },
    [])
    console.log("RATING", rating)
    console.log("Cant rating", cantRating)
    return (rating?<div>
        ⭐ {rating}/5 {`(Votos: ${cantRating})`}
        <ModalRating recetaID={recetaID} fetchComments={fetchRating}/>
    </div>:null)
}

export default Puntuacion