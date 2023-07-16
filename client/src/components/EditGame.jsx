import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const EditGame = () => {

    const navigate = useNavigate()

    const { gameId } = useParams()
    const [editedGame, setEditedGame] = useState({})

    /*If userId is not in session, send back to login & register*/
    const cookieChecker = () => {
        if (!Cookies.get(`userId`)) {
            navigate(`/`)
        }
    }

    const changeHandler = e => {
        setEditedGame({ ...editedGame, [e.target.name]: e.target.value })
    }

    const submitHandler = e => {
        e.preventDefault()

        axios.put(`http://localhost:8080/api/game/${editedGame.id}`, editedGame)
            .then(res => {
                navigate('/home')
            })
            .catch(err => {
                console.log(err.response.data.message) /*Do something about the errors I am getting so they can be displayed on the page.*/
                alert("Game could not be Edited! Please try again.")
            })
    }

    useEffect(() => {
        cookieChecker()

        axios.get(`http://localhost:8080/api/game/${gameId}`)
            .then(res => {
                setEditedGame(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div className='d-flex justify-content-center m-3 p-3 gap-5'>
            <form className='form-class' onSubmit={submitHandler}>
                <h2>Edit Game</h2>

                <div className="form-group">
                    <label>
                        Title:
                        <input type='text' id='title' name='title' onChange={changeHandler} value={editedGame.title}></input>
                    </label>
                </div>

                <div className="form-group">
                    <label>
                        Genre:
                        <input type='text' id='genre' name='genre' onChange={changeHandler} value={editedGame.genre}></input>
                    </label>
                </div>

                <div className="form-group">
                    <label>
                        Release Date:
                        <input type='date' id='releaseDate' name='releaseDate' onChange={changeHandler} value={editedGame.releaseDate}></input>
                    </label>
                </div>

                <div className="form-group">
                    <label>
                        Metacritic Score:
                        <input type='number' min={0} max={100} id='metacriticScore' name='metacriticScore' onChange={changeHandler} value={editedGame.metacriticScore}></input>
                    </label>
                </div>

                <div className="form-group">
                    <label>
                        Description:
                        <textarea id='description' name='description' rows={4} cols={50} onChange={changeHandler} value={editedGame.description}></textarea>
                    </label>
                </div>

                <div className="form-group">
                    <label>
                        Store Link (Optional):
                        <input type='text' id='storeLink' name='storeLink' onChange={changeHandler} value={editedGame.storeLink}></input>
                    </label>
                </div>

                <button className="btn btn-primary form-button">Edit Game</button>
            </form>
        </div>
    );
}

export default EditGame;
