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
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Login from './Login'


function placeholderAlert() {
    return alert("Unsupported");
}

function Members() {
    const [response, setResponse] = useState({});
    const [userSearchText, setUserSearchText] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [minPerformance, setMinPerformance] = useState(0);
    const [maxPerformance, setMaxPerformance] = useState(10);
    const [availability, setAvailability] = useState([]);
    const [favPosition, setFavPosition] = useState([]);
    const [sort, setSort] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    const history = useHistory();
    const [random, setRandom] = useState(Math.random());
    const reRender = () => setRandom(Math.random());

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

    function teamsHandleClick() {
        history.push("/teams")
    }

    function competitionsHandleClick() {
        history.push("/competitions")
    }

    function committeeHandleClick() {
        history.push("/committee")
    }

    useEffect(() => {
        axios.post(`http://128.199.253.108:8082/player/getAllPlayer`, {searching: {availability: availability, maxScore: maxPerformance, minScore: minPerformance, order: {direction: sortOrder, sortField: sort}, position: favPosition}})
            .then(res => {
                setResponse(res);
            })
    }, [random, availability, favPosition, maxPerformance, minPerformance, sort, sortOrder]);

    function handleFilterClickOpen() {
        setDialogOpen(true);
    }

    function handleFilterClickClose() {
        setDialogOpen(false);
    }

    function renderUsers(data) {
        const userArray = data.data.data.playerList;
        return (
            <div className={bodyStyles.allUsersContainer}>
                {userArray.map(function(user, index) { 
                    if (user.playerName.toLowerCase().includes(userSearchText.toLowerCase())) { 
                        return (
                            <div key={`userarray${user}${index}`} id={user.playerName} className={bodyStyles.userCard} onClick={() => handleUserProfileClick(user.id)}>
                                <div className={bodyStyles.userCardImageContainer}>
                                    <div className={bodyStyles.userCardImage}>
                                        <img style={{width: '100%', objectFit: 'contain'}} src={profilepic} alt="Logo" />
                                    </div>
                                    <div className={bodyStyles.userName}>
                                        {user.playerName}
                                    </div>
                                </div>
                                <div className={bodyStyles.userCardDescriptionContainer}>
                                    <div className={bodyStyles.userCardDescriptionItem}>Performance: {user.recentPerformance}</div>
                                    <div className={bodyStyles.userCardDescriptionItem}>Availability: {user.playerAvailability}</div>
                                    <div className={bodyStyles.userCardDescriptionItem}>Favourite Position: {user.playerPosPreference}</div>
                                    <div className={bodyStyles.userCardDescriptionItem}>Preference: {user.playerPreferTeammates}</div>
                                </div>
                            </div>
                        )
                    } else {
                        return null;
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
                    <Button className={styles.linkbuttons} onClick={competitionsHandleClick}>COMPETITION</Button>
                    <Button className={styles.linkbuttons} onClick={teamsHandleClick}>TEAMS</Button>
                    <Button className={styles.linkbuttons} onClick={membersHandleClick}>MEMBERS</Button>
                    <Button className={styles.linkbuttons} onClick={committeeHandleClick}>SELECTION COMMITTEE</Button>
                </div>
                <div className={styles.logout}>
                    <Login/>
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
                                <FormControl className={toolbarStyles.filterFormControl} style={{marginTop: "5%", marginRight: "10%"}}>
                                <InputLabel id="sort label">Sort</InputLabel>
                                <Select
                                    label="Sort"
                                    labelId="Sort"
                                    id="sort"
                                    value={sort}
                                    displayEmpty
                                    onChange={(e) => {setSort(e.target.value)}}
                                >
                                    <MenuItem value={'name'}>Name</MenuItem>
                                    <MenuItem value={'recentPerformance'}>Recent Performance</MenuItem>
                                </Select>
                                </FormControl>
                                <FormControl className={toolbarStyles.filterFormControl} style={{marginTop: "5%"}}>
                                <InputLabel id="sort order label">Sort Order</InputLabel>
                                    <Select
                                        label="Sort order"
                                        id="sort-order"
                                        value={sortOrder}
                                        displayEmpty
                                        onChange={(e) => {setSortOrder(e.target.value)}}
                                    >
                                        <MenuItem value={'asc'}>Ascending</MenuItem>
                                        <MenuItem value={'desc'}>Descending</MenuItem>
                                    </Select>
                                </FormControl>
                            </DialogContent>
                            <DialogContent className={toolbarStyles.filterDialogContent}>
                                <FormControl className={toolbarStyles.filterFormControl} style={{marginRight: "10%"}}>
                                <InputLabel id="min performance label">Min Performance</InputLabel>
                                    <Select
                                        label="Min Performance"
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
                                        label="Max Performance"
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
                                <InputLabel id="availability label">Availabilities</InputLabel>
                                <Select
                                    labelId="availability label"
                                    id="availability"
                                    label="Availabilities"
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
                                <InputLabel id="fav position label">Favourite Position</InputLabel>
                                <Select
                                    labelId=" fav position label"
                                    label="Favourite Position"
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
                            <DialogActions>
                                <Button onClick={handleFilterClickClose} color="primary">
                                    Go Back
                                </Button>
                                <Button onClick={() => {handleFilterClickClose(); reRender()}} color="primary">
                                    Submit
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