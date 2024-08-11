import { useState, useEffect } from "react";
import axios from "axios";
import "./recetas.css"
import RecetaCard from "../RecetaCard/RecetaCard";
import Categoria from "../Categoria/Categoria";

const Recetas=()=>{

    const [recetas, setRecetas]=useState([])
    const [filtroRecetas, setFiltroRecetas]=useState(recetas)
    const [filtro, setFiltro]=useState("")
    const [categorias, setCategorias]=useState([])
    const [filtroCategorias, setFiltroCategorias]=useState([])
    const url=`${import.meta.env.VITE_BASE_URL}/reciperover/recipes?page_size=100`
    useEffect( ()=>{
        axios.get(url)
            .then(async response => {
                  const categoriasdatos=await axios.get(`${import.meta.env.VITE_BASE_URL}/reciperover/categories`)
                  const recetasDatos=response.data.results.map(receta=>({
                    id: receta.id,
                    title: receta.title,
                    description: receta.description,
                    preparation_time: receta.preparation_time,
                    cooking_time: receta.cooking_time,
                    servings: receta.servings,
                    image:receta.image,
                    view_count: receta.view_count,
                    owner: receta.owner,
                    ingredients: receta.ingredients,
                    locations: receta.locations,
                    categories: receta.categories
                }))
                setRecetas(prevRecetas => [...prevRecetas, ...recetasDatos]);
                setFiltroRecetas(prevRecetas => [...prevRecetas, ...recetasDatos])
                setCategorias(categoriasdatos.data.results)
            })
  .catch(error => {
    console.error('Error al hacer la solicitud:', error);
  });
    },[])
 
    
    useEffect(()=>{
      const valor=filtro
      setFiltro(valor)
      if(false){
          console.log("No hay nada", valor)
          setFiltroRecetas(recetas)
      }else{
          const filtrado= recetas.filter(receta => {
            const filtroPorNombres=receta.title.toLowerCase().includes(valor.toLowerCase())
            const filtroPorCategoria=filtroCategorias.length === 0 || filtroCategorias.some(categoria => receta.categories.includes(categoria));
            return filtroPorNombres && filtroPorCategoria
          })
          setFiltroRecetas(filtrado)
      }
    }, [filtro, filtroCategorias, recetas])
    return (
        (recetas && <div className="recetas">

        <input  placeholder="Buscar recetas..."
                value={filtro}
                onChange={e=>{setFiltro(e.target.value)}}
                type="text"
        />

        <div className="contenedor">
        <h1>
            Categorias:

            </h1>
          <div className="categorias">
              {categorias && categorias.map((categoria, index)=>(
                <Categoria key={index} categoria={categoria.name} categoriaID={categoria.id} filtroCategorias={filtroCategorias} setFiltroCategorias={setFiltroCategorias}/>
              ))}
              <Categoria categoria={"Todos"} categoriaID={-1} filtroCategorias={filtroCategorias} setFiltroCategorias={setFiltroCategorias}/>
          </div>
          <div>
          
          <div className="contenedorDeRecetas">
            {filtroRecetas.map((receta, index)=>(
              
                <RecetaCard receta={receta} key={receta.id}/>
              ))}
              </div>
            </div>
        </div>
        
        </div>)
    )
}

export default Recetas