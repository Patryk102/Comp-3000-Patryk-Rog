import React from "react";
import TopNavBar from "../components/TopNavBar";


function RestaurantRegisterPage(){



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
            </div>
            <button>Register</button>






        </div>
    )
}

export default RestaurantRegisterPage;