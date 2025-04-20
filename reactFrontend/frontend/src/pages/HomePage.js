import React from "react";
import TopNavBar from "../components/TopNavBar";
import { Link, useNavigate } from "react-router-dom";
import "../pageStyles/RestaurantDashboard.css";
import restaurantImage from "../images/restaurant.jpg";

function HomePage(){

    const backgroundImage = {
        
    }

    const backgroundStyle = {
        backgroundImage: `url(${restaurantImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "94vh",
        width: "100%",
       
    };


    return (
        <div style={backgroundStyle}>
            <TopNavBar></TopNavBar>
            <div className="restMainDiv" style={backgroundStyle}>
                
                <div className="description" style={{maxWidth: 1000, marginTop: 20, backgroundColor: "#999999BC"}}>
                    <div className="descriptionContents">
                        
                        <div style={{alignContent: "center", alignItems: "center", alignSelf: "center", textAlign:"center"}} id="newUser" hidden={false}>
                            <h1>WElCOME</h1>
                        
                            <h2>Are you looking for a restaurant to dine at?</h2>
                            <Link to="/userLogin"><button style={{width: 200}} className="registerRestButton">Login</button></Link>
                            <h3>Dont have an account?</h3>
                            <Link to="/userRegister"><button style={{width: 200}} className="registerRestButton">Register</button></Link>
                            
                        </div>
                        <div id="restaurantPicker" hidden={true}>
                            
                            <Link to="/restaurantregister"><button className="registerRestButton">Register restaurant</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default HomePage;