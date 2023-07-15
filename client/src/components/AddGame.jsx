import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const AddGame = () => {

    const navigate = useNavigate()

    const [newGame, setNewGame] = useState({})

    /*If userId is not in session, send back to login & register*/
    const cookieChecker = () => {
        if (!Cookies.get(`userId`)) {
            navigate(`/`)
        }
    }

    const changeHandler = e => {
        setNewGame({ ...newGame, [e.target.name]: e.target.value })
    }

    const submitHandler = e => {
        e.preventDefault()

        axios.post(`http://localhost:8080/api/game`, newGame)
            .then(res => {
                navigate('/home')
            })
            .catch(err => {
                console.log(err.response.data.message) /*Do something about the errors I am getting so they can be displayed on the page.*/
                alert("Game could not be added! Please try again.")
            })
    }

    useEffect(() => {
        cookieChecker()

        axios.get(`http://localhost:8080/api/user/${Cookies.get(`userId`)}`)
            .then(res => {
                setNewGame({ ...newGame, poster : res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div className='d-flex justify-content-center m-3 p-3 gap-5'>
            <form className='form-class' onSubmit={submitHandler}>
                <h2>Add new game</h2>

                <div className="form-group">
                    <label>
                        Title:
                        <input type='text' id='title' name='title' onChange={changeHandler}></input>
                    </label>
                </div>

                <div className="form-group">
                    <label>
                        Genre:
                        <input type='text' id='genre' name='genre' onChange={changeHandler}></input>
                    </label>
                </div>

                <div className="form-group">
                    <label>
                        Release Date:
                        <input type='date' id='releaseDate' name='releaseDate' onChange={changeHandler}></input>
                    </label>
                </div>

                <div className="form-group">
                    <label>
                        Metacritic Score:
                        <input type='number' min={0} max={100} id='metacriticScore' name='metacriticScore' onChange={changeHandler}></input>
                    </label>
                </div>

                <div className="form-group">
                    <label>
                        Description:
                        <textarea id='description' name='description' rows={4} cols={50} onChange={changeHandler}></textarea>
                    </label>
                </div>

                <div className="form-group">
                    <label>
                        Store Link (Optional):
                        <input type='text' id='storeLink' name='storeLink' onChange={changeHandler}></input>
                    </label>
                </div>

                <button className="btn btn-primary form-button">Add Game</button>
            </form>
        </div>
    );
}

export default AddGame;
