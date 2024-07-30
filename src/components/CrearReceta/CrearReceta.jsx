import "./crearReceta.css"
import axios from "axios"
import { useState, useEffect } from "react"
import Modal from "../Modal/Modal"
const unidades= ["g", "kg", "lbs", "oz", "ml", "l", "cup", "tbsp", "tsp", "u", "pcs", "pkgs", "pinch", "bunch" ]
const CrearReceta=()=>{
    const [receta, setReceta]=useState({
        title:"",
        description:"",
        preparation_time:"",
        cooking_time:"",
        servings:""
    })

    //Ingredientes
    const [ingredientes, setIngredientes]=useState([])
    const [ingredienteSeleccionado, setIngredienteSeleccionado]=useState({
        ingredient:"",
        name:"",
        quantity:"",
        measure:"",

    })
    const [ingredientesReceta, setIngredientesReceta]=useState([])

    //Categorias
    const [categorias, setCategorias]=useState([])
    const [categoriasRecetas, setCategoriasReceta]=useState([])
    const [categoriaSeleccionado, setCategoriaSeleccionado]=useState()

    //Pasos
    const [pasoActual, setPasoActual]=useState()
    const [pasos, setPasos]=useState([])

    const handleChangeReceta=(e)=>{
        const {name, value} = e.target
        setReceta(state => ({
            ...state,
            [name]: value
        }))
    }
    const handleChangeIngredienteS=(e)=>{
        const {name, value} = e.target
        if(name=="ingredient"){
            const nombreIngrediente = ingredientes.find(ingrediente => ingrediente.id === parseInt(value))

            setIngredienteSeleccionado(state => ({
                ...state,
                [name]: value,
                name: nombreIngrediente.name
            }))
        }
        else{
            setIngredienteSeleccionado(state => ({
                ...state,
                [name]: value
            }))
        }
        
    }

    const handleSubmit=async (e)=>{
        e.preventDefault()
        console.log(receta)
        try {
            //Post de la receta base
            const response = await axios.post(
                'https://sandbox.academiadevelopers.com/reciperover/recipes/',
                receta,
                {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${import.meta.env.VITE_API_TOKEN}`
                  }
                }
              );
            const idReceta=response.data.id
            console.log(response.data)
            //Post de ingredientes a la receta
            const responseIngredientes= await ingredientesReceta.map(async(ingR)=>{
                await axios.post("https://sandbox.academiadevelopers.com/reciperover/recipe-ingredients/",
                    {
                        quantity: ingR.quantity,
                        measure:  ingR.measure,
                        ingredient: ingR.ingredient,
                        recipe: idReceta
                    },
                    {
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Token ${import.meta.env.VITE_API_TOKEN}`
                      }
                    }
                )
            })
            //Post de las categorias a la receta
            const responseCategorias= await categoriasRecetas.map(async(catR)=>{
                await axios.post("https://sandbox.academiadevelopers.com/reciperover/recipe-categories/",
                    {
                        category: catR.id,
                        recipe: idReceta
                    },
                    {
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Token ${import.meta.env.VITE_API_TOKEN}`
                      }
                    }
                )
            })

            //Post de los pasos de la receta
            const responsePasos=await pasos.map(async(paso, index)=>{
                await axios.post("https://sandbox.academiadevelopers.com/reciperover/steps/",
                    {
                        order: (index+1),
                        instruction: paso,
                        recipe: idReceta
                    },
                    {
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Token ${import.meta.env.VITE_API_TOKEN}`
                      }
                    }
                )
            })

        } catch (error) {
            
        }
    }


    const handleButtonIngrediente=(e)=>{
        e.preventDefault();
        setIngredientesReceta([...ingredientesReceta, ingredienteSeleccionado])
        setIngredienteSeleccionado({
            ingredient:"",
            name:"",
            quantity:"",
            measure:"",
    
        })
    }

    const handleChangeCategorias=(e)=>{
        e.preventDefault()
        console.log(e.target.value)
        const idCat=categorias.find(categoria => categoria.name == e.target.value)
        setCategoriaSeleccionado({
            name: e.target.value,
            id: idCat.id
        })
        
    }
    const handleButtonCategoria=(e)=>{
        e.preventDefault()
        setCategoriasReceta([...categoriasRecetas, categoriaSeleccionado])
    }

    const handleChangePaso=(e)=>{
        setPasoActual(e.target.value)
    }

    const handleButtonPaso=(e)=>{
        e.preventDefault()
        setPasos([...pasos, pasoActual])
        setPasoActual("")
    }

    const borrarElemento=({tipo, id})=>{
        console.log(tipo, id)
        switch (tipo) {
            case "Ingrediente":
                var indexAEliminar=ingredientesReceta.findIndex((e)=>e.ingredient==id)
                console.log(indexAEliminar)
                setIngredientesReceta([...ingredientesReceta.slice(0,indexAEliminar), ...ingredientesReceta.slice(indexAEliminar+=1, ingredientesReceta.lenght)]) 
                break;
            case "Categoria":
                var indexAEliminar=categoriasRecetas.findIndex((e)=>e.id==id)
                setCategoriasReceta([...categoriasRecetas.slice(0,indexAEliminar), ...categoriasRecetas.slice(indexAEliminar+=1, categoriasRecetas.lenght)]) 
                break;
            case "Paso":
                var indexAEliminar=pasos.findIndex((e)=>e==id)
                setPasos([...pasos.slice(0,indexAEliminar), ...pasos.slice(indexAEliminar+=1, pasos.lenght)]) 
                break;
            default:
                break;
        }
        }



    useEffect(()=>{
        const fetchIngredientes=async ()=>{

            const ingredientesData=await axios.get("https://sandbox.academiadevelopers.com/reciperover/ingredients?page_size=100")
            const categoriasData=await axios.get("https://sandbox.academiadevelopers.com/reciperover/categories")
            setCategorias(categoriasData.data.results)
            setIngredientes(ingredientesData.data.results)
        }
        fetchIngredientes()
    },[])
    return(<div className="contenedor">
        <form className="formContainer" onSubmit={handleSubmit}>
            <div className="formItems">
                <label>Nombre de la receta: </label><input required type="text" name="title" value={receta.title} onChange={handleChangeReceta} />
            </div>
            <div className="formItems">
                <label>Descripcion:</label> <input name="description" value={receta.description} onChange={handleChangeReceta}/>
            </div>
            <div className="formItems">
                <label>Tiempo de preparacion: </label><input required name="preparation_time" value={receta.preparation_time} onChange={handleChangeReceta}/>
            </div>
            <div className="formItems">
                <label>Tiempo de cocinado: </label><input  name="cooking_time" value={receta.cooking_time} onChange={handleChangeReceta}/>
            </div>
            <div className="formItems">
                <label>Porciones: </label><input name="servings" value={receta.servings} onChange={handleChangeReceta}/>
            </div>
            <div>
            <select  id="ingredientes" name="ingredient"  onChange={handleChangeIngredienteS}>
                <option disabled selected>Inserte ingrediente</option>
                {ingredientes && ingredientes.map(ingrediente=>(
                    <option className="ingrediente" key={ingrediente.id} value={ingrediente.id} >{ingrediente.name}</option>
                ))}
            </select> 
            <input placeholder="Cantidad" name="quantity" value={ingredienteSeleccionado.quantity} onChange={handleChangeIngredienteS}/>
            <select value={ingredienteSeleccionado.measure} name="measure"  onChange={handleChangeIngredienteS}>
                <option disabled selected>Unidad</option>
                {unidades && unidades.map((unidad, index)=>(
                    <option key={index}>{unidad}</option>
                ))}
            </select> 
            <button onClick={handleButtonIngrediente}>+</button>
            <Modal tipo={"Ingrediente"}/>
            </div> 
            <div className="ingredientes">
                {ingredientesReceta && ingredientesReceta.map(ingR=>(
                    <div className="ingrediente"  onClick={() => borrarElemento({tipo:"Ingrediente" , id:ingR.ingredient})}>{ingR.name} {ingR.quantity} {ingR.measure}</div>
                ))}
                
            </div>
            <div>
                Categorias: 
                <select onChange={handleChangeCategorias}>
                <option disabled selected>Inserte categoria</option>
                {categorias && categorias.map((categoria, index)=>(
                    <option key={index}>{categoria.name}</option>
                ))}
                </select>
                <button onClick={handleButtonCategoria}>+</button>
                <Modal tipo={"Categoria"}/>
            </div>
                <div className="ingredientes">
                    {categoriasRecetas && categoriasRecetas.map((categoria, index)=>(
                        <div className="ingrediente" key={index} onClick={() => borrarElemento({tipo:"Categoria" , id:categoria.id})}>{categoria.name}</div>
                    ))}
                
                </div>
            Pasos:
            <textarea className="pasosarea" 
                        rows={5} 
                        placeholder="Escribe los pasos de la receta..."
                        value={pasoActual}
                        onChange={handleChangePaso}
                        >
                    
            </textarea>
            <div>
                <button onClick={handleButtonPaso}>Agregar paso</button>
            </div>
            <div className="ingredientes">
                {pasos && pasos.map((paso, index)=>(
                    <div className="pasos" onClick={() => borrarElemento({tipo:"Paso" , id: paso})} key={index}>{paso}</div>
                ))}
            </div>







            <button type="submit">Crear Receta</button>
            
            
            
            
        </form>
    </div>)
}

export default CrearReceta