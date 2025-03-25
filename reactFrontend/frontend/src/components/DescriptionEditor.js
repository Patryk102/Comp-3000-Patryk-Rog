import React, { useEffect, useState } from "react";
import { apiGetConnection } from "../reusableFunctions/apiConnection";
import { getRestaurantUrl } from "../apiLinks/ApiEndpoints";
import { useParams } from "react-router-dom";
import "../pageStyles/LoginRegisterStyle.css";
import { apiAuthPutConnection } from "../reusableFunctions/apiConnection";
import { getEditDescriptionUrl } from "../apiLinks/ApiEndpoints";


function DescriptionEditor(){
    const { id } = useParams();

    async function getData(){
        const response = await apiGetConnection(getRestaurantUrl(id));
        if (response != "200"){
            return "something went wrong";
        }
        return response[1];
    }

    async function fetchData(){
        const response = await apiGetConnection(getRestaurantUrl(id));
        let text = "";
        if (response[0] != "200"){
            text = "something went wrong";
        }
        else{
            text = response[1].restaurant_description;
        }
        document.getElementById("description").value = text;
    } 

    useEffect(() => { 
        fetchData();
        
    }, []);

    async function saveDescription(){
        const token = localStorage.getItem("staffToken");
        const description = document.getElementById("description").value;

        const sendData = {
            description:description,
            restaurant_id: id
        };
        const returnData = await apiAuthPutConnection(getEditDescriptionUrl(), sendData, token);
        if (returnData[0] == "200"){
            alert("Description changed succesfully");
        }
        else{
            alert("Sorry something went wrong");
        }
    }


    return (
        <div>
            <p>Description editor component</p>
            <textarea id="description" className='descriptionInput'></textarea>
            <button onClick={saveDescription} className="loginButton">save</button>
            <button onClick={fetchData} className="loginButton">cancel</button>

        </div>
    )
}

export default DescriptionEditor;