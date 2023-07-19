import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const DeleteGame = () => {

    const {gameId} = useParams()

    const navigate = useNavigate()

    const cookieChecker = () => {
        if (!Cookies.get(`userId`)) {
            navigate(`/`)
        }
    }

    useEffect(() => {
        cookieChecker()

        axios.delete(`http://localhost:8080/api/game/${gameId}`)
            .then(res => {
                navigate("/home")
            })
            .catch(err => {
                console.log(err)
                alert(`Game could not be deleted!`)
                navigate("/home")
            })
    }, [])

    return (
        <div></div>
    );
}

export default DeleteGame;
