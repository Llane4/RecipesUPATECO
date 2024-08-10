import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
function NavbarLayout() {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    );
}

export default NavbarLayout