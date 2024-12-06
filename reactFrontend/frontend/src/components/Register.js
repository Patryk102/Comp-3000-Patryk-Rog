import React from "react";


//email, password, account type (owner, staff), name, surname, restaurant_id
//restaurant_name, total_tables, max_table_size, restaurant_description, restaurant_type, image(optional but later mandatory)

function Register(){

    return(
        <div>
            <p>Register restaurant</p>
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
                <label>restaurant name</label>
                <input type="text" id="restaurantNameInput"></input>
                <br/>
                <br/>
                <label>Total tables</label>
                <input type="number" id="totalTablesInput"></input>
                <br/>
                <br/>
                <label>Maximum Table size</label>
                <input type="number" id="maxTableSizeInput"></input>
                <br/>
                <br/>
                <label>Restaurant description</label>
                <input type="text" id="descriptionInput"></input>
                <br/>
                <br/>
                <label>image upload TO FINISH</label>

            </form>
            <br/>
            <button onClick={processInputs}>Submit</button>

        </div>

    )
}

function processInputs(){
    let email = document.getElementById("emailInput").value;
    let password = document.getElementById("passwordInput").value;
    let name = document.getElementById("nameInput").value;
    let surname = document.getElementById("surnameInput").value;
    let restaurantName = document.getElementById("restaurantNameInput").value;
    let totalTables = document.getElementById("totalTablesInput").value;
    let maxTableSize = document.getElementById("maxTableSizeInput").value;
    let restaurantDescription = document.getElementById("descriptionInput").value;

    console.log(email + password + name + surname + restaurantName + totalTables + maxTableSize + restaurantDescription);




}



export default Register;