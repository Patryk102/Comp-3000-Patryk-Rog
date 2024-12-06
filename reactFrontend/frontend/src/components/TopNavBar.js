import React from "react";
import { Link, useNavigate } from 'react-router-dom';



function TopNavBar(){
    const navigate = useNavigate()

    const processPressLogin = () => {
        processLoginRegister("login", navigate);
    }

    const processPressRegister = () => {
        processLoginRegister("register", navigate);
    }


    return (
        <div>
            <button onClick={processPressLogin}>Login</button>
            <button onClick={processPressRegister}>Register</button>


        </div>




    )
}

function processLoginRegister(action, navigate){
    if (action == "login"){
        navigate("/stafflogin");
    }
    if (action == "register"){
        navigate("/staffRegister")
    }

}


export default TopNavBar;