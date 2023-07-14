import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Home = () => {

    const navigate = useNavigate()

    const [allGames, setAllGames] = useState([])

    /*If userId is not in session, send back to login & register*/
    const cookieChecker = () => {
        if (!Cookies.get(`userId`)) {
            navigate(`/`)
        }
    }

    useEffect(() => {
        cookieChecker()

        axios.get(`http://localhost:8080/api/game`)
            .then(res => {
                setAllGames(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div>
            <h2>Home page</h2>
            {
                allGames.map(game => (
                    <p key={game.id}>Title: {game.title}</p>
                ))
            }
        </div>
    );
}

export default Home;
