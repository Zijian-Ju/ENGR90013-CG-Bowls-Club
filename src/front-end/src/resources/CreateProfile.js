import React, { useEffect, useState } from 'react';
import styles from './css/navbar.module.css';
import bodyStyles from './css/body.module.css';
import mcclogo from './img/mcc-logo.png';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import axios from 'axios';
import { useParams } from "react-router-dom";

function CreateProfile() {
    const [response, setResponse] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [playerName, setPlayerName] = useState("");
    const [playerEmail, setPlayerEmail] = useState("");
    const [playerPhone, setPlayerPhone] = useState("");
    const [playerPreference, setPlayerPreference] = useState("");
    const [playerAvailability, setPlayerAvailability] = useState("");
    const [playerGender, setPlayerGender] = useState("");
    const [playerNotPreferredTM, setPlayerNotPreferredTM] = useState("");
    const [playerPreferredTM, setPlayerPreferredTM] = useState("");
    const history = useHistory();

    function placeholderAlert() {
        return alert("Unsupported");
    }; 

    function onSubmit() {
      axios.post(`http://128.199.253.108:8082/player/addPlayer`, {photoUrl: "", playerAvailability: playerAvailability, playerEmail: playerEmail, playerGender: playerGender, playerName : playerName, playerNotPreferTeammates: playerNotPreferredTM, playerPhone: playerPhone, playerPosPreference: playerPreference, playerPreferTeammates: playerPreferredTM, recentPerformance: 0, id: 0})
      .then(res => {
        alert("Player Created"); 
        history.push("/members");
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

    function competitionsHandleClick() {
      history.push("/competitions")
    }

    return (
        <div style={{height: '100vh', display: 'flex', flexFlow: 'column'}}>
            <div className={styles.body}>
                <div className={styles.logotext} >
                    <img className={styles.mcclogo} src={mcclogo} onClick={homeHandleClick} alt="Logo" />
                </div>
                <div className={styles.linktabs}>
                    <Button className={styles.linkbuttons} onClick={competitionsHandleClick}>COMPETITION</Button>
                    <Button className={styles.linkbuttons} onClick={teamsHandleClick}>TEAMS</Button>
                    <Button className={styles.linkbuttons} onClick={membersHandleClick}>MEMBERS</Button>
                    <Button className={styles.linkbuttons} onClick={placeholderAlert}>SELECTION COMMITTEE</Button>
                </div>
                <div className={styles.logout}>
                    <Button onClick={placeholderAlert}>LOG OUT</Button>
                </div>
            </div>
      
            <div className = {bodyStyles.profilePage}>
              <div style={{width:'70%', height: '100%'}} className = {bodyStyles.profilePageColumn}>
                <div style ={{height: '93.5%'}} className = {bodyStyles.profilePageColumnContainer}>
                  <div className = {bodyStyles.profilePageContainerTitle}>
                    Basic Information
                  </div>
                  <div className = {bodyStyles.profilePageBasicInfoContainer}>
                    <div className = {bodyStyles.profilePageInfoContainerRow}>
                      <div className = {bodyStyles.profilePageContainerRowText}>
                        Name
                      </div>
                      <div className = {bodyStyles.profilePageContainerRowTextfield}>
                        <TextField size='small' style={{width:'100%'}} id="filled-basic" label="Enter Name" variant="outlined" defaultValue={playerName} onChange={(e) => {setPlayerName(e.target.value)}}/>
                      </div>
                    </div>
                    <div className = {bodyStyles.profilePageInfoContainerRow}>
                      <div className = {bodyStyles.profilePageContainerRowText}>
                        Email
                      </div>
                      <div className = {bodyStyles.profilePageContainerRowTextfield}>
                        <TextField size='small' style={{width:'100%'}} id="filled-basic" label="Enter Email" variant="outlined" defaultValue={playerEmail} onChange={(e) => {setPlayerEmail(e.target.value)}}/>
                      </div>
                    </div>
                    <div className = {bodyStyles.profilePageInfoContainerRow}>
                      <div className = {bodyStyles.profilePageContainerRowText}>
                        Phone
                      </div>
                      <div className = {bodyStyles.profilePageContainerRowTextfield}>
                        <TextField size='small' style={{width:'100%'}} id="filled-basic" label="Enter Phone Number" variant="outlined" defaultValue={playerPhone} onChange={(e) => {setPlayerPhone(e.target.value)}}/>
                      </div>
                    </div>
                    <div className = {bodyStyles.profilePageInfoContainerRow}>
                      <div className = {bodyStyles.profilePageContainerRowText}>
                        Availability
                      </div>
                      <div className = {bodyStyles.profilePageContainerRowTextfield}>
                        <TextField size='small' style={{width:'100%'}} id="filled-basic" label="Enter Availability" variant="outlined" defaultValue={playerAvailability} onChange={(e) => {setPlayerAvailability(e.target.value)}}/>
                      </div>
                    </div>
                    <div className = {bodyStyles.profilePageInfoContainerRow}>
                      <div className = {bodyStyles.profilePageContainerRowText}>
                        Preference Position
                      </div>
                      <div className = {bodyStyles.profilePageContainerRowTextfield}>
                        <TextField size='small' style={{width:'100%'}} id="filled-basic" label="Enter Preference" variant="outlined" defaultValue={playerPreference} onChange={(e) => {setPlayerPreference(e.target.value)}}/>
                      </div>
                    </div>
                    <div className = {bodyStyles.profilePageInfoContainerRow}>
                      <div className = {bodyStyles.profilePageContainerRowText}>
                        Preferred Teammate
                      </div>
                      <div className = {bodyStyles.profilePageContainerRowTextfield}>
                        <TextField size='small' style={{width:'100%'}} id="filled-basic" label="Enter Preferred Teammate" variant="outlined" defaultValue={playerPreferredTM} onChange={(e) => {setPlayerPreferredTM(e.target.value)}}/>
                      </div>
                    </div>
                    <div className = {bodyStyles.profilePageInfoContainerRow}>
                      <div className = {bodyStyles.profilePageContainerRowText}>
                        Unpreferred Teammate
                      </div>
                      <div className = {bodyStyles.profilePageContainerRowTextfield}>
                        <TextField size='small' style={{width:'100%'}} id="filled-basic" label="Enter Unpreferred Teammate" variant="outlined" defaultValue={playerNotPreferredTM} onChange={(e) => {setPlayerNotPreferredTM(e.target.value)}}/>
                      </div>
                    </div>
                    <div className = {bodyStyles.profilePageInfoContainerRow}>
                      <div className = {bodyStyles.profilePageContainerRowText}>
                        Gender
                      </div>
                      <div className = {bodyStyles.profilePageContainerRowTextfield}>
                        <TextField size='small' style={{width:'100%'}} id="filled-basic" label="Enter Gender" variant="outlined" defaultValue={playerGender} onChange={(e) => {setPlayerGender(e.target.value)}}/>
                      </div>
                    </div>
                  </div>
                  <div className = {bodyStyles.profilePageBasicInfoSubmit}>
                    <Button variant="contained" onClick={onSubmit}>Create Profile</Button>
                  </div>
                </div>
              </div>
            </div>
        </div>
    )
};


export default CreateProfile;