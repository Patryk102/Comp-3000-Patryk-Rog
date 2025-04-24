import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {getUserLoginUrl, getStaffLoginUrl} from '../apiLinks/ApiEndpoints';
import { apiPostConnection } from '../reusableFunctions/apiConnection';
import "../pageStyles/LoginRegisterStyle.css";
import { encryptPassword } from '../reusableFunctions/passwordEncryption';

function Login(){

    const navigate = useNavigate();
    const pageLocation = useLocation();

    async function processLogin(){
        console.log("processing login");
        var url = getUserLoginUrl();

    
        let email = document.getElementById("emailInput").value;
        let password = await encryptPassword(document.getElementById("passwordInput").value);
        //alert(password);
        //alert("encrypted password: " + await encryptPassword(password));
    
        let postJson = {"email":email, "password":password};
        



        var tokenName = "userToken";
        var dashboardNavigate = "/userDashboard";
        if (pageLocation.pathname == "/staffLogin"){
            tokenName = "staffToken";
            localStorage.removeItem('userToken');
            dashboardNavigate = "/staffDashboard";
            url = getStaffLoginUrl();
        }

        let output = await apiPostConnection(url, postJson);
        console.log(pageLocation.pathname);




        if (output[0] == 200) {
            let jsonOutput = JSON.parse(output[1]);
            localStorage.setItem(tokenName, jsonOutput.token);
            navigate(dashboardNavigate);
        }
        else{
            alert("incorrect email or password");
        }


        //alert(output);

       // alert(output[1].token);
    };




    return (
        <div className='loginContainer'>
            
            <form>
                
                <label id='topLabel'>Email:</label>
                
                <input className='loginInputBox' id="emailInput"></input>
                
                <label>Password:</label>
                <br/>
                <input className='loginInputBox' type="password" id="passwordInput"></input>
                
                


            </form>
            <button className="loginButton" onClick={processLogin}>Login</button>




        </div>
    );


}





export default Login;