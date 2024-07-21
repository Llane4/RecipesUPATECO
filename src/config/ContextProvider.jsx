import { useState } from "react";
import Context from "./context";

const ContextProvider=({children})=>{
    const [isLogged, setIsLogged] = useState(false);
    const login = () => setIsLogged(true);
    const logout = () => setIsLogged(false);
    
    return(
        <Context.Provider value={{isLogged, login, logout}}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider