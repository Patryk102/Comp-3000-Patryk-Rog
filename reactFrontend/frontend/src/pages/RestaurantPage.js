import React from "react";
import { useParams } from 'react-router-dom';
import TopNavBar from "../components/TopNavBar";
import { apiGetConnection } from "../reusableFunctions/apiConnection";
import { getRestaurantUrl } from "../apiLinks/ApiEndpoints";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import { getOpeningTimesUrl } from "../apiLinks/ApiEndpoints";
import "../pageStyles/RestaurantPage.css";


function RestaurantPage(){
    const { id } = useParams();
    const navigate = useNavigate();
    const [restaurantComponents, setRestaurantComponents] = useState([]);
    const [showingOpenTimes, setShowingOpenTimes] = useState([]);

    useEffect(() => {
        async function getData(){
            const response = await apiGetConnection(getRestaurantUrl(id));
            return response[1];
        }

        async function fetchData(){
            const data = await getData();
            setRestaurantComponents(data);
        } 


        
        fetchData();
        initOpeningTimesApi();
    }, []);

    useEffect(() => {
        console.log("printing components");
        console.log(restaurantComponents);
        
    }, [restaurantComponents]);

    const bookTablePressed = () => {
        navigate("/tableBook/" + id);
    }


    async function initOpeningTimesApi(){
        console.log("to be finished");
        
        const apiReturn = await apiGetConnection(getOpeningTimesUrl(id));
        console.log(apiReturn);
        //alert(apiReturn[1]);
        setShowingOpenTimes(apiReturn[1]);



    }
    
      
    return (
        <div>
            <TopNavBar/>
            <div className="restMainDiv">
               
                <h2>{restaurantComponents.restaurant_name}</h2>
                <div className="description">
                    <div className="descriptionContents">
                        <h3 style={{ marginBottom: "0" }}>Description:</h3>
                        <label id="descriptionPage">{restaurantComponents.restaurant_description}</label>
                        <br/>
                        <button className="button-6" onClick={bookTablePressed}>Book Table</button>
                        <br/>
                    
                        
                        <h3 style={{ marginBottom: "0" }}>Opening Times</h3>
                        {showingOpenTimes.map((day, index) => (
                            <div key={index}>
                                
                                <strong><label>{day.day_of_week + ":"}</label></strong>
                                <br/>
                                {day.open == "True" ? 
                                <div>
                                    <label>Opening time: {(day.opening_time).slice(0,5)}</label>
                                    <br/>
                                    <label>Closing time: {(day.closing_time).slice(0,5)}</label>
                                </div> : 

                                <div>
                                    <label>Closed</label>
                                    
                                    
                                </div>}
                            </div>

                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default RestaurantPage;