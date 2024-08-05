import { useState,useEffect, useContext } from "react";
import axios from "axios";
import Context from "../config/context";
import { useNavigate } from "react-router-dom";


const Login=()=>{
    const data=useContext(Context)
    const navigate=useNavigate()

    useEffect(() => {
      console.log("DATA",data)
        if (localStorage.getItem("id")) {
          navigate("/recetas");
        }
      }, [localStorage.getItem("id"), navigate]);
    const [form, setForm]=useState({
        username: "",
        password:""
    })
    const handleChange=(e) => {
        const { name, value } = e.target;
        setForm({
          ...form,
          [name]: value
        });
      };

    const handleSubmit=(e)=>{
        e.preventDefault()
        logUser()
        
    }

    function logUser(){
        axios.post('https://sandbox.academiadevelopers.com/api-auth/', form, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
        .then(async response=>{
      
            if(response.data.token){
              await localStorage.setItem("token", response.data.token)
              await localStorage.setItem("isLogged", true)
              const datos=await axios.get(
                'https://sandbox.academiadevelopers.com/users/profiles/profile_data/',
                {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${import.meta.env.VITE_API_TOKEN}`
                  }
                }
              )
              console.log(datos.data)
                await localStorage.setItem("id", datos.data.user__id)
                await data.setUserData(datos.data)
                await data.login()
            }
        }).catch(function (error) {
            console.log(error);
          })
    }

    const borrarDatos=(e)=>{
      e.preventDefault()
      localStorage.removeItem("token")
      localStorage.removeItem("id")

    }
    return (
        <div style={{marginTop:"52px"}}>
            <button onClick={borrarDatos}>Borrar datos</button>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username: </label>
                    <input type="text" id="username" name="username" value={form.username} onChange={handleChange}/>
                </div>
                <div>
                    <label>Password: </label>
                    <input type="password" id="password" name="password" value={form.password} onChange={handleChange}/>
                </div>
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}

export default Login