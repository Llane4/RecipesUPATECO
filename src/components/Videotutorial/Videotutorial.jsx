import { useState } from "react"
import "./videotutorial.css"

const Videotutorial=({url})=>{
    const videoUrl = `https://www.youtube.com/embed/${url}`;
    console.log(videoUrl)
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