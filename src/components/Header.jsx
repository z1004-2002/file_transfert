import React from 'react';
import "./../style/components/header.css"
import logo from './../assets/img/logo.png'
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <div className="container_logo">
                <NavLink to="/">
                    <img className='logo' src={logo} alt="logo_polytechnique" />
                </NavLink>
            </div>
            <div className="nom flex orange ravie">
                <h3>FILE TRANSFERT</h3>
            </div>
            <div className="about flex orange">
                <NavLink to="/about">About</NavLink>
            </div>
        </header>
    );
};

export default Header;