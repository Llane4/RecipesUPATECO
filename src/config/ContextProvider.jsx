import { useState } from "react";
import Context from "./context";

const ContextProvider=({children})=>{
    const [recetaID, setRecetaID]=useState(null)
    
    return(
        <Context.Provider value={{recetaID, setRecetaID}}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider