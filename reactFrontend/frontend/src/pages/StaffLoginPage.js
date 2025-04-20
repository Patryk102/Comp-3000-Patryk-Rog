import React from 'react';
import Login from '../components/Login';
import TopNavBar from '../components/TopNavBar';
import "../pageStyles/LoginRegisterStyle.css";
import restaurantImage from "../images/restaurant.jpg";

function StaffLoginPage(){

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
                        <h1 style={{alignSelf: 'center', margin: 5}}>Staff Login</h1>

                        <Login></Login>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default StaffLoginPage