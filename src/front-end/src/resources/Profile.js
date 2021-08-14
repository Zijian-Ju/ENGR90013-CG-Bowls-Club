import React, { useEffect, useState } from 'react';
import styles from './css/navbar.module.css';
import profileStyles from './css/profile.module.css';
import mcclogo from './img/mcc-logo.png';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import profilepic from  './img/profile.png';


import axios from 'axios';
import { useParams } from "react-router-dom";

function Profile() {
    const [response, setResponse] = useState({});
    const history = useHistory();
    const { id } = useParams();
    
    useEffect(() => {
      axios.post(`http://128.199.253.108:8082/player/getPlayerById`, {id: id})
      .then(res => {
          setResponse(res); 
          console.log(res); 
      })
    }, [])

    function placeholderAlert() {
        return alert("Unsupported");
    }; 

    function onSubmit() {
      axios.post(`http://128.199.253.108:8082/player/updatePlayer`, {})
      .then(res => {
        alert("Player updated"); 
        history.go(0);
      })
    }

    function membersHandleClick() {
      history.push("/members");
    };

    function homeHandleClick() {
      history.push("/home");
    }

    function teamsHandleClick() {
      history.push("/teams")
    };

    function deleteUser(Id) {
      axios.post(`http://128.199.253.108:8082/player/deletePlayerById`, {id: Id})
      .then(res => {
        alert("Player deleted"); 
        history.push("/members");
      })
    };

    if (Object.keys(response).length !== 0 && response.constructor === Object && response.status === 200 && response.data.statusCode === 200) {
      return (
        <div style={{height: '100vh', display: 'flex', flexFlow: 'column'}}>
          <div className={styles.body}>
              <div className={styles.logotext} >
                  <img className={styles.mcclogo} src={mcclogo} onClick={homeHandleClick} alt="Logo" />
              </div>
              <div className={styles.linktabs}>
                  <Button className={styles.linkbuttons} onClick={placeholderAlert}>COMPETITION</Button>
                  <Button className={styles.linkbuttons} onClick={teamsHandleClick}>TEAMS</Button>
                  <Button className={styles.linkbuttons} onClick={membersHandleClick}>MEMBERS</Button>
                  <Button className={styles.linkbuttons} onClick={placeholderAlert}>SELECTION COMMITTEE</Button>
              </div>
              <div className={styles.logout}>
                  <Button onClick={placeholderAlert}>LOG OUT</Button>
              </div>
          </div>
          <div className={profileStyles.body}>
            <div className={profileStyles.leftColumn}>
              <div className={profileStyles.leftColumnImgContainer}>
                <img style={{objectFit: 'contain', height: '100%'}} src={profilepic} alt="Logo" />
              </div>
              <div className={profileStyles.leftColumnNameContainer}>
                <div>
                  {response.data.data.playerName}
                </div>
              </div>
              <div className={profileStyles.leftColumnDescriptionContainer}>
                Player description
              </div>
              <div className={profileStyles.leftColumnButtonContainer}>
                <Button>Delete Player</Button>
              </div>
            </div>
            <div style={{width: '75%'}} className={profileStyles.rightColumn}>
              Hi
            </div>
          </div>
        </div> 
      )
    } else {
      return (null)
    }          
};

export default Profile;