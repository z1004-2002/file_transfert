import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import NumbersIcon from '@mui/icons-material/Numbers';
import { useNavigate } from 'react-router-dom';
import "./../style/home.css"
import Header from '../components/Header';


const end = 'http://localhost:5000'

const Home = () => {
    let [student, setStudent] = useState({
        username: "",
        number: ""
    })
    const navigate = useNavigate();


    let connection = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(end + "/student/matricule?matricule=" + student.number.toUpperCase(), requestOptions)
            .then(response => response.text())
            .then(result => {
                let a = JSON.parse(result)
                if (a.length <=0) {
                    alert("Matricule introuvable")
                }else{
                    if (a[0].username !== student.username) {
                        alert("Erreur de UserName")
                    }else{
                        navigate("/file/"+student.number.toUpperCase()+"/to/welcome")
                    }
                }
            })
            .catch(error => console.log('error', error));
    }

    return (
        <div className='home page'>
            <Header />
            <main>
                <div className="form">
                    <h3 className='orange'>CONNEXION</h3>
                    <div className="text-field">
                        <div className="label">
                            <PersonIcon />
                            <label htmlFor="username"> Nom d'Utilisateur : </label>
                        </div>
                        <div className="input">
                            <input type="text"
                                value={student.username}
                                onChange={(e) => {
                                    let stud = {
                                        username: e.target.value,
                                        number: student.number
                                    }
                                    setStudent(stud)
                                }}
                                name="username" id="username" />
                            <i></i>
                        </div>
                    </div>
                    <div className="text-field">
                        <div className="label">
                            <NumbersIcon />
                            <label htmlFor="number">Matricule : </label>
                        </div>
                        <div className="input">
                            <input type="text"
                            value={student.number}
                            onChange={(e) => {
                                let stud = {
                                    username: student.username,
                                    number: e.target.value
                                }
                                setStudent(stud)
                            }}
                            name="number" id="number" />
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