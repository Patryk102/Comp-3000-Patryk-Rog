import React from "react";
import { apiPostConnection } from "../reusableFunctions/apiConnection";
import { getUserRegisterUrl } from "../apiLinks/ApiEndpoints";
import { Link, useNavigate } from 'react-router-dom';
import "../pageStyles/LoginRegisterStyle.css";
//name, surname, email, dateOfBirth, password, 
import { encryptPassword } from "../reusableFunctions/passwordEncryption";



function UserRegister(){

    const navigate = useNavigate();


    async function processInputs(){
        let email = document.getElementById("emailInput").value;
        let password = await encryptPassword(document.getElementById("passwordInput").value);
        let name = document.getElementById("nameInput").value;
        let surname = document.getElementById("surnameInput").value;
        let dateOfBirth = document.getElementById("dateOfBirthInput").value;
    
        console.log(email + password + name + surname + dateOfBirth);
    
        let postJson = {
            "email": email, 
            "password": password,
            "name": name, 
            "surname": surname, 
            "dateOfBirth": dateOfBirth
        };
    
        let postReturn = await apiPostConnection(getUserRegisterUrl(), postJson);
        //alert(postReturn);
    
        if (postReturn[0] == "200") {
            alert("Register succesfull, you may now login");
            setTimeout(() => {
                navigate("/userLogin");
            }, 100);
        }
        else{
            alert("Error with inputs");
        }
    
    }

    return(
        <div className='loginContainer'>
            <form>
                <label id="topLabel">email</label>
                
                <input className='loginInputBox' type="text" id="emailInput"></input>
                <br/>
                
                <label>password</label>
                <br/>
                <input className='loginInputBox' type="text" id="passwordInput"></input>
               
                <br/>
                <label>name</label>
                <br/>
                <input className='loginInputBox' type="text" id="nameInput"></input>
              
                <br/>
                <label>surname</label>
                <br/>
                <input className='loginInputBox' type="text" id="surnameInput"></input>
               
                <br/>
                <label>Date of birth</label>
                <br/>
                <input className='loginInputBox' type="text" id="dateOfBirthInput"></input>

            </form>
            
            <button className="loginButton" onClick={processInputs}>Submit</button>

        </div>

    )
}





export default UserRegister;