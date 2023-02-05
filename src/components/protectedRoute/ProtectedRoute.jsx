import { Navigate , Outlet } from "react-router-dom";
import { useContext } from "react";
import { Session } from "../../context/sessionContext";

export const ProtectedRoute = () =>{
    
    const {userSession} = useContext(Session);
    if(!userSession){
        return <Navigate to='/login'></Navigate>
    }

    return <Outlet/>
}
