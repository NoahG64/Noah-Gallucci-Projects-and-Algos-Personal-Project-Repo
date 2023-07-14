import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {

    let location = useLocation();

    return (
        <div className='nav-bar'>
            <h1>IGDB</h1>

            {
                location.pathname !== "/" ?
                <div>
                    <Link to={'/addGame'} className='nav-button'>Add a Game</Link>
                </div> : <div></div>
            }
        </div>
    );
}

export default Navigation;
