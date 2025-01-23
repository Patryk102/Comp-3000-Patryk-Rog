import React from "react";
import staffLogin from "../apiLinks/ApiEndpoints";
import Register from "../components/Register";
import TopNavBar from "../components/TopNavBar";

function UserRegisterPage(){

    const check = () => {
        console.log(staffLogin)
    }

    return (
        <div>
            <TopNavBar></TopNavBar>
            <h1>Register</h1>
            <br/>
            <br/>
            <button onClick={check}>test</button>
            <Register></Register>



        </div>
    )
}

export default UserRegisterPage;