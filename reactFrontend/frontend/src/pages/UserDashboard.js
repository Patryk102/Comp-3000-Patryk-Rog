import React from "react";
import TopNavBar from "../components/TopNavBar";
import RestaurantCard from "../components/RestaurantCard";
import "../pageStyles/UserDashboard.css";

function UserDashboard(){
    return (
        <div>
            <TopNavBar></TopNavBar>
            <p>Dashboard</p>
            <section className="cardContainer">
                <RestaurantCard/>
                <RestaurantCard/>
                <RestaurantCard/>
                <RestaurantCard/>
                <RestaurantCard/>
                <RestaurantCard/>
                <RestaurantCard/>
                <RestaurantCard/>
                <RestaurantCard/>
                <RestaurantCard/>
                <RestaurantCard/>
                <RestaurantCard/>
                <RestaurantCard/>
                <RestaurantCard/>
                <RestaurantCard/>
                <RestaurantCard/>
                <RestaurantCard/>
                <RestaurantCard/>
                <RestaurantCard/>
                <RestaurantCard/>
                <RestaurantCard/>
                <RestaurantCard/>
            </section>

        </div>
    )
}

export default UserDashboard;