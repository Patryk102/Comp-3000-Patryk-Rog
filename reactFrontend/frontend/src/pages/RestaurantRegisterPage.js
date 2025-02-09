import React from "react";
import TopNavBar from "../components/TopNavBar";
import { getRestaurantRegisterUrl } from "../apiLinks/ApiEndpoints";
import { apiAuthPostConnection } from "../reusableFunctions/apiConnection";

function RestaurantRegisterPage(){

    async function register(){
        let rName = document.getElementById("restaurantNameInput").value;
        let rType = document.getElementById("restaurantTypeInput").value;
        let rImage = document.getElementById("imageInput").value;
        let rDescription = document.getElementById("restaurantDescriptionInput").value;
        let rLocation = document.getElementById("restaurantLocationInput").value;

        let postData = {
            restaurant_name: rName,
            restaurant_description: rDescription,
            restaurant_type_id: rType,
            restaurant_image: rImage,
            restaurant_location: rLocation
        }

        const token = localStorage.getItem("staffToken");
        const url = getRestaurantRegisterUrl();

        const returnData = await apiAuthPostConnection(url, postData, token);
        alert(returnData[0], returnData[1]);


    }



    return (
        <div>
            <TopNavBar></TopNavBar>
            <p>Restaurant Register page</p>

            <div>
                <label>Restaurant name:</label>
                <input type="text" id="restaurantNameInput"></input>
                <br/>
                <label>Restaurant Type</label>
                <input type="text" id="restaurantTypeInput"></input>
                <br/>
                <label>Please upload image:</label>
                <input type="text" id="imageInput"></input>
                <br/>
                <label>Restaurant description:</label>
                <input type="text" id="restaurantDescriptionInput"></input>
                <br/>
                <label>Restaurant location:</label>
                <input type="text" id="restaurantLocationInput"></input>
            </div>
            <button onClick={register}>Register</button>






        </div>
    )
}

export default RestaurantRegisterPage;