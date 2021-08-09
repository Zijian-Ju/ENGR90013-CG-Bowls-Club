import React, { useEffect, useState } from 'react';
import axios from 'axios';

import styles from './css/navbar.module.css';
import bodyStyles from './css/body.module.css';
import toolbarStyles from  './css/toolbar.module.css';
import mcclogo from './img/mcc-logo.png';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import MoreVertIcon from '@material-ui/icons/MoreVertOutlined';

function placeholderAlert() {
    return alert("Unsupported");
}

function Teams() {
    const history = useHistory();
    const [response, setResponse] = useState({});
    const [selectedTeam, setSelectedTeam] = useState(-1);

    function membersHandleClick() {
        history.push("/members");
    };

    function homeHandleClick() {
        history.push("/home");
    };

    function teamsHandleClick() {
        history.push("/teams")
    }

    function renderTeams(data) {
        const teamsArray = data.data.data.teamList
        console.log(teamsArray)
        return (
            <div className={bodyStyles.teamsList}>
                {teamsArray.map(team => {
                    return (
                        <div id={team.id} className={bodyStyles.teamCard} onClick={() => setSelectedTeam(team.id)}>
                            <div className={bodyStyles.teamCardText}>
                                Team number: {team.id}
                            </div>
                            <div className={bodyStyles.teamCardEdit}>
                                <MoreVertIcon/>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    function renderTeamComposition() {
        return (
            <div>
                {selectedTeam}
            </div>
        )
    }

    useEffect(() => {
        axios.get(`http://128.199.253.108:8082/team/gerAllTeam`)
            .then(res => {
                setResponse(res);
                console.log(res);
            })
    }, []);

    return (
        <div style={{height: '100vh', display: 'flex', flexFlow: 'column'}}>
            <div className={styles.body}>
                <div className={styles.logotext} >
                    <img className={styles.mcclogo} onClick={homeHandleClick} src={mcclogo} alt="Logo" />
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
            <div className={toolbarStyles.toolbar}>
                <div className={toolbarStyles.newUserContainer}>
                    <Button variant="contained" color="primary" onClick={placeholderAlert}>New Team</Button>
                </div>
            </div>
            <div className={bodyStyles.teamsBody}>
                <div className={bodyStyles.teamsListContainer}>
                    {response !== {} && response.status === 200 && renderTeams(response)}
                    {response === {} && <div>...Loading</div>}
                </div>
                <div className={bodyStyles.selectTeam}>
                    {selectedTeam !== -1 && renderTeamComposition()}
                </div>
            </div>
        </div>
    )
}

export default Teams;