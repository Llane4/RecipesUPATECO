import { useEffect, useState } from "react";
import "./profilePage.css"
import axios from "axios";
import EditarPage from "../EditarPage/EditarPage";
import MisComentarios from "../Comentarios/MisComentarios";
import ModalImagen from "../Modal/ModalImagen";

const ProfilePage=()=>{
    const [user, setUser]=useState()
    const [isLoading, setIsLoading]=useState(false)
    const fetchUser=async()=>{
        const responseUser=await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profiles/profile_data/`,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem("token")}`
              }
            }
        )
        setUser(responseUser.data)
        setIsLoading(true)
    }
    useEffect(()=>{
        fetchUser()
    }, [])
    return (isLoading?
        <div className="profile-container">
          <div className="profile-header">
            <ModalImagen userImage={user.image} fetchUser={fetchUser}/>
            <div className="profile-info">
              <h1>{user.first_name} {user.last_name}</h1>
              <p>{user.email}</p>
            </div>
          </div>
          <div className="profile-content">
            <EditarPage/>
            <MisComentarios/>
          </div>
        </div> :<h2 style={{marginTop:"54px"}}>Cargando...</h2>
      );
}

export default ProfilePage