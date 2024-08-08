import { useState } from "react";
import "./modal.css"
import axios from "axios";


const ModalRating = ({recetaID})=>{
    const [showModal, setShowModal] = useState(false);
    const [rating, setRating]=useState({
        rating:"",
        recipe:recetaID
    })
    const handleOpenModal=()=>{
        setShowModal(!showModal)
    }

    const handleSubmit=async (e)=>{
        console.log("SUBMIT")
        console.log(rating)
        const fetchRating=await axios.get(`${import.meta.env.VITE_BASE_URL}/reciperover/ratings/`)
        console.log(fetchRating.data.results)
        const envioPuntuacioon= fetchRating.data.results.filter(e=>e.author==localStorage.getItem("id") && e.recipe==recetaID)
        console.log(envioPuntuacioon)
        if(envioPuntuacioon.length>0){
            alert("Ya enviaste una puntuacion")
            handleOpenModal()
        } else {
            await axios.post(`${import.meta.env.VITE_BASE_URL}/reciperover/ratings/`, rating ,{
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Token ${import.meta.env.VITE_API_TOKEN}`
                }
              } )
        }
    }

    const handleChange=(e)=>{
        e.preventDefault()
        setRating({
            ...rating,
            rating: e.target.value
        })
    }
    return <div>
                <div onClick={handleOpenModal}><h3 className="crearmodal">Votar</h3></div>
                <div className={showModal?"modal-background":"disabled"}>

                <div className="modal-item" >
                    <div>
                        <label>
                        <h2>Puntos: </h2>
                            <select onChange={handleChange}>
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                            
                        
                        </label>
                    </div>
                <button type="button" onClick={handleOpenModal}>Cancelar</button>
                <button type="button" onClick={handleSubmit}>Enviar</button>
                </div>
                </div>
            </div>
}

export default ModalRating