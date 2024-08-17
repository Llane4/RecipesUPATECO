import axios from "axios";
import { createContext, useState, useContext } from "react";

const UserContext= createContext()

const dataUser=()=> useContext(UserContext)

const UserContextProvider=({ children })=>{
    const [user, setUser]=useState(null)

    const fetchUser=async(id=null)=>{
        if(id){
        const responseUser=await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profiles/${localStorage.getItem("id")}`, {
            headers: {
              'Authorization': `Token ${localStorage.getItem("token")}`,
              'Content-Type': 'application/json'
            }
          })
          setUser({
            userName: responseUser.data.first_name + " " + responseUser.data.last_name,
            image: responseUser.data.image
          })
        }else{
            console.log("NO hay use")
        }
    }

    return (<UserContext.Provider value={{ user, setUser, fetchUser }}>
        {children}
    </UserContext.Provider>)

}

export {dataUser, UserContextProvider}