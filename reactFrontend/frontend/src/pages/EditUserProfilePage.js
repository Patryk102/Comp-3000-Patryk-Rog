import React from "react";
import TopNavBar from "../components/TopNavBar";
import { apiAuthGetConnection, apiAuthPutConnection } from "../reusableFunctions/apiConnection";
import { getUserAccountUrl } from "../apiLinks/ApiEndpoints";
import { useEffect, useState } from "react";
import { getEditUserAccountUrl } from "../apiLinks/ApiEndpoints";
import "../pageStyles/RestaurantPage.css";
import "../pageStyles/LoginRegisterStyle.css";
import { encryptPassword } from "../reusableFunctions/passwordEncryption";
import { apiAuthDeleteConnection } from "../reusableFunctions/apiConnection";
import { getDeleteUserUrl } from "../apiLinks/ApiEndpoints";
import { useNavigate } from "react-router-dom";

function EditUserProfilePage(){
    const navigate = useNavigate();

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

    async function makeChanges(){
        const name = document.getElementById("nameInput").value;
        const surname = document.getElementById("surnameInput").value;
        const email = document.getElementById("emailInput").value;
        const dob = document.getElementById("dobInput").value;
        let password = document.getElementById("passwordInput").value;

        let postData = {};
        if (password != null && password != ""){
            password = await encryptPassword(document.getElementById("passwordInput").value);
            postData = {
                name: name,
                surname: surname,
                email: email,
                dateOfBirth: dob,
                password: password
            }
        }
        else{
            postData = {
                name: name,
                surname: surname,
                email: email,
                dateOfBirth: dob
            }
        }

        const token = localStorage.getItem("userToken");


        const putReturn = await apiAuthPutConnection(getEditUserAccountUrl(), postData, token);
        if (putReturn[0] == "200"){
            alert("Changes made succesfully");
        }
        else{
            alert("Something failed, please try again later");
        }

    }

    useEffect(() => {
        //setTables();
        loadData();
    }, []);

    async function deleteAccount(){
        const promptResult = window.confirm("Are you sure you want to delete your account?");
        const token = localStorage.getItem("userToken");
        if (promptResult){
            const apiResult = await apiAuthDeleteConnection(getDeleteUserUrl(), token);
            if (apiResult[0] == "200"){
                alert("Account succesfully deleted");
                setTimeout(() => {
                    navigate("/");
                }, 100);
            }
            else{
                alert("Sorry something went wrong, please try again later");
            }


        }
    }




    return (
        <div>
            <TopNavBar/>
            <div className="restMainDiv">
                <h1>Edit profile</h1>
                <div className="description">

                    <div className="descriptionContents">
                        <div className='loginContainer'>
                            <br></br>
                            <label>Name:</label>
                            <input className='loginInputBox' id="nameInput"></input>
                            <br/>
                            <label>Surname:</label>
                            <input className='loginInputBox' id="surnameInput"></input>
                            <br/>
                            <label>Email:</label>
                            <input className='loginInputBox' id="emailInput"></input>
                            <br/>
                            <label>Date of birth:</label>
                            <input className='loginInputBox' type="date" id="dobInput"></input>
                            <br/>
                            <label>Password:</label>
                            <input className='loginInputBox' type="password" id="passwordInput"></input>
                        </div>


                    </div>
                    <button className="button-6" onClick={makeChanges}>Save</button>
                    <button className="button-6" onClick={loadData}>Cancel</button>
                    <br/>
                    <button onClick={deleteAccount} className="button-6" >Delete Account</button>
                    <br/>
                </div>
            </div>


        </div>
    )

}

export default EditUserProfilePage