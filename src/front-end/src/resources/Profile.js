import React, { useEffect, useState } from 'react';
import styles from './css/navbar.module.css';
import bodyStyles from './css/body.module.css';
import mcclogo from './img/mcc-logo.png';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import axios from 'axios';
import { useParams } from "react-router-dom";

import 'antd/dist/antd.css';
import { Form, Input, InputNumber } from 'antd';

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
          setLoaded(true);
      })
      if (response !== {} && response.data !== undefined) {
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

    function deleteUser(Id) {
      axios.post(`http://128.199.253.108:8082/player/deletePlayerById`, {Id: id})
      .then(res => {
        console.log(res);
        alert("User deleted"); history.push("/members");
      })
    }

    if (loaded) {
    return (
        <>
            <div className={styles.body}>
                <div className={styles.logotext} >
                    <img className={styles.mcclogo} src={mcclogo} alt="Logo" />
                </div>
                <div className={styles.linktabs}>
                    <Button className={styles.linkbuttons} onClick={placeholderAlert}>Unsupported Placeholder</Button>
                    <Button className={styles.linkbuttons} onClick={placeholderAlert}>Unsupported Placeholder</Button>
                    <Button className={styles.linkbuttons} onClick={placeholderAlert}>Unsupported Placeholder</Button>
                    <Button className={styles.linkbuttons} onClick={placeholderAlert}>Unsupported Placeholder</Button>
                </div>
            </div>
      
            <div className = {bodyStyles.profilePage}>
              <div className = {bodyStyles.profilePageColumn}>
                <div className = {bodyStyles.profilePageColumnContainer}>
                  <div className = {bodyStyles.profilePageTitle}>
                  Profile Overview
                  </div>
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
                        <TextField size='small' style={{width:'100%'}} id="filled-basic" label="Enter Name" variant="outlined" defaultValue={playerName} />
                      </div>
                    </div>
                    <div className = {bodyStyles.profilePageInfoContainerRow}>
                      <div className = {bodyStyles.profilePageContainerRowText}>
                        Email
                      </div>
                      <div className = {bodyStyles.profilePageContainerRowTextfield}>
                        <TextField size='small' style={{width:'100%'}} id="filled-basic" label="Enter Email" variant="outlined" defaultValue={playerEmail} />
                      </div>
                    </div>
                    <div className = {bodyStyles.profilePageInfoContainerRow}>
                      <div className = {bodyStyles.profilePageContainerRowText}>
                        Phone
                      </div>
                      <div className = {bodyStyles.profilePageContainerRowTextfield}>
                        <TextField size='small' style={{width:'100%'}} id="filled-basic" label="Enter Phone Number" variant="outlined" defaultValue={playerPhone} />
                      </div>
                    </div>
                    <div className = {bodyStyles.profilePageInfoContainerRow}>
                      <div className = {bodyStyles.profilePageContainerRowText}>
                        Availability
                      </div>
                      <div className = {bodyStyles.profilePageContainerRowTextfield}>
                        <TextField size='small' style={{width:'100%'}} id="filled-basic" label="Enter Availability" variant="outlined" defaultValue={playerAvailability} />
                      </div>
                    </div>
                    <div className = {bodyStyles.profilePageInfoContainerRow}>
                      <div className = {bodyStyles.profilePageContainerRowText}>
                        Preference Position
                      </div>
                      <div className = {bodyStyles.profilePageContainerRowTextfield}>
                        <TextField size='small' style={{width:'100%'}} id="filled-basic" label="Enter Preference" variant="outlined" defaultValue={playerPreference} />
                      </div>
                    </div>
                    <div className = {bodyStyles.profilePageInfoContainerRow}>
                      <div className = {bodyStyles.profilePageContainerRowText}>
                        Preferred Teammate
                      </div>
                      <div className = {bodyStyles.profilePageContainerRowTextfield}>
                        <TextField size='small' style={{width:'100%'}} id="filled-basic" label="Enter Preferred Teammate" variant="outlined" defaultValue={playerPreferredTM} />
                      </div>
                    </div>
                    <div className = {bodyStyles.profilePageInfoContainerRow}>
                      <div className = {bodyStyles.profilePageContainerRowText}>
                        Unpreferred Teammate
                      </div>
                      <div className = {bodyStyles.profilePageContainerRowTextfield}>
                        <TextField size='small' style={{width:'100%'}} id="filled-basic" label="Enter Unpreferred Teammate" variant="outlined" defaultValue={playerNotPreferredTM}/>
                      </div>
                    </div>
                    <div className = {bodyStyles.profilePageInfoContainerRow}>
                      <div className = {bodyStyles.profilePageContainerRowText}>
                        Gender
                      </div>
                      <div className = {bodyStyles.profilePageContainerRowTextfield}>
                        <TextField size='small' style={{width:'100%'}} id="filled-basic" label="Enter Gender" variant="outlined" defaultValue={playerGender} />
                      </div>
                    </div>
                  </div>
                  <div className = {bodyStyles.profilePageBasicInfoSubmit}>
                    <Button>Save Information</Button>
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
    } return (null);
};

const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

export default Profile;