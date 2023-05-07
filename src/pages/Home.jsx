import React from 'react';
import { NavLink } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import NumbersIcon from '@mui/icons-material/Numbers';
import { useNavigate } from 'react-router-dom';
import "./../style/home.css"
import Header from '../components/Header';

const Home = () => {
    const navigate = useNavigate();

    
    let connection = ()=>{
        navigate("/file")
    }

    return (
        <div className='home page'>
            <Header/>
            <main>
                <div className="form">
                    <h3 className='orange'>CONNEXION</h3>
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
                        si vous n'êtes pas encore enregistré,
                        veuillez vous <NavLink to='/register'> Enregistrer</NavLink>
                        </span>
                    </div>
                    <div className="buttons">
                        <span className="button" onClick={connection}>Se Connecter</span>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;