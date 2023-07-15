import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
            <h2>All Games</h2>

            <div className='d-flex justify-content-center m-3 p-3 gap-5'>
                {
                    allGames.map(game => (
                        <span key={game.id}><Link to={`/gameDetails/${game.id}`}>{game.title}</Link></span>
                    ))
                }
            </div>
        </div>
    );
}

export default Home;
