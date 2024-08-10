import { useState } from "react"
import "./videotutorial.css"

const Videotutorial=({url})=>{
    //Este componente no se uso al final porque Recetas no tiene una propiedad que sea video
    const videoUrl = `https://www.youtube.com/embed/${url}`;
    return (<div className="video-container">
        <iframe
        width={560}
        height={315}
        src={videoUrl}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen>
        </iframe>
    </div>)
}

export default Videotutorial