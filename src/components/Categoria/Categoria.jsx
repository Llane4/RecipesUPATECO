import { useEffect, useState } from "react";
import "./categoria.css"

const Categoria=({categoria, categoriaID, filtroCategorias, setFiltroCategorias})=>{
    const [activado, setActivado]=useState(false)
    const handleClick=()=>{
        setActivado(!activado)
        if(filtroCategorias.includes(categoriaID)){
            var indexAEliminar=filtroCategorias.findIndex((e)=>e==categoriaID)
            setFiltroCategorias([...filtroCategorias.slice(0,indexAEliminar), ...filtroCategorias.slice(indexAEliminar+=1, filtroCategorias.lenght)])
          
        }else{
            setFiltroCategorias([...filtroCategorias , categoriaID])
        }
    }
    return(<div className={`categoria ${activado ? 'active' : ''}`} onClick={() => handleClick()}>
        {categoria}
    </div>)
}
export default Categoria