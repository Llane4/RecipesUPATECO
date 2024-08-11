import { useState } from "react";
import "./modal.css"
import axios from "axios";

const ModalImagen=({userImage, fetchUser})=>{
    const [showModal, setShowModal] = useState(false);
    const [imagenPerfil, setImagenPerfil]=useState(null)
    console.log(userImage)
    const handleOpenModal=()=>{
        setShowModal(!showModal)
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const formData = new FormData();
        formData.append('image', imagenPerfil);

        try {
            await axios.patch(`${import.meta.env.VITE_BASE_URL}/users/profiles/${localStorage.getItem("id")}/`,
            formData,
            {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: `Token ${localStorage.getItem("token")}`
                }
              }

        )
        fetchUser()
        handleOpenModal()
        } catch (error) {
            
        }

    }
    const handleChange=async(e)=>{
        const imagen = e.target.files[0]; // Obtiene el archivo seleccionado
    if (imagen) {
        setImagenPerfil(imagen)
    }}
    return <>
        <img
              src={userImage?`${import.meta.env.VITE_BASE_URL}${userImage}`:"https://via.placeholder.com/150"}
              className="profile-image"
              onClick={handleOpenModal}
        />
        <div className={showModal?"modal-background":"disabled"}>
        <div className="modal-item" >
            <div>
                <label>
                <h2>Cambiar foto de perfil: </h2>
                   <input
                        type="file" 
                        accept="image/*"
                        onChange={handleChange}
                        />
                </label>
            </div>
        <button type="button" onClick={handleOpenModal}>Cancelar</button>
        <button type="button" onClick={handleSubmit}>Enviar</button>
        </div>
        </div>
    
    
    </>
}

export default ModalImagen