import React from "react";
import TopNavBar from "../components/TopNavBar";
import { apiAuthGetConnection } from "../reusableFunctions/apiConnection";
import { getUserAccountUrl } from "../apiLinks/ApiEndpoints";
import { useEffect, useState } from "react";

function EditUserProfilePage(){




    async function loadData(){
        const token = localStorage.getItem("userToken");
        const apiReturn = await apiAuthGetConnection(getUserAccountUrl(), token);
        //alert(apiReturn[0]);
        //alert(apiReturn[1][0].name);


        if (apiReturn[0] == 200){
            setData(apiReturn[1][0].name, apiReturn[1][0].surname, apiReturn[1][0].email, (apiReturn[1][0].dateOfBirth).substring(0,10));
        }
        else{
            alert("Couldnt get your profile data, please try again later");
        }
        


    }

    function setData(name, surname, email, dateOfBirth){
        document.getElementById("nameInput").value = name;
        document.getElementById("surnameInput").value = surname;
        document.getElementById("emailInput").value = email;
        document.getElementById("dobInput").value = dateOfBirth;
    }





    useEffect(() => {
        //setTables();
        loadData();
    }, []);






    return (
        <div>
            <TopNavBar/>
            <p>Edit user profile page</p>
            <div id="dataInputs">
                <label>Name:</label>
                <input id="nameInput"></input>
                <br/>
                <label>Surname:</label>
                <input id="surnameInput"></input>
                <br/>
                <label>Email:</label>
                <input id="emailInput"></input>
                <br/>
                <label>Date of birth:</label>
                <input type="date" id="dobInput"></input>
                <br/>
                <label>Password:</label>
                <input id="passwordInput"></input>


            </div>
            <button>Save</button>
            <button>Cancel</button>
            <br/>
            <button>Delete Account</button>


        </div>
    )

}

export default EditUserProfilePage