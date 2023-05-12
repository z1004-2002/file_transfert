import React, { useState } from 'react';
import Header from '../components/Header';
import { NavLink, useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import NumbersIcon from '@mui/icons-material/Numbers';
import "./../style/home.css"

const end = 'http://localhost:5000'

const Register = () => {
    let [student, setStudent] = useState({
        username: "",
        number: ""
    })

    const navi = useNavigate()

    let register = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "username": student.username,
            "number": student.number.toUpperCase()
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(end+"/student/register", requestOptions)
            .then(response => response.text())
            .then(result => {
                let data = JSON.parse(result)
                if (data.id) {
                    navi("/")
                }
            })
            .catch(error => console.log('error', error));
    }

    return (
        <div className='home page register'>
            <Header />
            <main>
                <div className="form">
                    <h3 className='orange'>ENREGISTREMENT</h3>
                    <div className="text-field">
                        <div className="label">
                            <PersonIcon />
                            <label htmlFor="username"> Nom d'Utilisateur : </label>
                        </div>
                        <div className="input">
                            <input type="text" value={student.username}
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
                            <input type="text" value={student.number}
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
                            Si vous êtes déjà enregistrer veuillez vous <NavLink to='/'>Connecter</NavLink>
                        </span>
                    </div>
                    <div className="buttons" onClick={register}>
                        <span className="button">S'enregistrer</span>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Register;