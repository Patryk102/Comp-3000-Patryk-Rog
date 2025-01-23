import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {getUserLoginUrl, getStaffLoginUrl} from '../apiLinks/ApiEndpoints';
import { apiPostConnection } from '../reusableFunctions/apiConnection';

function Login(){

    const navigate = useNavigate();
    const pageLocation = useLocation();

    async function processLogin(){
        console.log("processing login");
        var url = getUserLoginUrl();
    
        let email = document.getElementById("emailInput").value;
        let password = document.getElementById("passwordInput").value;
    
        let postJson = {"email":email, "password":password};
        



        var tokenName = "userToken";
        var dashboardNavigate = "/userDashboard";
        if (pageLocation.pathname == "/stafflogin"){
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