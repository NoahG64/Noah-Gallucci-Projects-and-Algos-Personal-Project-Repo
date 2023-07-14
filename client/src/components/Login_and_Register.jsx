import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

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

    const onChangeHandlerNewUser = e => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value })
    }

    const onChangeHandlerLoginUser = e => {
        setLoginUser({ ...loginUser, [e.target.name]: e.target.value })
    }

    const registerHandler = e => {
        e.preventDefault()
        axios.post('http://localhost:8080/api/user', newUser)
            .then(res => {
                Cookies.set('userId', res.data.id, {
                    expires: 1 / 48,
                    sameSite: 'strict'
                })
                navigate('/home')
            })
            .catch(err => {
                console.log(err.response.data.message) /*Do something about the errors I am getting so they can be displayed on the page.*/
                alert("Invalid Register! Please try again.")
            }) 
    }

    const loginHandler = e => {
        e.preventDefault()
        axios.post('http://localhost:8080/api/user/login', loginUser)
            .then(res => {
                Cookies.set('userId', res.data.id, {
                    expires: 1 / 48,
                    sameSite: 'strict'
                })
                navigate('/home')
            })
            .catch(err => {
                console.log(err.response.data.message) /*Do something about the errors I am getting so they can be displayed on the page.*/
                alert("Invalid Login! Please try again.")
            }) 
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

                <form className='form-class' onSubmit={loginHandler}>
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