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
import NativeSelect from '@material-ui/core/NativeSelect';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';



function Profile() {
    const [response, setResponse] = useState({});
    const [performance, setPerformance] = useState();
    const [availability, setAvailability] = useState();
    const [favPosition, setFavPosition] = useState();
    const [preference, setPreference] = useState();
    const [editing, setEditing] = useState(false);
    const history = useHistory();
    const { id } = useParams();
    const [random, setRandom] = useState(Math.random());
    const reRender = () => setRandom(Math.random());
    const [year, setYear] = useState();
    const [competition, setCompetition] = useState()

    
    useEffect(() => {
      axios.post(`http://128.199.253.108:8082/player/getPlayerById`, {id: id})
      .then(res => {
          setResponse(res);
          console.log(res)
          if (res.status === 200 && res.data.statusCode === 200) {
            setPerformance(res.data.data.recentPerformance)
            setAvailability(res.data.data.playerAvailability)
            setFavPosition(res.data.data.playerPosPreference)
            setPreference(res.data.data.playerPreferTeammates)
          }
      })
    }, [random])

    function placeholderAlert() {
        return alert("Unsupported");
    }; 

    function updatePlayer() {
      console.log(id)
      axios.post(`http://128.199.253.108:8082/player/updatePlayer`, {id: id, photoUrl: response.data.data.photoUrl, playerName: response.data.data.playerName, playerEmail: response.data.data.playerEmail, playerGender: response.data.data.playerGender, playerNotPreferTeammates: response.data.data.playerNotPreferTeammates, playerPhone: response.data.data.playerPhone, recentPerformance: response.data.data.recentPerformance, playerAvailability: availability, playerPosPreference: favPosition, playerPreferTeammates: preference})
      .then(res => {
        alert("Saved")
        reRender();
        setEditing(false);
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

    function deleteUser() {
      axios.post(`http://128.199.253.108:8082/player/deletePlayerById`, {id: id})
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          alert("Player deleted"); 
          history.push('/members');
        }
      })
    };

    if (Object.keys(response).length !== 0 && response.constructor === Object) {
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
                <div className={profileStyles.leftColumnDescriptionTextfield}>
                  <TextField
                    style={{width: '100%'}}
                    disabled
                    id="Performance"
                    label="Auto Calculated Performance"
                    defaultValue={performance}
                    value={performance}
                    variant="outlined"
                    size="small"
                  />
                </div>
                <div className={profileStyles.leftColumnDescriptionTextfield}>
                  <TextField
                    style={{width: '100%'}}
                    id="Availability"
                    label="Availability"
                    defaultValue={availability}
                    value={availability}
                    variant="outlined"
                    onChange={(e) => {setAvailability(e.target.value)}}
                    disabled={!editing}
                    size="small"
                  />
                </div>
                <div className={profileStyles.leftColumnDescriptionTextfield}>
                  <TextField
                    style={{width: '100%'}}
                    id="Favourite Position"
                    label="Favourite Position"
                    defaultValue={favPosition}
                    value={favPosition}
                    variant="outlined"
                    onChange={(e) => {setFavPosition(e.target.value)}}
                    disabled={!editing}
                    size="small"
                  />
                </div>
                <div className={profileStyles.leftColumnDescriptionTextfield}>
                  <TextField
                    style={{width: '100%'}}
                    id="Preferred Teammates"
                    label="Preferred Teammates"
                    defaultValue={preference}
                    value={preference}
                    variant="outlined"
                    onChange={(e) => {setPreference(e.target.value)}}
                    disabled={!editing}
                    size="small"
                  />
                </div>
                {editing ? 
                  <div>
                    <Button onClick={() => {reRender(); setEditing(false)}}>Cancel</Button>
                    <Button onClick={() => {updatePlayer()}}>Save changes</Button> 
                  </div>
                  : 
                  <Button onClick={() => {setEditing(true)}}>Edit</Button>
                }
              </div>
              <div className={profileStyles.leftColumnButtonContainer}>
                <Button onClick={() => deleteUser()}>Delete Player</Button>
              </div>
            </div>
            <div style={{width: '75%'}} className={profileStyles.rightColumn}>
              <div className={profileStyles.rightColumnSettingsContainer}>
                <FormControl style={{minWidth: '200px', marginRight: '5%'}}>
                  <InputLabel shrink htmlFor="age-native-label-placeholder">
                    Year
                  </InputLabel>
                  <NativeSelect
                    labelId="demo-simple-select-label"
                    id="competition year"
                    value={year}
                    onChange={(e) => {setYear(e.target.value)}}
                    inputProps={{name:'Year'}}
                  >
                    <option value={'2019-2020'}>2019-2020</option>
                    <option value={'2020-2021'}>2020-2021</option>
                  </NativeSelect>
                </FormControl>
                <FormControl style={{minWidth: '200px'}}>
                  <InputLabel shrink htmlFor="age-native-label-placeholder">
                    Competition
                  </InputLabel>
                  <NativeSelect
                    labelId="demo-simple-select-label"
                    id="competition"
                    value={competition}
                    onChange={(e) => {setCompetition(e.target.value)}}
                    label="Competition"
                    style={{minWidth: '200px'}}
                  >
                    <option value={'Weekend Pennant'}>Weekend Pennant</option>
                    <option value={'Weekday Pennant'}>Weekday Pennant</option>
                  </NativeSelect>
                </FormControl>
              </div>
              <div className={profileStyles.rightColumnGraphContainer}>
                graph
              </div>
              <div className={profileStyles.rightColumnCompetitionContainer}>
                Competition tracking
              </div>
            </div>
          </div>
        </div> 
      )
    } else {
      return (null)
    }          
};

export default Profile;