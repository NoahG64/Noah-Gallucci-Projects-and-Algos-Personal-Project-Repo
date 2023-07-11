import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginAndRegister = () => {

    const navigate = useNavigate()

    const [newUser, setNewUser] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [loginUser, setLoginUser] = useState({
        email: "",
        password: ""
    })

    const onChangeHandlerNewUser = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value })
    }

    const onChangeHandlerLoginUser = (e) => {
        setLoginUser({ ...loginUser, [e.target.name]: e.target.value })
    }

    const registerHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8080/api/user', newUser)
            .then(res =>
                /*somehow store res.data.id into session so we have the current user id.*/
                navigate('/')
            )
            /*Do something about the errors I am getting so they can be displayed on the page.*/
            .catch(err => console.log(err.response.data.message))
    }

    return (
        <div>
            <div className='d-flex justify-content-center m-3 p-3 gap-5'>
                <form className='form-class' onSubmit={registerHandler}>
                    <h2>Registration</h2>
                    <div className="form-group">
                        <label>
                            Username:
                            <input type='text' id='userName' name='userName' className="form-control" onChange={onChangeHandlerNewUser} />
                        </label>
                    </div>

                    <div className="form-group">
                        <label>
                            Email:
                            <input type='text' id='email' name='email' className="form-control" onChange={onChangeHandlerNewUser} />
                        </label>
                    </div>

                    <div className="form-group">
                        <label>
                            Password:
                            <input type='password' id='password' name='password' className="form-control" onChange={onChangeHandlerNewUser} />
                        </label>
                    </div>

                    <div className="form-group">
                        <label>
                            Confirm Password:
                            <input type='password' id='confirmPassword' name='confirmPassword' className="form-control" onChange={onChangeHandlerNewUser} />
                        </label>
                    </div>

                    <button className="btn btn-primary form-button">Register</button>
                </form>

                <form className='form-class'>
                    <h2>Login</h2>
                    <div className="form-group">
                        <label>
                            Email:
                            <input type='text' id='email' name='email' className="form-control" onChange={onChangeHandlerLoginUser} />
                        </label>
                    </div>

                    <div className="form-group">
                        <label>
                            Password:
                            <input type='password' id='password' name='password' className="form-control" onChange={onChangeHandlerLoginUser} />
                        </label>
                    </div>
                    <button className="btn btn-primary form-button">Login</button>
                </form>
            </div>
        </div>
    );
}

export default LoginAndRegister;