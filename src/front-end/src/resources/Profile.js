import React, { useEffect, useState } from 'react';
import styles from './css/navbar.module.css';
import bodyStyles from './css/body.module.css';
import mcclogo from './img/mcc-logo.png';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import profilepic from  './img/profile.png';


import axios from 'axios';
import { useParams } from "react-router-dom";

function Profile() {
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
    const { id } = useParams();
    
    useEffect(() => {
      axios.post(`http://128.199.253.108:8082/player/getPlayerById`, {id: id})
      .then(res => {
          setResponse(res); 
          console.log(res); 
      })
      if (!loaded && response !== {} && response.data !== undefined && response.data.statusCode === 200) {
        setLoaded(true);
        setPlayerName(response.data.data.playerName);
        setPlayerEmail(response.data.data.playerEmail);
        setPlayerPhone(response.data.data.playerPhone);
        setPlayerAvailability(response.data.data.playerAvailability);
        setPlayerPreference(response.data.data.playerPosPreference);
        setPlayerPreferredTM(response.data.data.playerPreferTeammates);
        setPlayerNotPreferredTM(response.data.data.playerNotPreferTeammates);
        setPlayerGender(response.data.data.playerGender);
      }
    });

    function placeholderAlert() {
        return alert("Unsupported");
    }; 

    function onSubmit() {
      axios.post(`http://128.199.253.108:8082/player/updatePlayer`, {id: id, playerAvailability: playerAvailability, playerEmail: playerEmail, playerGender: playerGender, playerName : playerName, playerNotPreferTeammates: playerNotPreferredTM, playerPhone: playerPhone, playerPosPreference: playerPreference, playerPreferTeammates: playerPreferredTM})
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
    }

    if (loaded) {
    return (
        <>
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
      
            <div className = {bodyStyles.profilePage}>
              <div style = {{width: '30%'}} className = {bodyStyles.profilePageColumn}>
                <div style={{height: "30%"}} className = {bodyStyles.profilePageColumnContainer}>
                  <div className = {bodyStyles.profilePagePicContainer}>
                    <img style={{height: '100%', objectFit: 'contain'}} src={profilepic} alt="Logo" />
                  </div>
                </div>
                <div style={{height: "50%"}} className = {bodyStyles.profilePageColumnContainer}>
                
                </div>
                <div style = {{height: '10%', display: 'flex', justifyContent: 'center'}} className = {bodyStyles.profilePageColumnContainer}>
                  <Button color='secondary' onClick = {() => {deleteUser(id)}}>Delete User</Button>
                </div>
              </div>
              <div className = {bodyStyles.profilePageColumn}>
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
                    <Button onClick={onSubmit}>Save Information</Button>
                  </div>
                </div>
              </div>
              <div className = {bodyStyles.profilePageColumn}>
                <div className = {bodyStyles.profilePageColumnContainer}>
                  Free container
                </div>
                <div className = {bodyStyles.profilePageColumnContainer}>
                  Free container
                </div>
              </div>
            </div>
        </>
    )
    } return (<div>...Loading</div>);
};


export default Profile;