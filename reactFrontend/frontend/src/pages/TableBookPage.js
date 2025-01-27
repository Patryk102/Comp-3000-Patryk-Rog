import React from "react";
import { useParams } from 'react-router-dom';
import TopNavBar from "../components/TopNavBar";
import { apiGetConnection } from "../reusableFunctions/apiConnection";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import DatePicker from "../components/DatePicker";

function TableBookPage(){
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <div>
            <TopNavBar/>
            <p>TABLE BOOK PAGE</p>
            <div>
                <DatePicker/>
            </div>
        </div>
    )
}

export default TableBookPage;
