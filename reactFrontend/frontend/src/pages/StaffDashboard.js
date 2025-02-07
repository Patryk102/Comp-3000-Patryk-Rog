import React from "react";
import TopNavBar from "../components/TopNavBar";
import { Link } from "react-router-dom";

function StaffDashboard(){

    







    return (
        <div>
            <TopNavBar></TopNavBar>
            <p>Staff Dashboard</p>
            <h2>WElCOME NAME SURNAME</h2>
           
            <h2>ARE YOU A RESTURANT OWNER</h2>
        
            <h2>CLICK BELOW TO REGISTER YOUR RESTAURANT</h2>
       
            <Link to="/restaurantregister"><button>Register restaurant</button></Link>
        </div>
    )
}

export default StaffDashboard;