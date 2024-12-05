import React from 'react';

function Login(){

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

function processLogin(){
    console.log("Log in is processing");


}



export default Login;