import React from 'react';
import Header from '../components/Header';
import { NavLink } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import NumbersIcon from '@mui/icons-material/Numbers';
import "./../style/home.css"

const Register = () => {
    return (
        <div className='home page register'>
            <Header/>
            <main>
                <div className="form">
                    <h3 className='orange'>ENREGISTREMENT</h3>
                    <div className="text-field">
                        <div className="label">
                            <PersonIcon/>
                            <label htmlFor="username"> Nom d'Utilisateur : </label>
                        </div>
                        <div className="input">
                            <input type="text" name="username" id="username" />
                            <i></i>
                        </div>
                    </div>
                    <div className="text-field">
                        <div className="label">
                            <NumbersIcon/>
                            <label htmlFor="number">Matricule : </label>
                        </div>
                        <div className="input">
                            <input type="text" name="number" id="number" />
                            <i></i>
                        </div>
                    </div>
                    <div className="avert">
                        <span>
                        Si vous êtes déjà enregistrer veuillez vous <NavLink to='/'>Connecter</NavLink>
                        </span>
                    </div>
                    <div className="buttons">
                        <span className="button">S'enregistrer</span>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Register;