import React from "react";
import TopNavBar from "../components/TopNavBar";
import { getRestaurantRegisterUrl } from "../apiLinks/ApiEndpoints";
import { apiAuthPostConnection } from "../reusableFunctions/apiConnection";
import "../pageStyles/LoginRegisterStyle.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RestaurantRegisterPage(){

    const [selectedOption, setSelectedOption] = useState("");
    const navigate = useNavigate();

    async function register(){
        let rName = document.getElementById("restaurantNameInput").value;
        //let rType = document.getElementById("restaurantTypeInput").value;
        let rImage = document.getElementById("imageInput").value;
        let rDescription = document.getElementById("restaurantDescriptionInput").value;
        let rLocation = document.getElementById("restaurantLocationInput").value;


        if (rName == ""){
            alert("You must input the restaurant name");
            return;
        }
        if (selectedOption == ""){
            alert("You must select the restaurant type");
            return;
        }
        if (rImage == ""){
            alert("You must add an image for the restaurant");
            return;
        }
        if (rDescription == ""){
            alert("You must add a description");
            return;
        }
        if (rLocation == ""){
            alert("You must add a location");
            return;
        }





        let postData = {
            restaurant_name: rName,
            restaurant_description: rDescription,
            restaurant_type_id: selectedOption,
            restaurant_image: rImage,
            restaurant_location: rLocation
        }

        const token = localStorage.getItem("staffToken");
        const url = getRestaurantRegisterUrl();

        const returnData = await apiAuthPostConnection(url, postData, token);
        //alert(returnData[0], returnData[1]);
        if (returnData[0] == "200"){
            alert("Succesfully created restaurant");
            navigate("/staffDashboard");
        }
        else{
            alert("Sorry something went wrong when creating the restaurant, please try again later.");
        }


    }

    function handleChange(event){
        setSelectedOption(event.target.value);
        console.log(selectedOption);
    }


    return (
        <div>
            <TopNavBar></TopNavBar>
            <div className='restMainDiv'>
                <h1>Register your restaurant</h1>
                <div className='description'>
                    <div className='descriptionContents'>
                        <div className='loginContainer'>
                            <label id="topLabel">Restaurant name:</label>
                            <input className='loginInputBox' type="text" id="restaurantNameInput"></input>
                            <br/>
                            <label>Restaurant Type</label>
                            <br/>
                            <select className="loginInputBox id=" value={selectedOption} onChange={handleChange}>
                            <option value="" disabled>
                                Select restaurant type
                            </option>
                            <option value="1">fastfood</option>
                            <option value="2">sea food</option>
                            <option value="3">chinese</option>
                            <option value="4">pizza</option>
                            <option value="5">fish and chips</option>
                            </select>


                            <br/>
                            <label>Restaurant logo URL:</label>
                            <br/>
                            <input className='loginInputBox' type="text" id="imageInput"></input>
                            <br/>
                            <label>Restaurant description:</label>
                            <br/>
                            <input className='loginInputBox' type="text" id="restaurantDescriptionInput"></input>
                            <br/>
                            <label>Restaurant location:</label>
                            <br/>
                            <input className='loginInputBox' type="text" id="restaurantLocationInput"></input>
                            
                            <button className="loginButton" onClick={register}>Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
    )
}

export default RestaurantRegisterPage;