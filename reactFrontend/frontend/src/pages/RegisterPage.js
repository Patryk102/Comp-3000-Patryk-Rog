import React from "react";
//import staffLogin from "../apiLinks/ApiEndpoints";
//import Register from "../components/Register";
import TopNavBar from "../components/TopNavBar";
import StaffRegister from "../components/StaffRegister";
import "../pageStyles/LoginRegisterStyle.css";
import restaurantImage from "../images/restaurant.jpg";

function RegisterPage(){

    const backgroundStyle = {
        backgroundImage: `url(${restaurantImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "94vh",
        width: "100%",
    };
    

    return (
        <div>
            <TopNavBar></TopNavBar>
            <div className='restMainDiv' style={backgroundStyle}>
                <div className='description' style={{backgroundColor: "#999999BC"}}>
                    <div className='descriptionContents'>
                        <h1 style={{alignSelf: 'center', margin: 5}}>Register</h1>
                        <StaffRegister></StaffRegister>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default RegisterPage;