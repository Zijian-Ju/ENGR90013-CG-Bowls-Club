import React, { useEffect, useState } from 'react';
import styles from './css/navbar.module.css';
import bodyStyles from './css/body.module.css';
import toolbarStyles from  './css/toolbar.module.css';
import mcclogo from './img/mcc-logo.png';
import profilepic from  './img/profile.png';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { TextField } from '@material-ui/core';

function placeholderAlert() {
    return alert("Unsupported");
}

function Members() {
    const [response, setResponse] = useState({});
    const history = useHistory();

    function handleUserProfileClick(id) {
        history.push("/members/" + id);
    }

    function handleCreateProfileClick() {
        history.push("/members/create");
    }

    function membersHandleClick() {
        history.push("/members");
    };

    useEffect(() => {

        axios.post(`http://128.199.253.108:8082/player/getAllUser`, {username: "string"})
            .then(res => {
                setResponse(res);
                console.log(res);
            })
    });

    function renderUsers(data) {
        const userArray = data.data.data.playerList;
        console.log(userArray)
        return (
            <div className={bodyStyles.allUsersContainer}>
                {userArray.map(user => (
                    <div className={bodyStyles.userCard} onClick={() => alert('Unsupported function')}>
                        <div className={bodyStyles.userCardImageContainer}>
                            <img className={bodyStyles.userCardImage} src={profilepic} alt="Logo" />
                        </div>
                        <div>
                            Information
                            <div>{user.playerName}</div>
                        </div>
                    </div>
                    // <div className={bodyStyles.allUsersContainerRow}>
                    //     <div className={bodyStyles.allUsersContainerRowElement}>{user.id}</div>
                    //     <div className={bodyStyles.allUsersContainerRowElement}>{user.playerName}</div>
                    //     <div className={bodyStyles.allUsersContainerRowElement}>{user.playerEmail}</div>
                    //     <div className={bodyStyles.allUsersContainerRowElement}>{user.playerPhone}</div>
                    //     <Button className={bodyStyles.allUsersContainerRowElement} onClick={() => {handleUserProfileClick(user.id)}}>Click to open</Button>
                    // </div>
                ))}
            </div>
        )
    }

    return (
        <>
            <div className={styles.body}>
                <div className={styles.logotext} >
                    <img className={styles.mcclogo} src={mcclogo} alt="Logo" />
                </div>
                <div className={styles.linktabs}>
                    <Button className={styles.linkbuttons} onClick={placeholderAlert}>COMPETITION</Button>
                    <Button className={styles.linkbuttons} onClick={placeholderAlert}>TEAMS</Button>
                    <Button className={styles.linkbuttons} onClick={membersHandleClick}>MEMBERS</Button>
                    <Button className={styles.linkbuttons} onClick={placeholderAlert}>SELECTION COMMITTEE</Button>
                </div>
                <div className={styles.logout}>
                    <Button onClick={placeholderAlert}>LOG OUT</Button>
                </div>
            </div>
            <div className={toolbarStyles.toolbar}>
                <div className={toolbarStyles.newUserContainer}>
                    <Button variant="contained" color="primary" onClick={handleCreateProfileClick}>New Member</Button>
                </div>
                <div className={toolbarStyles.searchBarContainer}>
                    <div className={toolbarStyles.searchBar}>
                        <TextField style={{width: '100%'}} variant="outlined" label="Search User"/>
                    </div>
                    <div className={toolbarStyles.filter}>
                        <Button variant="contained" colour="primary" onclick={placeholderAlert}>Filter</Button>
                    </div>
                </div>
            </div>
            <div className={bodyStyles.membersBody}>
                {response !== {} && response.status === 200 && renderUsers(response)}
            </div>
        </>
    );
};

export default Members;