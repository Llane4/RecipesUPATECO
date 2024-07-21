import { useState,useEffect, useContext } from "react";
import axios from "axios";
import Context from "../config/context";
import { useNavigate } from "react-router-dom";

const Login=()=>{
    const data=useContext(Context)
    const navigate=useNavigate()
    console.log(data)

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
        console.log("Formulario;" , form)
        axios.post('https://sandbox.academiadevelopers.com/api-auth/', form, {
            headers: {
              'Content-Type': 'application/json' // Ajusta esto según lo que necesite tu API
            }
          })
        .then(async response=>{
            console.log(response.data)
            if(response.data.token){
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