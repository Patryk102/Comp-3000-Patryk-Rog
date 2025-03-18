import React from "react";
import { getStaffRegisterUrl } from "../apiLinks/ApiEndpoints";
import { apiPostConnection } from "../reusableFunctions/apiConnection";
import "../pageStyles/LoginRegisterStyle.css";


function StaffRegister(){

    async function processRegister(){
        const email = document.getElementById("emailInput").value;
        const name = document.getElementById("nameInput").value;
        const surname = document.getElementById("surnameInput").value;
        const dateOfBirth = document.getElementById("dobInput").value;
        const password = document.getElementById("passwordInput").value;

        /*
        {
"name":"TestingAPI",
"surname":"smith",
"email":"testingapi@gmail.com",
"password":"Password123!",
"dateOfBirth":"2000-10-10"
}
*/

        const postData = {
            name: name,
            surname: surname,
            email: email,
            dateOfBirth: dateOfBirth,
            password, password
        }

        const url = getStaffRegisterUrl();
        const returnData = await apiPostConnection(url, postData)
        
        if (returnData[0] == 200){
            alert("register succesfull");
        }
        else{
            alert(returnData[1]);
        }



        console.log(email);
    }






    return (
        <div className='loginContainer'>
            
            <label id="topLabel" >email: </label>
            
            <input className='loginInputBox' type="text" id="emailInput"></input>
            <br/>
            <label>name: </label>
            <br/>
            <input className='loginInputBox' type="text" id="nameInput"></input>
            <br/>
            <label>surname: </label>
            <br/>
            <input className='loginInputBox' type="text" id="surnameInput"></input>
            <br/>
            <label>Date of Birth: </label>
            <br/>
            <input  className='loginInputBox' type="Date" id="dobInput"></input>
            <br/>
            <label>Password: </label>
            <br/>
            <input className='loginInputBox' type="text" id="passwordInput"></input>
            
            <button className='loginButton' onClick={processRegister}>Register</button>

        </div>
    )
}

export default StaffRegister;