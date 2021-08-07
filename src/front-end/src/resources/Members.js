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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

function placeholderAlert() {
    return alert("Unsupported");
}

function Members() {
    const [response, setResponse] = useState({});
    const [userSearchText, setUserSearchText] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [minPerformance, setMinPerformance] = useState("");
    const [maxPerformance, setMaxPerformance] = useState("");
    const [availability, setAvailability] = useState([]);
    const [favPosition, setFavPosition] = useState([]);
    const [preference, setPreference] = useState("");
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

    function homeHandleClick() {
        history.push("/home");
    };

    useEffect(() => {

        axios.post(`http://128.199.253.108:8082/player/getAllUser`, {username: "string"})
            .then(res => {
                setResponse(res);
                console.log(res);
            })
    });

    function handleFilterClickOpen() {
        setDialogOpen(true);
    }

    function handleFilterClickClose() {
        setDialogOpen(false);
    }

    function renderUsers(data) {
        const userArray = data.data.data.playerList;
        console.log(userArray)
        return (
            <div className={bodyStyles.allUsersContainer}>
                {userArray.map(user => { 
                    if (user.playerName.toLowerCase().includes(userSearchText.toLowerCase())) { 
                        return (
                            <div className={bodyStyles.userCard} onClick={() => handleUserProfileClick(user.id)}>
                                <div className={bodyStyles.userCardImageContainer}>
                                    <div className={bodyStyles.userCardImage}>
                                        <img style={{width: '100%', objectFit: 'contain'}} src={profilepic} alt="Logo" />
                                    </div>
                                    <div className={bodyStyles.userName}>
                                        {user.playerName}
                                    </div>
                                </div>
                                <div className={bodyStyles.userCardDescriptionContainer}>
                                    <div className={bodyStyles.userCardDescriptionItem}>Performance</div>
                                    <div className={bodyStyles.userCardDescriptionItem}>Availability: {user.playerAvailability}</div>
                                    <div className={bodyStyles.userCardDescriptionItem}>Favourite Position</div>
                                    <div className={bodyStyles.userCardDescriptionItem}>Preference: {user.playerPosPreference}</div>
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
        )
    }

    return (
        <>
            <div className={styles.body}>
                <div className={styles.logotext} >
                    <img className={styles.mcclogo} onClick={homeHandleClick} src={mcclogo} alt="Logo" />
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
                        <TextField style={{width: '100%'}} onChange={(e) => {setUserSearchText(e.target.value)}} variant="outlined" label="Search User"/>
                    </div>
                    <div className={toolbarStyles.filter}>
                        <Button variant="contained" colour="primary" onClick={handleFilterClickOpen}>Filter</Button>
                        <Dialog className={toolbarStyles.filterDialog} open={dialogOpen} onClose={handleFilterClickClose}>
                            <DialogTitle>Filters Results</DialogTitle>
                            <DialogContent className={toolbarStyles.filterDialogContent}>
                                <FormControl className={toolbarStyles.filterFormControl} style={{marginRight: "10%"}}>
                                <InputLabel shrink id="min performance label">Min Performance</InputLabel>
                                    <Select
                                        label="Minimum"
                                        id="performance-min"
                                        value={minPerformance}
                                        displayEmpty
                                        onChange={(e) => {setMinPerformance(e.target.value)}}
                                    >
                                        <MenuItem value={0}>0</MenuItem>
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                        <MenuItem value={6}>6</MenuItem>
                                        <MenuItem value={7}>7</MenuItem>
                                        <MenuItem value={8}>8</MenuItem>
                                        <MenuItem value={9}>9</MenuItem>
                                        <MenuItem value={10}>10</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl className={toolbarStyles.filterFormControl} disabled={minPerformance===""} >
                                    <InputLabel shrink id="availability label">Max Performance</InputLabel>
                                    <Select
                                        id="availability select"
                                        value={maxPerformance}
                                        onChange={(e) => {setMaxPerformance(e.target.value)}}
                                        displayEmpty
                                    >
                                        {(() => {
                                            const options = [];
                                            for (let i = minPerformance; i<=10; i++) {
                                                options.push(<MenuItem value={i}>{i}</MenuItem>)
                                            }
                                            return options;
                                        }
                                        )()}
                                    </Select>
                                </FormControl>
                            </DialogContent>
                            <DialogContent className={toolbarStyles.fullDialogContent}>
                                <FormControl className={toolbarStyles.availabilityFormControl}>
                                <InputLabel shrink id="availability label">Availabilities</InputLabel>
                                <Select
                                    labelId="availability label"
                                    id="availability"
                                    multiple
                                    value={availability}
                                    onChange={(e) => {setAvailability(e.target.value)}}
                                >
                                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                                        <MenuItem key={day} value={day}>{day}</MenuItem>
                                    ))}
                                </Select>
                                </FormControl>
                            </DialogContent>
                            <DialogContent className={toolbarStyles.fullDialogContent}>
                                <FormControl className={toolbarStyles.favPositionFormControl}>
                                <InputLabel shrink id="fav position label">Favourite Position</InputLabel>
                                <Select
                                    labelId=" fav position label"
                                    id="favourite position"
                                    multiple
                                    value={favPosition}
                                    onChange={(e) => {setFavPosition(e.target.value)}}
                                >
                                    {["Skip","Second","Third","Lead"].map((position) => (
                                        <MenuItem key={position} value={position}>{position}</MenuItem>
                                    ))}
                                </Select>
                                </FormControl>
                            </DialogContent>
                            <DialogContent className={toolbarStyles.fullDialogContent}>
                                <FormControl className={toolbarStyles.preferenceFormControl}>
                                    <InputLabel shrink>Preferences</InputLabel>
                                    <Input id="preference" value={preference} onChange={(e) => {setPreference(e.target.value)}} />
                                </FormControl>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleFilterClickClose} color="primary">
                                    Go Back
                                </Button>
                            </DialogActions>
                        </Dialog>
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