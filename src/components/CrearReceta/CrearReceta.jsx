import "./crearReceta.css"
import axios from "axios"
import { useState, useEffect } from "react"
import Modal from "../Modal/Modal"
import { useParams } from "react-router-dom"
const unidades= ["g", "kg", "lbs", "oz", "ml", "l", "cup", "tbsp", "tsp", "u", "pcs", "pkgs", "pinch", "bunch" ]
const CrearReceta=()=>{
    const params=useParams()
    const [modo, setModo]=useState("crear")
    const [receta, setReceta]=useState({
        title:"",
        description:"",
        preparation_time:"",
        cooking_time:"",
        servings:""
    })

    //Ingredientes
    const [ingredientes, setIngredientes]=useState([])
    const [ingOriginales, setIngOriginales]=useState([])
    const [ingredienteSeleccionado, setIngredienteSeleccionado]=useState({
        ingredient:"",
        name:"",
        quantity:"",
        measure:"",

    })
    const [ingredientesReceta, setIngredientesReceta]=useState([])

    //Categorias
    const [categorias, setCategorias]=useState([])
    const [catOriginales, setCatOriginales]=useState([])
    const [categoriasRecetas, setCategoriasReceta]=useState([])
    const [categoriaSeleccionado, setCategoriaSeleccionado]=useState()

    //Pasos
    const [pasoActual, setPasoActual]=useState()
    const [pasos, setPasos]=useState([])
    const [pasosOriginales, setPasosOriginales]=useState([])
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
        if(modo=="crear"){

       
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
            const categoriasData=await axios.get(`https://sandbox.academiadevelopers.com/reciperover/recipes/${idReceta}/categories/`)
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
        else{
            console.log("MODO EDICION")
            //Actualizar receta
            const response = await axios.put(
                `https://sandbox.academiadevelopers.com/reciperover/recipes/${params.id}`,
                receta,
                {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${import.meta.env.VITE_API_TOKEN}`
                  }
                }
            );

            //Actualizar ingredientes
            const idReceta=response.data.id
            const responseIngredientes = await axios.get(`https://sandbox.academiadevelopers.com/reciperover/recipes/${idReceta}/ingredients/`);
            const datosIngredientes = responseIngredientes.data.results;
            const ingID=ingredientesReceta.map(ing=>ing.id)
            const borrarID=ingOriginales.filter(id=>!ingID.includes(id))
            const borrarIngredientes= borrarID.map(async borrar=>{
                for(var i=0;i<datosIngredientes.length; i++){
                    if(borrar == datosIngredientes[i].ingredient){
                        
                        await axios.delete(`https://sandbox.academiadevelopers.com/reciperover/recipe-ingredients/${datosIngredientes[i].id}/`,
                            {
                                headers: {
                                  'Content-Type': 'application/json',
                                  Authorization: `Token ${import.meta.env.VITE_API_TOKEN}`
                                }
                            }
                        )
                    }
                }
            })
            const result=ingredientesReceta.map(async ingrediente=>{
                if(ingOriginales.includes(parseInt(ingrediente.ingredient))){
                    console.log("Es un viejo ingrediente modificado")
                for(var i=0;i<datosIngredientes.length; i++){
                    if(ingrediente.ingredient == datosIngredientes[i].ingredient){
                        console.log(datosIngredientes[i])
                        await axios.put(`https://sandbox.academiadevelopers.com/reciperover/recipe-ingredients/${datosIngredientes[i].id}/`,
                            {
                                ingredient: ingrediente.ingredient,
                                measure: ingrediente.measure,
                                quantity: ingrediente.quantity,
                                recipe: idReceta
                            },
                            {
                                headers: {
                                  'Content-Type': 'application/json',
                                  Authorization: `Token ${import.meta.env.VITE_API_TOKEN}`
                                }
                            }
                        )
                    }
                }
            }else{
                console.log("Es un nuevo ingrediente")
                await axios.post("https://sandbox.academiadevelopers.com/reciperover/recipe-ingredients/",
                    {
                        quantity: ingrediente.quantity,
                        measure:  ingrediente.measure,
                        ingredient: ingrediente.ingredient,
                        recipe: idReceta
                    },
                    {
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Token ${import.meta.env.VITE_API_TOKEN}`
                      }
                    }
                )
            }
            })
            

            //Actualizar categorias
            const idCatBorrar= catOriginales
                .map(cat=>cat.id)
                .filter(id=>!categoriasRecetas.some(catR=>catR.id == id))

            console.log("ID de categorias a borrar", idCatBorrar)
            if(idCatBorrar){
                await idCatBorrar.map(async(id)=>{
                    await axios.delete(`https://sandbox.academiadevelopers.com/reciperover/recipes/${idReceta}/categories/${id}/`,
                        {
                          headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Token ${import.meta.env.VITE_API_TOKEN}`
                          }
                        }
                    )
                })
            }

            const responseCategorias= await categoriasRecetas.map(async(catR)=>{
                console.log("Categoria a agregar", catR)
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



            
        }

    }
    const filtrarUnicos=(array1, array2)=>{
        return array1.filter(obj1 => !array2.some(obj2 => objectsAreEqual(obj1, obj2)));
    }
    const compararObjetos = (obj1, obj2) => {
        return Object.keys(obj1).length === Object.keys(obj2).length &&
               Object.keys(obj1).every(key => obj1[key] === obj2[key]);
      };

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

    const fetchIngredientes=async ()=>{
        
        const ingredientesData=await axios.get("https://sandbox.academiadevelopers.com/reciperover/ingredients?page_size=100")
        const categoriasData=await axios.get("https://sandbox.academiadevelopers.com/reciperover/categories")
        setCategorias(categoriasData.data.results)
        setIngredientes(ingredientesData.data.results)
        if(params.id ){
            console.log("En modo editar")
            fetchRecetaAEditar(categoriasData.data.results, ingredientesData.data.results)
            setModo("editar")
        }
        }
    const fetchRecetaAEditar=async(categoriaArray, ingredienteArray)=>{
        console.log("Categorias", categorias)
        console.log("Ingredientes", ingredientes)
        const recetaData=await axios.get(`https://sandbox.academiadevelopers.com/reciperover/recipes/${params.id}/`)
        const {title, description, preparation_time, cooking_time, servings}=recetaData.data
        setReceta({
            title, description, preparation_time, cooking_time, servings
        })

        //Datos de la categoria a editar
        const categoriasData= await axios.get(`https://sandbox.academiadevelopers.com/reciperover/recipes/${params.id}/categories/`)
        const categoriasID= categoriasData.data.results.map((c)=>c.category)
        setCatOriginales(categoriasData.data.results)
        const categoriaMap= new Map(categoriaArray.map(cat => [cat.id, cat]))
        const categoriasAñadir= categoriasID.map(id=> categoriaMap.get((id))).filter(cat=>cat!== undefined)
        categoriasAñadir.map((cat)=>{
            setCategoriasReceta([...categoriasRecetas, cat])
            
        })

        //Datos de los ingredientes a editar
        const ingredientesData= await axios.get(`https://sandbox.academiadevelopers.com/reciperover/recipes/${params.id}/ingredients/`)
        const ingredientesID=  ingredientesData.data.results.map((i)=>i.ingredient)
        console.log("INGREDIETNES ID", ingredientesData)
        const ingredienteMap= new Map(ingredienteArray.map(ing=> [ing.id, ing]))
        const ingredientesAñadir= ingredientesID.map(id=>ingredienteMap.get((id))).filter(ing=>ing!==undefined)
        console.log("Ingredientes a añadir", ingredientesAñadir)

        const ingredientesFinal = ingredientesData.data.results
            .filter(recipeIng => ingredientesAñadir.some(ing => ing.id === recipeIng.ingredient))
            .map(recipeIng => {
                const ingredient = ingredientesAñadir.find(ing => ing.id === recipeIng.ingredient);
                return {
                    measure: recipeIng.measure,
                    quantity: recipeIng.quantity,
                    name: ingredient.name,
                    ingredient: recipeIng.ingredient
                };
            });
            console.log("INGREDIENTES FINAL", ingredientesFinal)
            ingredientesFinal.forEach((ing) => {
            setIngredientesReceta((prevIngredientesReceta) => [...prevIngredientesReceta, ing]);
            setIngOriginales((prevIngOriginales) => [...prevIngOriginales, ing.ingredient]);
          });

        //Datos de los pasos a editar
        const pasosData= await axios.get(`https://sandbox.academiadevelopers.com/reciperover/steps?page_size=1000`)
        const pasosAñadir=pasosData.data.results.filter(paso=>paso.recipe==params.id)
        pasosAñadir.map((paso)=>{
            setPasos([...pasos, paso.instruction])
            setPasosOriginales([...pasosOriginales, paso])
        })

    }
    useEffect(()=>{
        
        fetchIngredientes()
        
    },[])

    console.log("Ingredientes", ingredientesReceta)
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
                {ingredientesReceta && ingredientesReceta.map((ingR, index)=>(
                    <div className="ingrediente" key={index}  onClick={() => borrarElemento({tipo:"Ingrediente" , id:ingR.ingredient})}>{ingR.name} {ingR.quantity} {ingR.measure}</div>
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