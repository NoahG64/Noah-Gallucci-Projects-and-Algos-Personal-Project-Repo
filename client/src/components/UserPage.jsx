import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const UserPage = () => {

    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState({})
    const [allGames, setAllGames] = useState([])

    /*If userId is not in session, send back to login & register*/
    const cookieChecker = () => {
        if (!Cookies.get(`userId`)) {
            navigate(`/`)
        }
    }

    useEffect(() => {
        cookieChecker()

        axios.get(`http://localhost:8080/api/user/${Cookies.get(`userId`)}`)
            .then(res => {
                setCurrentUser(res.data)
            })
            .catch(err => {
                console.log(err) /*Do something about the errors I am getting so they can be displayed on the page.*/
                alert("User could not be found!")
                navigate(`/home`)
            })

        axios.get(`http://localhost:8080/api/game`)
            .then(res => {
                setAllGames(res.data)
            })
            .catch(err => {
                console.log(err) /*Do something about the errors I am getting so they can be displayed on the page.*/
                alert("Games could not be found!")
                navigate(`/home`)
            })
    }, [])

    return (
        <div>
            {
                currentUser ?
                    <h1>{currentUser.userName}'s Page</h1> :
                    null
            }

            <h2>Posted Games</h2>

            {
                allGames?
                allGames.forEach(game => {
                    <p>{game.title}</p>
                }) :
                <p>Nothing!</p>
            }
        </div>
    );
}

export default UserPage;
