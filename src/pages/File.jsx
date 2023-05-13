import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';

import Header from '../components/Header';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SendIcon from '@mui/icons-material/Send';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import './../style/file.css'
import DownloadIcon from '@mui/icons-material/Download';


const end = 'http://localhost:5000'
let stompClient = null

const File = () => {
    // LES ETATS DU SYSTEME
    const [sender, setSender] = useState({
        username: "Vetrix",
        number: "22P139"
    })
    const [receiver, setReceiver] = useState({
        username: "Smart",
        number: "22P138"
    })
    const [friend, setFriend] = useState([])
    const [name, setName] = useState("");
    const [connection, setConnection] = useState(false);
    const [mat, setMat] = useState("");
    const [file, setFile] = useState([]);
    const [pop, setPop] = useState("disactiv")
    const [discut, setDiscut] = useState([])



    // APPEL À LA NAVIGATION
    const navigate = useNavigate();
    // PARAMÈTRE PASSÉ DANS LE LIEN
    let { send_number, number } = useParams()

    // FONCTION DE BIENVENUE
    let welcome = () => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        // CONDITION DE SI NOUS NE SOMME PAS EN "welcome" REQUETE POUR AVOIR LE DETINATAIRE
        if (number !== "welcome") {
            fetch(end + "/student/matricule?matricule=" + number.toUpperCase(), requestOptions)
                .then(response => response.text())
                .then(result => {
                    let a = JSON.parse(result)
                    setReceiver(a[0])
                })
                .catch(error => console.log('error', error));

            // REQUETE POUR AVOIR LES FICHIERS ÉCHANGÉ
            fetch(end + "/file/" + send_number + "/to/" + number, requestOptions)
                .then(response => response.text())
                .then(result => {
                    setDiscut(JSON.parse(result))
                })
                .catch(error => console.log('error', error));
        }

        // REQUETE POUR AVOIR LA LISTE DES PRÉCEDENTS INTERLOCUTEUR 
        fetch(end + "/file/" + send_number.toUpperCase(), requestOptions)
            .then(response => response.text())
            .then(result => {
                setFriend(JSON.parse(result))
            })
            .catch(error => console.log('error', error));

        // REQUETE POUR AVOIR L'ENVOYEUR
        fetch(end + "/student/matricule?matricule=" + send_number.toUpperCase(), requestOptions)
            .then(response => response.text())
            .then(result => {
                let a = JSON.parse(result)[0]
                setSender(a)
            })
            .catch(error => console.log('error', error));

    }


    // FONCTION D'ENVOIE DE FICHIER
    let send = () => {
        if (number === "welcome") {
            alert("Veuillez selectionner un matricule où envoyer")
        } else {

            var formdata = new FormData();
            formdata.append("file", file[0], name);

            var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };

            fetch(end + "/file/send/" + send_number + "/to/" + number, requestOptions)
                .then(response => response.text())
                .then(result => {
                    welcome()
                    sendPrivateValue()
                    console.log(result)
                })
                .catch(error => console.log('error', error));

        }
    }


    // FONSTION POUR RECHERCHER UN DESTINATAIRE
    let search = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        if (send_number === mat.toUpperCase()) {
            alert("Veuillez entrer un matricule différent du votre")
        } else {
            fetch(end + "/student/matricule?matricule=" + mat.toUpperCase(), requestOptions)
                .then(response => response.text())
                .then(result => {
                    let abs = JSON.parse(result)
                    if (abs.length <= 0) {
                        alert("Matricule non enregistré")
                    } else {
                        setReceiver(abs[0])
                        setPop("disactiv")
                        navigate(`/file/${send_number}/to/${abs[0].number}`)
                    }
                })
                .catch(error => console.log('error', error));
        }
    }

    //CONNECTION UTILISANT LES SOCKETS
    const connect = () => {
        let Sock = new SockJS(end + '/ws');
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    }

    const onConnected = () => {
        setConnection(true)
        stompClient.subscribe('/user/' + send_number + '/private', onPrivateMessage);
    }

    const sendPrivateValue = () => {
        if (stompClient) {
            var chatMessage = {
                sender: send_number,
                receiver: number,
                message: name,
                status: "MESSAGE"
            };
            stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
        }
    }

    const onPrivateMessage = () => {
        welcome()
    }
    const onError = (err) => {
        console.log(err);
        setConnection(false)
    }

    useEffect(() => {
        connect()
        welcome()
        console.log(connection)
    }, [number])


    return (
        <div className='page file'>
            <div className={"modal flex " + pop}>
                <div className="pop">
                    <div className="text-field">
                        <label htmlFor="number">Matricule : </label>
                        <input
                            type="text"
                            value={mat}
                            onChange={(e) => setMat(e.target.value)}
                        />
                    </div>
                    <div className="buttons">
                        <span className="cancel" onClick={() => setPop("disactiv")} >Annuler</span>
                        <span className="valid" onClick={() => search()}>Valider</span>
                    </div>
                </div>
            </div>
            <Header />
            <main>
                {/* BOX DE CHAT */}
                <div className="box">
                    <div className="left">
                        <div className="header">
                            <h3 className='flex'><AccountCircleIcon /> <span> {sender.number} : {sender.username}</span></h3>
                        </div>
                        <hr />
                        <div className="body">
                            <ul>
                                {friend.map((user, idx) => <NavLink key={idx} to={"/file/" + send_number + "/to/" + user.number} className={(link) => (link.isActive ? "act" : "")}>
                                    <li className='flex'>{user.number + ": " + user.username}</li>
                                </NavLink>)}
                            </ul>
                        </div>
                    </div>
                    <div className="right">
                        <div className="header">
                            <h3>{number === "welcome" ? 'BIENVENUE' : <span><PersonIcon /> {" " + receiver.number} : {receiver.username}</span>}</h3>
                            <span onClick={() => setPop("activ")} className='add_button'> <PersonAddIcon /></span>
                        </div>
                        <div className="body">
                            <div className="file_message">

                                {discut.map((mes, idx) => mes.sender === send_number ?
                                    <div className="line line_right" key={idx}>
                                        <div className="send">
                                            <h5><DownloadIcon />{sender.number} : {sender.username}</h5>
                                            <p>
                                                <NavLink to={end + "/file/download/" + mes.reelName + "/" + mes.name}>
                                                    {mes.reelName}
                                                </NavLink>
                                            </p>
                                        </div>
                                    </div>
                                    :
                                    <div className="line line_left" key={idx}>
                                        <div className="receive">
                                            <h5>{receiver.number} : {receiver.username} <DownloadIcon /></h5>
                                            <p>
                                                <NavLink to={end + "/file/download/" + mes.reelName + "/" + mes.name}>
                                                    {mes.reelName}
                                                </NavLink>
                                            </p>
                                        </div>
                                    </div>
                                )}



                            </div>
                            <div className="input">
                                <span
                                    onClick={() => {
                                        document.getElementById('file').click()
                                    }} className='select flex'
                                >
                                    <InsertDriveFileIcon />
                                    <input type="file"
                                        defaultValue={file}
                                        onChange={(e) => {
                                            setFile(e.target.files)
                                            setName(e.target.value.replace('C:\\fakepath\\', ''))
                                        }} name='file' id='file'
                                    />
                                </span>
                                <input type="text" name="name" id="name" readOnly value={name} />
                                <span onClick={() => send()} className='send flex'>
                                    <SendIcon />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </div>
    );
};

export default File;