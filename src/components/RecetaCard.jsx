import "./recetacard.css"
const RecetaCard=({receta})=>{
    console.log(receta)
    return (
        <div className="card">
            <img src="https://cdn0.recetasgratis.net/es/posts/6/2/9/galletas_con_chispas_de_chocolate_caseras_35926_600.webp"/>
            <h2>{receta.title}</h2>
            <h3>{receta.description}</h3>
        </div>
    )
}

export default RecetaCard;