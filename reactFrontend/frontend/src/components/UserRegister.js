import React from "react";
import { apiPostConnection } from "../reusableFunctions/apiConnection";
import { getUserRegisterUrl } from "../apiLinks/ApiEndpoints";
import { Link, useNavigate } from 'react-router-dom';
//name, surname, email, dateOfBirth, password, 



function UserRegister(){

    const navigate = useNavigate();


    async function processInputs(){
        let email = document.getElementById("emailInput").value;
        let password = document.getElementById("passwordInput").value;
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
        <div>
            <form>
                <label>email</label>
                <input type="text" id="emailInput"></input>
                <br/>
                <br/>
                <label>password</label>
                <input type="text" id="passwordInput"></input>
                <br/>
                <br/>
                <label>name</label>
                <input type="text" id="nameInput"></input>
                <br/>
                <br/>
                <label>surname</label>
                <input type="text" id="surnameInput"></input>
                <br/>
                <br/>
                <label>Date of birth</label>
                <input type="text" id="dateOfBirthInput"></input>

            </form>
            <br/>
            <button onClick={processInputs}>Submit</button>

        </div>

    )
}





export default UserRegister;