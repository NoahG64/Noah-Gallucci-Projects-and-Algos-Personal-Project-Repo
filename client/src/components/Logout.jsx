import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Logout = () => {

    const navigate = useNavigate()
    useEffect(() => {
        Cookies.remove(`userId`)
        navigate(`/`)
    }, [])

    return (
        <div></div>
    );
}

export default Logout;
