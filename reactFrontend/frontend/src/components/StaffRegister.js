import React from "react";
import { getStaffRegisterUrl } from "../apiLinks/ApiEndpoints";
import { apiPostConnection } from "../reusableFunctions/apiConnection";
import "../pageStyles/LoginRegisterStyle.css";
import { encryptPassword } from "../reusableFunctions/passwordEncryption"; 
import { useNavigate } from "react-router-dom";
import { checkInputs, getRegisterHeadings, getHTMLHeadings } from "../reusableFunctions/registerValidation";


function StaffRegister(){
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

    async function processRegister(){
        const email = document.getElementById("emailInput").value;
        const name = document.getElementById("nameInput").value;
        const surname = document.getElementById("surnameInput").value;
        const dateOfBirth = document.getElementById("dobInput").value;
        let password = document.getElementById("passwordInput").value;
        let confirmPassword = document.getElementById("confirmPasswordInput").value;
        

        /*
        {
"name":"TestingAPI",
"surname":"smith",
"email":"testingapi@gmail.com",
"password":"Password123!",
"dateOfBirth":"2000-10-10"
}
*/

        const inputCheck = checkInputs(email, password, confirmPassword, name, surname, dateOfBirth);
        
        password = await encryptPassword(document.getElementById("passwordInput").value);
        confirmPassword = await encryptPassword(document.getElementById("confirmPasswordInput").value);

        if (inputCheck.length > 0) {
            //alert(inputCheck);
            changeHeadings(getRegisterHeadings(), inputCheck, getHTMLHeadings());
            console.log(changeHeadings);




        }
        else{
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
                alert("register succesfull, you may now log in");
                setTimeout(() => {
                    navigate("/staffLogin");
                }, 100);
            }
            else if (returnData[0] == "400") {
                alert(returnData[1]);
            }
            else{
                alert(returnData[1]);
            }
    
    
    
            console.log(email);
        }


    }






    return (
        <div className='loginContainer'>
            
            <label id="emailLabel" >email: </label>
            
            <input className='loginInputBox' type="text" id="emailInput"></input>
            <br/>
            <label id="nameLabel">name: </label>
            <br/>
            <input className='loginInputBox' type="text" id="nameInput"></input>
            <br/>
            <label id="surnameLabel">surname: </label>
            <br/>
            <input className='loginInputBox' type="text" id="surnameInput"></input>
            <br/>
            <label id="dateOfBirthLabel">Date of Birth: </label>
            <br/>
            <input  className='loginInputBox' type="Date" id="dobInput"></input>
            <br/>
            <label id="passwordLabel">Password: </label>
            <br/>
            <input className='loginInputBox' type="password" id="passwordInput"></input>
            <br/>
            <label id="confirmPasswordLabel">confirm password</label>
            <br/>
            <input className='loginInputBox' type="password" id="confirmPasswordInput"></input>
                
            
            <button className='loginButton' onClick={processRegister}>Register</button>

        </div>
    )
}

export default StaffRegister;