import "./crearReceta.css"
import axios from "axios"
import { useState, useEffect } from "react"
import Modal from "../Modal/Modal"
import { useNavigate, useParams } from "react-router-dom"
const unidades= ["g", "kg", "lbs", "oz", "ml", "l", "cup", "tbsp", "tsp", "u", "pcs", "pkgs", "pinch", "bunch" ]
const CrearReceta=()=>{
    const navigate=useNavigate()
    const params=useParams()
    const [modo, setModo]=useState("crear")
    const [receta, setReceta]=useState({
        title:"",
        description:"",
        preparation_time:"",
        cooking_time:"",
        servings:"",
        image:null
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
    const [selectIng, setSelectIng]=useState("default")

    //Categorias
    const [categorias, setCategorias]=useState([])
    const [catOriginales, setCatOriginales]=useState([])
    const [categoriasRecetas, setCategoriasReceta]=useState([])
    const [categoriaSeleccionado, setCategoriaSeleccionado]=useState("default")

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
            const recetaForm = new FormData();
            recetaForm.append('title', receta.title);
            recetaForm.append('description', receta.description);
            if(receta.preparation_time)recetaForm.append('preparation_time', receta.preparation_time);
            if(receta.cooking_time)recetaForm.append('cooking_time', receta.cooking_time);
            if(receta.servings)recetaForm.append('servings', receta.servings);
            if(receta.image)recetaForm.append('image', receta.image);
            
            
            //Post de la receta base
            console.log("RECETA", receta)
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/reciperover/recipes/`,
                recetaForm,
                {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Token ${localStorage.getItem("token")}`
                  }
                }
              );
            const idReceta=response.data.id
            
            //Post de ingredientes a la receta
            const responseIngredientes= await ingredientesReceta.map(async(ingR)=>{
                await axios.post(`${import.meta.env.VITE_BASE_URL}/reciperover/recipe-ingredients/`,
                    {
                        quantity: ingR.quantity,
                        measure:  ingR.measure,
                        ingredient: ingR.ingredient,
                        recipe: idReceta
                    },
                    {
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Token ${localStorage.getItem("token")}`
                      }
                    }
                )
            })
            //Post de las categorias a la receta
            const categoriasData=await axios.get(`${import.meta.env.VITE_BASE_URL}/reciperover/recipes/${idReceta}/categories/`)
            const responseCategorias= await categoriasRecetas.map(async(catR)=>{
                await axios.post(`${import.meta.env.VITE_BASE_URL}/reciperover/recipe-categories/`,
                    {
                        category: catR.id,
                        recipe: idReceta
                    },
                    {
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Token ${localStorage.getItem("token")}`
                      }
                    }
                )
            })

            //Post de los pasos de la receta
            const responsePasos=await pasos.map(async(paso, index)=>{
                await axios.post(`${import.meta.env.VITE_BASE_URL}/reciperover/steps/`,
                    {
                        order: (index+1),
                        instruction: paso,
                        recipe: idReceta
                    },
                    {
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Token ${localStorage.getItem("token")}`
                      }
                    }
                )
            })

            navigate(`/recetas/${idReceta}`)
        } catch (error) {
            
        }
        }
        else{
            
            //Actualizar receta
            const response = await axios.put(
                `${import.meta.env.VITE_BASE_URL}/reciperover/recipes/${params.id}`,
                receta,
                {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${localStorage.getItem("token")}`
                  }
                }
            );

            //Actualizar ingredientes
            const idReceta=response.data.id
            const responseIngredientes = await axios.get(`${import.meta.env.VITE_BASE_URL}/reciperover/recipes/${idReceta}/ingredients/`);
            const datosIngredientes = responseIngredientes.data.results;
            const ingID=ingredientesReceta.map(ing=>ing.id)
            const borrarID=ingOriginales.filter(id=>!ingID.includes(id))
            const borrarIngredientes= borrarID.map(async borrar=>{
                for(var i=0;i<datosIngredientes.length; i++){
                    if(borrar == datosIngredientes[i].ingredient){
                        
                        await axios.delete(`${import.meta.env.VITE_BASE_URL}/reciperover/recipe-ingredients/${datosIngredientes[i].id}/`,
                            {
                                headers: {
                                  'Content-Type': 'application/json',
                                  Authorization: `Token ${localStorage.getItem("token")}`
                                }
                            }
                        )
                    }
                }
            })
            const result=ingredientesReceta.map(async ingrediente=>{
                if(ingOriginales.includes(parseInt(ingrediente.ingredient))){
                   
                for(var i=0;i<datosIngredientes.length; i++){
                    if(ingrediente.ingredient == datosIngredientes[i].ingredient){
                        
                        await axios.put(`${import.meta.env.VITE_BASE_URL}/reciperover/recipe-ingredients/${datosIngredientes[i].id}/`,
                            {
                                ingredient: ingrediente.ingredient,
                                measure: ingrediente.measure,
                                quantity: ingrediente.quantity,
                                recipe: idReceta
                            },
                            {
                                headers: {
                                  'Content-Type': 'application/json',
                                  Authorization: `Token ${localStorage.getItem("token")}`
                                }
                            }
                        )
                    }
                }
            }else{
                
                await axios.post(`${import.meta.env.VITE_BASE_URL}/reciperover/recipe-ingredients/`,
                    {
                        quantity: ingrediente.quantity,
                        measure:  ingrediente.measure,
                        ingredient: ingrediente.ingredient,
                        recipe: idReceta
                    },
                    {
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Token ${localStorage.getItem("token")}`
                      }
                    }
                )
            }
            })
            

            //Actualizar categorias
            const idCatBorrar= catOriginales
                .map(cat=>cat.id)
                .filter(id=>!categoriasRecetas.some(catR=>catR.id == id))

            
            if(idCatBorrar){
                await idCatBorrar.map(async(id)=>{
                    await axios.delete(`${import.meta.env.VITE_BASE_URL}/reciperover/recipes/${idReceta}/categories/${id}/`,
                        {
                          headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Token ${localStorage.getItem("token")}`
                          }
                        }
                    )
                })
            }

            const responseCategorias= await categoriasRecetas.map(async(catR)=>{
                console.log("Categoria a agregar", catR)
                await axios.post(`${import.meta.env.VITE_BASE_URL}/reciperover/recipe-categories/`,
                    {
                        category: catR.id,
                        recipe: idReceta
                    },
                    {
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Token ${localStorage.getItem("token")}`
                      }
                    }
                )
            })

            //Actualizar pasos
            const responsePasos=await axios.get(`${import.meta.env.VITE_BASE_URL}/reciperover/steps?page_size=1000`)
            const datosPasos=responsePasos.data.results

            const pasosReceta=[]

            for(let paso of datosPasos){
                if(paso.recipe == idReceta){
                    pasosReceta.push(paso.id)
                    }
                }
            const responseBorrarPasos=pasosReceta.map(async (id)=>{
                await axios.delete(`${import.meta.env.VITE_BASE_URL}/reciperover/steps/${id}/`,
                    {
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Token ${localStorage.getItem("token")}`
                      }
                    }
                )
            })

            console.log(pasosReceta)
            const responsePasos2=await pasos.map(async(paso, index)=>{
                console.log("PASO =", paso, index)
                await axios.post(`${import.meta.env.VITE_BASE_URL}/reciperover/steps/`,
                    {
                        order: (index+1),
                        instruction: paso,
                        recipe: idReceta
                    },
                    {
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Token ${localStorage.getItem("token")}`
                      }
                    }
                )
            })

            navigate(`/recetas/${idReceta}`)
            
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
        console.log(ingredienteSeleccionado)
        if(ingredienteSeleccionado.name!="" && ingredienteSeleccionado.quantity!="" && ingredienteSeleccionado.measure!=""){
            setSelectIng("default")
            setIngredientesReceta([...ingredientesReceta, ingredienteSeleccionado])
            setIngredienteSeleccionado({
                ingredient:"default",
                name:"",
                quantity:"",
                measure:"default",
            })
        }
        
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
        console.log(categoriaSeleccionado)
        if(categoriaSeleccionado!="default" && categoriaSeleccionado!=""){
            setCategoriasReceta([...categoriasRecetas, categoriaSeleccionado])
            setCategoriaSeleccionado("default")
        }
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
        
        const ingredientesData=await axios.get(`${import.meta.env.VITE_BASE_URL}/reciperover/ingredients?page_size=100`)
        const categoriasData=await axios.get(`${import.meta.env.VITE_BASE_URL}/reciperover/categories`)
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
        const recetaData=await axios.get(`${import.meta.env.VITE_BASE_URL}/reciperover/recipes/${params.id}/`)
        const {title, description, preparation_time, cooking_time, servings}=recetaData.data
        setReceta({
            title, description, preparation_time, cooking_time, servings
        })

        //Datos de la categoria a editar
        const categoriasData= await axios.get(`${import.meta.env.VITE_BASE_URL}/reciperover/recipes/${params.id}/categories/`)
        const categoriasID= categoriasData.data.results.map((c)=>c.category)
        setCatOriginales(categoriasData.data.results)
        const categoriaMap= new Map(categoriaArray.map(cat => [cat.id, cat]))
        const categoriasAñadir= categoriasID.map(id=> categoriaMap.get((id))).filter(cat=>cat!== undefined)
        categoriasAñadir.map((cat)=>{
            setCategoriasReceta((prevCat)=>[...prevCat, cat])
            
        })

        //Datos de los ingredientes a editar
        const ingredientesData= await axios.get(`${import.meta.env.VITE_BASE_URL}/reciperover/recipes/${params.id}/ingredients/`)
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
        const pasosData= await axios.get(`${import.meta.env.VITE_BASE_URL}/reciperover/steps?page_size=1000`)
        console.log(pasosData.data.results)
        const pasosAñadir=await pasosData.data.results.filter(paso=>paso.recipe==params.id)
        console.log(pasosAñadir)
        const pasosOrdenados = pasosAñadir.sort((a, b) => a.order - b.order);
        pasosOrdenados.map((paso)=>{
            console.log(paso)
            setPasos((prevPasos)=>[...prevPasos, paso.instruction])
            setPasosOriginales((prevPasosOrg)=>[...prevPasosOrg, paso.instruction])
        })

    }
    useEffect(()=>{
        
        fetchIngredientes()
        
    },[])

    const handleChangeImagen=(e)=>{
        e.preventDefault()
        
        
        const {name} = e.target
        setReceta(state => ({
            ...state,
            [name]: e.target.files[0]
        }))
    }
    console.log("PASOS", pasos)
    return(<div className="contenedorpadre">
        <div className="formContainer" >
        <form onSubmit={handleSubmit}>
            <div className="formItems">
                <label>Nombre de la receta: </label><input className="formInput" required type="text" name="title" value={receta.title} onChange={handleChangeReceta} />
            </div>
            <div className="formItems">
                <label>Descripcion:</label> <input className="formInput" name="description" value={receta.description} onChange={handleChangeReceta}/>
            </div>
            <div className="formItems">
                <label>Tiempo de preparacion: </label><input type="number" min="0" className="formInput" required name="preparation_time" value={receta.preparation_time} onChange={handleChangeReceta}/>
            </div>
            <div className="formItems">
                <label>Tiempo de cocinado: </label><input type="number" min="0" className="formInput"  name="cooking_time" value={receta.cooking_time} onChange={handleChangeReceta}/>
            </div>
            <div className="formItems">
                <label>Porciones: </label><input className="formInput" type="number" min="0" name="servings" value={receta.servings} onChange={handleChangeReceta}/>
            </div>
            <div className="formItems">
                <label htmlFor="fileInput">Selecciona una imagen:</label>
                <input type="file" className="formInput" id="fileInput" name="image" onChange={handleChangeImagen} accept="image/*" />
            </div>
            <div>
            <select value={ingredienteSeleccionado.ingredient} style={{marginTop: "30px"}} id="ingredientes" name="ingredient"  onChange={handleChangeIngredienteS}>
                <option value="default" disabled defaultValue>Inserte ingrediente</option>
                {ingredientes && ingredientes.map(ingrediente=>(
                    <option className="ingrediente" key={ingrediente.id} value={ingrediente.id} >{ingrediente.name}</option>
                ))}
            </select> 
            <input placeholder="Cantidad" type="number" min="0" name="quantity" value={ingredienteSeleccionado.quantity} onChange={handleChangeIngredienteS}/>
            <select  name="measure" value={ingredienteSeleccionado.measure}  onChange={handleChangeIngredienteS}>
                <option value="default" disabled defaultValue>Unidad</option>
                {unidades && unidades.map((unidad, index)=>(
                    <option key={index}>{unidad}</option>
                ))}
            </select> 
            <button onClick={handleButtonIngrediente}>Agregar ingrediente</button>
            <Modal tipo={"Ingrediente"} fetchIngredientes={fetchIngredientes}/>
            </div> 
            <div className="ingredientes">
                {ingredientesReceta && ingredientesReceta.map((ingR, index)=>(
                    <div className="ingrediente" key={index}  onClick={() => borrarElemento({tipo:"Ingrediente" , id:ingR.ingredient})}>{ingR.name} {ingR.quantity} {ingR.measure}</div>
                ))}
                
            </div>
            <div>
                <h3>Categorias: </h3>
                <select value={categoriaSeleccionado} onChange={handleChangeCategorias}>
                <option value="default" disabled defaultValue>Inserte categoria</option>
                {categorias && categorias.map((categoria, index)=>(
                    <option key={index}>{categoria.name}</option>
                ))}
                </select>
                <br/>
                <button onClick={handleButtonCategoria}>Agregar categoria</button>
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
        </div>
    </div>)
}

export default CrearReceta