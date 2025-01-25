import React, { useEffect, useState } from "react";
import TopNavBar from "../components/TopNavBar";
import RestaurantCard from "../components/RestaurantCard";
import "../pageStyles/UserDashboard.css";
import { getAllRestaurantsUrl } from "../apiLinks/ApiEndpoints";
import { apiGetConnection } from "../reusableFunctions/apiConnection";

function UserDashboard(){

    const [restaurantComponents, setRestaurantComponents] = useState([])

    useEffect(() => {
        async function getData(){
            const response = await apiGetConnection(getAllRestaurantsUrl());
            return response[1];
        }

        async function fetchData(){
            const data = await getData();
            setRestaurantComponents(data);
            //console.log("printing components");
            //console.log(restaurantComponents);
        } 


        
        fetchData();
    }, []);

    useEffect(() => {
        console.log("printing components");
        console.log(restaurantComponents);
        
    }, [restaurantComponents]);













    return (
        <div>
            <TopNavBar></TopNavBar>
            <p>Dashboard</p>
            <section className="cardContainer">

                {restaurantComponents.map((data, index) => (
                    <RestaurantCard key={index} restaurantName={data.restaurant_name} imageSrc={data.restaurant_image} />
                ))}



               
                
            </section>

        </div>
    )
}

export default UserDashboard;