import { UserContextProvider } from "../../config/UserContextProvider";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
function NavbarLayout() {
    return (
        <div>
            <UserContextProvider>
            <Navbar />
            <Outlet />
            </UserContextProvider>
        </div>
    );
}

export default NavbarLayout