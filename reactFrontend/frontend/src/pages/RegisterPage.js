import React from "react";
import staffLogin from "../apiLinks/ApiEndpoints";
import Register from "../components/Register";

function RegisterPage(){

    const check = () => {
        console.log(staffLogin)
    }

    return (
        <div>
            <h1>Register</h1>
            <br/>
            <br/>
            <button onClick={check}>test</button>
            <Register></Register>



        </div>
    )
}

export default RegisterPage;