import { useState,useEffect, useContext } from "react";
import axios from "axios";
import Context from "../config/context";
import { useNavigate } from "react-router-dom";

const Login=()=>{
    const data=useContext(Context)
    const navigate=useNavigate()

    useEffect(() => {
        if (data.isLogged) {
          navigate("/categorias");
        }
      }, [data.isLogged, navigate]);
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
                await data.setUserData(datos.data)
                await data.login()
            }
        }).catch(function (error) {
            console.log(error.response.data.non_field_errors[0]);
          })
    }
    return (
        <div style={{marginTop:"52px"}}>
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