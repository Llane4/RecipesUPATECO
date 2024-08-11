import { useState,useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Login=()=>{
    const navigate=useNavigate()

    useEffect(() => {
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
        axios.post(`${import.meta.env.VITE_BASE_URL}/api-auth/`, form, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
        .then(async response=>{
      
            if(response.data.token){
              await localStorage.setItem("token", response.data.token)
              await localStorage.setItem("isLogged", true)
              const datos=await axios.get(
                `${import.meta.env.VITE_BASE_URL}/users/profiles/profile_data/`,
                {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${response.data.token}`
                  }
                }
              )
                await localStorage.setItem("id", datos.data.user__id)
                navigate("/recetas");
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
        <div className="contenedor" style={{marginTop:"52px"}}>
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