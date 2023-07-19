import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

const GameDetails = () => {

    const navigate = useNavigate()

    const { gameId } = useParams()
    const [currentGame, setCurrentGame] = useState({})

    /*If userId is not in session, send back to login & register*/
    const cookieChecker = () => {
        if (!Cookies.get(`userId`)) {
            navigate(`/`)
        }
    }

    useEffect(() => {
        cookieChecker()

        axios.get(`http://localhost:8080/api/game/${gameId}`)
            .then(res => {
                setCurrentGame(res.data)
            })
            .catch(err => {
                console.log(err) /*Do something about the errors I am getting so they can be displayed on the page.*/
                alert("Game could not be found!")
                navigate(`/home`)
            })
    }, [])

    return (
        <div className='d-flex flex-column justify-content-center m-3 p-3 gap-5'>
            <h2>{currentGame.title}</h2>
            <p>Genre: {currentGame.genre}</p>
            <p>Release Date: {currentGame.releaseDate}</p>
            <p>Metacritic Score: {currentGame.metacriticScore}</p>
            <p>Description: {currentGame.description}</p>

            {
                currentGame.storeLink ?
                    <Link to={`${currentGame.storeLink}`}>Store Link</Link> :
                    null
            }

            {
                currentGame?.poster?.id == Cookies?.get(`userId`) ?
                    <div className='d-flex flex-column justify-content-center m-3 p-3 gap-5'>
                        <h3>Poster Actions</h3>
                        <Link to={`/editGame/${currentGame.id}`}>Edit Game</Link>
                        <Link to={`/deleteGame/${currentGame.id}`}>Delete Game</Link>
                    </div> :
                    null
            }
        </div>
    );
}

export default GameDetails;
