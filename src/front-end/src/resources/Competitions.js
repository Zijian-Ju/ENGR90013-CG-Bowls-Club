import { useHistory } from "react-router-dom";
import styles from './css/navbar.module.css';
import Button from '@material-ui/core/Button';
import mcclogo from './img/mcc-logo.png';
import toolbarStyles from  './css/toolbar.module.css';
import competitionStyles from './css/competitions.module.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function placeholderAlert() {
    return alert("Unsupported");
}

function renderTeam(competitionId) {
    return (
        <div>load id:{competitionId} team breakdown</div>
    )
}

function Competitions() {
    const history = useHistory();
    const [random, setRandom] = useState(Math.random());
    const reRender = () => setRandom(Math.random());
    const [response, setResponse] = useState({})
    const [selectedCompId, setSelectedCompId] = useState(-1)

    function membersHandleClick() {
        history.push("/members");
    };

    function homeHandleClick() {
        history.push("/home");
    };

    function teamsHandleClick() {
        history.push("/teams")
    }

    function competitionsHandleClick() {
        history.push("/competitions")
    }

    useEffect(() => {
        axios.post(`http://128.199.253.108:8082/competition/getAllCompetition`, {})
            .then(res => {
                setResponse(res);
            })
    }, [random]);

    function renderCompetitionList() {
        return (
            <>
                {response.data.data.competitionList.map((comp) => (
                    <div onClick={() => setSelectedCompId(comp.id)} className={competitionStyles.competitionCard} id={comp.id}>
                        {comp.competitionName}
                    </div>
                ))}
            </>
        )
    }

    return (
        <div style={{height: '100vh', display: 'flex', flexFlow: 'column'}}>
            <div className={styles.body}>
                <div className={styles.logotext} >
                    <img className={styles.mcclogo} onClick={homeHandleClick} src={mcclogo} alt="Logo" />
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
            <div className={toolbarStyles.toolbar}>
                <div className={toolbarStyles.newUserContainer}>
                    <Button variant="contained" color="primary" onClick={placeholderAlert}>New Competition</Button>
                </div>
            </div>
            <div className={competitionStyles.body}>
                <div className={competitionStyles.selectCompetitionContainer}>
                    {response.status === 200 && response.data.statusCode === 200 && renderCompetitionList()}
                </div>
                <div className={competitionStyles.displayCompetitionContainer}>
                    {selectedCompId === -1 ? <div>Select a competition to start</div> : renderTeam(selectedCompId)}
                </div>
            </div>
        </div>
    )
}

export default Competitions