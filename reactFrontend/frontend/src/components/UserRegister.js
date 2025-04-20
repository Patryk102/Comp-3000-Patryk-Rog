import React from "react";
import { apiPostConnection } from "../reusableFunctions/apiConnection";
import { getUserRegisterUrl } from "../apiLinks/ApiEndpoints";
import { Link, useNavigate } from 'react-router-dom';
import "../pageStyles/LoginRegisterStyle.css";
//name, surname, email, dateOfBirth, password, 
import { encryptPassword } from "../reusableFunctions/passwordEncryption";
import { checkInputs, getRegisterHeadings, getHTMLHeadings } from "../reusableFunctions/registerValidation";



function UserRegister(){

    const navigate = useNavigate();

    function changeHeadings(headings, issues, htmlheadings){
        let issuesCount = 0;
    
        for (let i = 0; i < headings.length; i++){
            if (issues[issuesCount][0] == i){
                document.getElementById(htmlheadings[i]).innerHTML = headings[i] + " " + issues[issuesCount][1];
                if (issuesCount < issues.length - 1){
                    issuesCount++;
                }
            }
            else{
                document.getElementById(htmlheadings[i]).innerHTML = headings[i]
            } 
        }
        return "nothing";
    
    }

    async function processInputs(){
        let email = document.getElementById("emailInput").value;
        let password = document.getElementById("passwordInput").value;
        let confirmPassword = document.getElementById("confirmPasswordInput").value;
        let name = document.getElementById("nameInput").value;
        let surname = document.getElementById("surnameInput").value;
        let dateOfBirth = document.getElementById("dateOfBirthInput").value;

        const inputCheck = checkInputs(email, password, confirmPassword, name, surname, dateOfBirth);

        password = await encryptPassword(document.getElementById("passwordInput").value);
        confirmPassword = await encryptPassword(document.getElementById("confirmPasswordInput").value);

        if (inputCheck.length > 0) {
            //alert(inputCheck);
            changeHeadings(getRegisterHeadings(), inputCheck, getHTMLHeadings());
            console.log(changeHeadings);




        }
        else{
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

    
    }

    return(
        <div className='loginContainer'>
            <form>
                <label id="emailLabel">email</label>
                
                <input className='loginInputBox' type="text" id="emailInput"></input>
                <br/>
                
                <label id="passwordLabel">password</label>
                <br/>
                <input className='loginInputBox' type="text" id="passwordInput"></input>
                <br/>
                <label id="confirmPasswordLabel">confirm password</label>
                <br/>
                <input className='loginInputBox' type="text" id="confirmPasswordInput"></input>
                <br/>
                <label id="nameLabel">name</label>
                <br/>
                <input className='loginInputBox' type="text" id="nameInput"></input>
              
                <br/>
                <label id="surnameLabel">surname</label>
                <br/>
                <input className='loginInputBox' type="text" id="surnameInput"></input>
               
                <br/>
                <label id="dateOfBirthLabel">Date of birth</label>
                <br/>
                <input className='loginInputBox' type="date" id="dateOfBirthInput"></input>

            </form>
            
            <button className="loginButton" onClick={processInputs}>Register</button>

        </div>

    )
}





export default UserRegister;