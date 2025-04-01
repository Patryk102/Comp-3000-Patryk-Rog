import React from "react";
import TopNavBar from "../components/TopNavBar";
import { apiAuthGetConnection, apiAuthPutConnection } from "../reusableFunctions/apiConnection";
import { getStaffAccountUrl } from "../apiLinks/ApiEndpoints";
import { useEffect, useState } from "react";
import { getEditUserAccountUrl } from "../apiLinks/ApiEndpoints";
import { getEditStaffAccountUrl } from "../apiLinks/ApiEndpoints";
import { encryptPassword } from "../reusableFunctions/passwordEncryption";
import { apiAuthDeleteConnection } from "../reusableFunctions/apiConnection";
import { getDeleteStaffUserUrl } from "../apiLinks/ApiEndpoints";
import { useNavigate } from "react-router-dom";
import "../pageStyles/RestaurantPage.css";
import "../pageStyles/LoginRegisterStyle.css";


function EditStaffProfilePage(){
    const navigate = useNavigate();
    async function loadData(){
        const token = localStorage.getItem("staffToken");
        const apiReturn = await apiAuthGetConnection(getStaffAccountUrl(), token);
        //alert(apiReturn[0]);
        //alert(apiReturn[1][0].name);


        if (apiReturn[0] == 200){
            setData(apiReturn[1][0].name, apiReturn[1][0].surname, apiReturn[1][0].email, (apiReturn[1][0].date_of_birth).substring(0,10));
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
        const password = await encryptPassword(document.getElementById("passwordInput").value);

        let postData = {};
        if (password != null && password != ""){
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

        const token = localStorage.getItem("staffToken");


        const putReturn = await apiAuthPutConnection(getEditStaffAccountUrl(), postData, token);
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
        const token = localStorage.getItem("staffToken");
        if (promptResult){
            const apiResult = await apiAuthDeleteConnection(getDeleteStaffUserUrl(), token);
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
                            <p>Edit staff profile page</p>
                            <div id="dataInputs">
                                
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
                                <input className='loginInputBox' id="passwordInput" type="password"></input>
                                

                            </div>
                        </div>
                        <button className="button-6" onClick={makeChanges}>Save</button>
                        <button className="button-6" onClick={loadData}>Cancel</button>
                        <br/>
                        <button className="button-6" onClick={deleteAccount}>Delete Account</button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default EditStaffProfilePage;