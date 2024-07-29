import "./crearReceta.css"
import axios from "axios"
import { useState, useEffect } from "react"
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
            console.log(response.data)
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

    const handleButtonCategoria=(e)=>{
        e.preventDefault()
        const idCat=categorias.find(categoria => categoria.name == e.target.value)
        setCategoriasReceta([...categoriasRecetas, {
            name: e.target.value,
            id: idCat
        }])
    }

    useEffect(()=>{
        const fetchIngredientes=async ()=>{

            const ingredientesData=await axios.get("https://sandbox.academiadevelopers.com/reciperover/ingredients")
            const categoriasData=await axios.get("https://sandbox.academiadevelopers.com/reciperover/categories")
            setCategorias(categoriasData.data)
            setIngredientes(ingredientesData.data)
        }
        fetchIngredientes()
    },[])
    console.log(ingredientes)
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
                <option disabled>Inserte ingrediente</option>
                {ingredientes && ingredientes.map(ingrediente=>(
                    <option className="ingrediente" key={ingrediente.id} value={ingrediente.id}>{ingrediente.name}</option>
                ))}
            </select> 
            <input placeholder="Cantidad" name="quantity" value={ingredienteSeleccionado.quantity} onChange={handleChangeIngredienteS}/>
            <select value={ingredienteSeleccionado.measure} name="measure"  onChange={handleChangeIngredienteS}>
                <option disabled>Unidad</option>
                {unidades && unidades.map((unidad, index)=>(
                    <option key={index}>{unidad}</option>
                ))}
            </select> 
            <button onClick={handleButtonIngrediente}>+</button>
            </div> 
            <div className="ingredientes">
                {ingredientesReceta && ingredientesReceta.map(ingR=>(
                    <div className="ingrediente">{ingR.name} {ingR.quantity} {ingR.measure}</div>
                ))}
                
            </div>
            <div>
                Categorias: 
                <select>
                <option disabled>Inserte categoria</option>
                {categorias && categorias.map((categoria, index)=>(
                    <option key={index}>{categoria.name}</option>
                ))}
                </select>
                <button onClick={handleButtonCategoria}>+</button>
            </div>
                <div className="ingredientes">
                <div className="ingrediente">Postres</div>
            </div>
            Pasos:
            <textarea className="pasosarea">

            </textarea>
            <div>
                <button>Agregar paso</button>
            </div>
            <div className="ingredientes">
                <div className="pasos">Lorem iiditate minus in,  dicta?</div>    
                <div className="pasos">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto ipsam, a quidem incidunt, earum quibusdam corporis ex labore cum possimus tempore. Hic voluptatum laboriosam cupiditate minus in, ipsam accusamus dicta?</div>  
            </div>







            <button type="submit">Crear Receta</button>
            
            
            
            
        </form>
    </div>)
}

export default CrearReceta