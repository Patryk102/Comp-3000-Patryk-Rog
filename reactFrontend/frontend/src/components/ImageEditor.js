import React from "react";
import { apiGetConnection } from "../reusableFunctions/apiConnection";
import { getRestaurantUrl } from "../apiLinks/ApiEndpoints";
import { useParams } from "react-router-dom";
import "../pageStyles/LoginRegisterStyle.css";
import { apiAuthPutConnection } from "../reusableFunctions/apiConnection";
import { useEffect } from "react";
import { getEditImageUrl } from "../apiLinks/ApiEndpoints";

function ImageEditor(){
    const { id } = useParams();

    async function saveImage(){
        const token = localStorage.getItem("staffToken");
        const image = document.getElementById("image").value;

        const sendData = {
            image:image,
            restaurant_id: id
        };
        const returnData = await apiAuthPutConnection(getEditImageUrl(), sendData, token);
        if (returnData[0] == "200"){
            alert("Image changed succesfully");
        }
        else{
            alert("Sorry something went wrong");
        }
    }

    async function fetchData(){
        const response = await apiGetConnection(getRestaurantUrl(id));
        let text = "";
        if (response[0] != "200"){
            text = "something went wrong";
        }
        else{
            text = response[1].restaurant_image;
        }
        document.getElementById("image").value = text;


    }

    useEffect(() => { 
        fetchData();
        
    }, []);


    return (
        <div>
            <label>Edit restaurant logo url:</label>
            <textarea id="image" className='descriptionInput'></textarea>
            <button onClick={saveImage} className="loginButton">save</button>
            <button onClick={fetchData} className="loginButton">cancel</button>
        </div>
    )
}

export default ImageEditor;