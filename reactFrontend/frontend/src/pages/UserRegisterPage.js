import React from "react";
import staffLogin from "../apiLinks/ApiEndpoints";

import TopNavBar from "../components/TopNavBar";
import UserRegister from "../components/UserRegister";
import "../pageStyles/LoginRegisterStyle.css";

function UserRegisterPage(){

    

    return (
        <div>
            <TopNavBar></TopNavBar>
            <div className='restMainDiv'>
                <h1>Register</h1>
                <div className='description'>
                    <div className='descriptionContents'>
                        <UserRegister></UserRegister>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default UserRegisterPage;