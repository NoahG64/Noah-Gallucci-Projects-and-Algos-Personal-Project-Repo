import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Home = () => {

    const navigate = useNavigate()
    
    /*If userId is not in session, send back to login & register*/
    const cookieChecker = () => {
        if(!Cookies.get(`userId`)){
            console.log("Go log in!")
            navigate(`/`)
        }
        else{
            console.log("Cookie found!")
        }
    }
    
    useEffect(() => {
        cookieChecker()
    }, [])

    return (
        <div>
            <h2>Home page</h2>
        </div>
    );
}

export default Home;
