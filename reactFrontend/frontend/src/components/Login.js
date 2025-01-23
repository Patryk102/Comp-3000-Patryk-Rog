import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {getUserLoginUrl} from '../apiLinks/ApiEndpoints';
import { apiPostConnection } from '../reusableFunctions/apiConnection';

function Login(){

    const handleLogin = () => {
        //navigate = useNavigate();
        console.log(getStaffLoginUrl());
        //processLogin(navigate);
    }

    const navigate = useNavigate();

    async function processLogin(){
        console.log("processing login");
        var url = getUserLoginUrl();
    
        let email = document.getElementById("emailInput").value;
        let password = document.getElementById("passwordInput").value;
    
        let postJson = {"email":email, "password":password};
        
        let output = await apiPostConnection(url, postJson);
        
        if (output[0] == 200) {
            let jsonOutput = JSON.parse(output[1]);
            alert(jsonOutput.token);
            localStorage.setItem("userToken", jsonOutput.token);
            navigate("/userDashboard");
        }
        else{
            alert("incorrect email or password");
        }


        alert(output);

       // alert(output[1].token);
    };




    return (
        <div>
            <label>Login</label>
            <br/>
            <br/>
            <form>
                

                <label>Email</label>
                <input id="emailInput"></input>
                <br/>
                <br/>
                <label>Password</label>
                <input id="passwordInput"></input>
                <br/>
                <br/>
                


            </form>
            <button onClick={processLogin}>Login</button>




        </div>
    );


}





export default Login;