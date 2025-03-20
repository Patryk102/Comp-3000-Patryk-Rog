import React from "react";
//import staffLogin from "../apiLinks/ApiEndpoints";
//import Register from "../components/Register";
import TopNavBar from "../components/TopNavBar";
import StaffRegister from "../components/StaffRegister";
import "../pageStyles/LoginRegisterStyle.css";

function RegisterPage(){

    return (
        <div>
            <TopNavBar></TopNavBar>
            <div className='restMainDiv'>
                <h1>Register</h1>
                <div className='description'>
                    <div className='descriptionContents'>
                        <StaffRegister></StaffRegister>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default RegisterPage;