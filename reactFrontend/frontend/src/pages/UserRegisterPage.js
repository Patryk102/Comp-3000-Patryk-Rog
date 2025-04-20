import React from "react";
//import staffLogin from "../apiLinks/ApiEndpoints";

import TopNavBar from "../components/TopNavBar";
import UserRegister from "../components/UserRegister";
import "../pageStyles/LoginRegisterStyle.css";
import restaurantImage from "../images/restaurant.jpg";

function UserRegisterPage(){

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
                        <UserRegister></UserRegister>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default UserRegisterPage;