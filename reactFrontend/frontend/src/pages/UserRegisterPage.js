import React from "react";
import staffLogin from "../apiLinks/ApiEndpoints";

import TopNavBar from "../components/TopNavBar";
import UserRegister from "../components/UserRegister";

function UserRegisterPage(){

    

    return (
        <div>
            <TopNavBar></TopNavBar>
            <h1>Register</h1>
            <UserRegister></UserRegister>



        </div>
    )
}

export default UserRegisterPage;