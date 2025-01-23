import React from "react";
import staffLogin from "../apiLinks/ApiEndpoints";

import TopNavBar from "../components/TopNavBar";
import UserRegister from "../components/UserRegister";

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
            <UserRegister></UserRegister>



        </div>
    )
}

export default UserRegisterPage;