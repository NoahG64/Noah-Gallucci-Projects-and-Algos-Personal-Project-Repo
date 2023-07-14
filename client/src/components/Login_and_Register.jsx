import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { validate } from 'validate.js';

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

    const [errors, setErrors] = useState({})

    const onChangeHandlerNewUser = e => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value })
        validationHandler()
    }

    const onChangeHandlerLoginUser = e => {
        setLoginUser({ ...loginUser, [e.target.name]: e.target.value })
        validationHandler()
    }

    const registerHandler = e => {
        e.preventDefault()
        if (errors)
            axios.post('http://localhost:8080/api/user', newUser)
                .then(res =>
                    Cookies.set('userId', res.data.id, {
                        expires: 1 / 48
                    }),
                    navigate('/')
                )
                /*Do something about the errors I am getting so they can be displayed on the page.*/
                .catch(err => console.log(err.response.data.message))
    }

    const loginHandler = e => {
        e.preventDefault()
        axios.post('http://localhost:8080/api/user/login', loginUser)
            .then(res =>
                Cookies.set('userId', res.data.id, {
                    expires: 1 / 48
                }),
                navigate('/')
            )
            /*Do something about the errors I am getting so they can be displayed on the page.*/
            .catch(err => console.log(err.response.data.message))
    }

    const validationHandler = () => {
        let newUserIsValid = true
        let loginUserIsValid = true

        let constraints = {
            from: {
                email: true
            }
        }

        /*If name is not entered, make newUserIsValid false.*/
        if (!newUser.userName) {
            setErrors(...errors, {newUser: { userName: "Username is required." }})
            newUserIsValid = false
        }

        /*If name is either too short or too long, make newUserIsValid false.*/
        if (newUser.userName.length < 3 || newUser.userName.length > 30) {
            setErrors(...errors, {newUser: { userName: "Username must be between 3 and 30 characters." }})
            newUserIsValid = false
        }

        /*If email is not entered, make newUserIsValid false.*/
        if (!newUser.email) {
            setErrors(...errors, {newUser: { email: "Email is required." }})
            newUserIsValid = false
        }

        /*If email is not valid, make newUserIsValid false.*/
        if (validate({ from: newUser.email }, constraints)) {
            setErrors(...errors, {newUser: { email: "Email is not valid." }})
            newUserIsValid = false
        }

        /*If password is not entered, make newUserIsValid false.*/
        if (!newUser.password) {
            setErrors(...errors, {newUser: { password: "Password is required." }})
            newUserIsValid = false
        }

        /*If password doesn't match validation, make newUserIsValid false */
        if (!newUser.password.match(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,128}$/gm)) {
            setErrors(...errors, {newUser: { password: "Password is not valid. Password must contain 1 number (0-9), a lowercase and uppercase character, a non-alphanumeric character, and be between 8 and 128 characters." }})
            newUserIsValid = false
        }

        if(!newUser.confirmPassword){
            setErrors(...errors, {newUser: { confirmPassword: "Confirm Password is required." }})
            newUserIsValid = false
        }

        if(newUser.confirmPassword !== newUser.password){
            setErrors(...errors, {newUser: { confirmPassword: "Confirm Password does not match Password." }})
            newUserIsValid = false
        }

        if(!loginUser.email){
            setErrors(...errors, {loginUser: {email: "Email is required."}})
            loginUserIsValid = false
        }

        if(!loginUser.password){
            setErrors(...errors, {loginUser: {password: "Password is required."}})
            loginUserIsValid = false
        }
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