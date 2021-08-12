import React, { useEffect, useState } from 'react';
import axios from 'axios';

import styles from './css/navbar.module.css';
import bodyStyles from './css/body.module.css';
import toolbarStyles from  './css/toolbar.module.css';
import mcclogo from './img/mcc-logo.png';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import profilepic from  './img/profile.png';
import { TextField } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import { ContactSupportOutlined } from '@material-ui/icons';

function placeholderAlert() {
    return alert("Unsupported");
}

function Teams() {
    const [response, setResponse] = useState({});
    const [selectedTeam, setSelectedTeam] = useState({});
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
    const [updatingTeam, setUpdatingTeam] = useState(false);
    const [expandedCardUserId, setExpandedCardUserId] = useState(-1);

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
        return (
            <div className={bodyStyles.teamsList}>
                {teamsArray.map(team => {
                    return (
                        <div style={team.id === selectedTeam.id ? {backgroundColor: 'grey', color: 'white'}: {}} className={bodyStyles.teamCard} onClick={() => setSelectedTeam(team)}>
                            <div className={bodyStyles.teamCardText}>
                                {team.teamName}
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    function renderPlayer(playerId) {
        const playerQueryResponse = {}
        axios.post(`http://128.199.253.108:8082/player/getPlayerById`, {id: playerId})
            .then(res => {
                playerQueryResponse = res;
                alert(res)
            })

        return (
            <>
                <div className={bodyStyles.playerDetails}>
                    <div className={bodyStyles.playerDetailsRow}>Performance</div>
                    <div className={bodyStyles.playerDetailsRow}>Availabilities</div>
                    <div className={bodyStyles.playerDetailsRow}>Favourite Position</div>
                    <div className={bodyStyles.playerDetailsRow}>Preference</div>
                </div>
                <div className={bodyStyles.playerDetailsButton}>
                    <button onClick={() => setExpandedCardUserId(-1)}>Less</button>
                </div>
            </>
        )
    }

    function playerCard(name, id) {
        return (
            <>
                {id === expandedCardUserId ?
                    <div className={bodyStyles.selectTeamColumnBoxCardExpanded}>
                        <div style={{width:'40%'}}  className={bodyStyles.selectTeamLeftColumn}>
                            <div className={bodyStyles.selectTeamColumnBoxCardImageExpanded}>
                                <img style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}} src={profilepic} alt="Logo" />
                            </div>
                            <div className={bodyStyles.selectTeamColumnBoxCardBody}>
                                <div style={{textAlign: 'center', width: '100%'}}>
                                    {name}
                                </div>
                            </div>
                        </div>
                        <div className={bodyStyles.selectTeamRightColumn}>
                            {renderPlayer(id)}
                        </div>
                    </div>
                    :
                    <div className={bodyStyles.selectTeamColumnBoxCard}>
                        <div className={bodyStyles.selectTeamLeftColumn}>
                            <div className={bodyStyles.selectTeamColumnBoxCardImage}>
                                <img style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}} src={profilepic} alt="Logo" />
                            </div>
                            <div className={bodyStyles.selectTeamColumnBoxCardBody}>
                                <div style={{width: '60%'}}>
                                    <div style={{marginLeft: '5%'}}>{name}</div>
                                </div>
                                <div style={{width: '40%'}}>
                                    <button onClick={() => setExpandedCardUserId(id)}>More</button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                    {/* <Card className={bodyStyles.selectTeamColumnBoxCard}>
                        <img style={{height: '60%', width: '100%', objectFit: 'contain'}} src={profilepic} alt="Logo" />
                        <CardContent>
                            <Typography className={bodyStyles.selectTeamColumnBoxCardText} gutterBottom variant="body2">
                                {name}
                            </Typography>
                        </CardContent>
                    </Card> */}
            </>
        )
    }

    function renderTeamComposition(res) {
        return (
            <>
                <div className={bodyStyles.selectTeamColumnContainer}>
                    <div className={bodyStyles.selectTeamColumnHeader}>
                        Skip
                    </div>
                    <div className={bodyStyles.selectTeamColumnBox}>
                        {playerCard(res.skipBowlerName1, res.skipBowlerId1)}
                    </div>
                    <div className={bodyStyles.selectTeamColumnBox}>
                        {playerCard(res.skipBowlerName2, res.skipBowlerId2)}
                    </div>
                    <div className={bodyStyles.selectTeamColumnBox}>
                        {playerCard(res.skipBowlerName3, res.skipBowlerId3)}
                    </div>
                    <div className={bodyStyles.selectTeamColumnBox}>
                        {playerCard(res.skipBowlerName4, res.skipBowlerId4)}
                    </div>
                </div>
                <div className={bodyStyles.selectTeamColumnContainer}>
                    <div className={bodyStyles.selectTeamColumnHeader}>
                        Third
                    </div>
                    <div className={bodyStyles.selectTeamColumnBox}>
                        {playerCard(res.thirdBowlerName1, res.thirdBowlerId1)}
                    </div>
                    <div className={bodyStyles.selectTeamColumnBox}>
                        {playerCard(res.thirdBowlerName2, res.thirdBowlerId2)}
                    </div>
                    <div className={bodyStyles.selectTeamColumnBox}>
                        {playerCard(res.thirdBowlerName3, res.thirdBowlerId3)}
                    </div>
                    <div className={bodyStyles.selectTeamColumnBox}>
                        {playerCard(res.thirdBowlerName4, res.thirdBowlerId4)}
                    </div>
                </div>
                <div className={bodyStyles.selectTeamColumnContainer}>
                    <div className={bodyStyles.selectTeamColumnHeader}>
                        Second
                    </div>
                    <div className={bodyStyles.selectTeamColumnBox}>
                        {playerCard(res.secondBowlerName1, res.secondBowlerId1)}
                    </div>
                    <div className={bodyStyles.selectTeamColumnBox}>
                        {playerCard(res.secondBowlerName2, res.secondBowlerId2)}
                    </div>
                    <div className={bodyStyles.selectTeamColumnBox}>
                        {playerCard(res.secondBowlerName3, res.secondBowlerId3)}
                    </div>
                    <div className={bodyStyles.selectTeamColumnBox}>
                        {playerCard(res.secondBowlerName4, res.secondBowlerId4)}
                    </div>
                </div>
                <div className={bodyStyles.selectTeamColumnContainer}>
                    <div className={bodyStyles.selectTeamColumnHeader}>
                        Lead
                    </div>
                    <div className={bodyStyles.selectTeamColumnBox}>
                        {playerCard(res.leadBowlerName1, res.leadBowlerId1)}
                    </div>
                    <div className={bodyStyles.selectTeamColumnBox}>
                        {playerCard(res.leadBowlerName2, res.leadBowlerId2)}
                    </div>
                    <div className={bodyStyles.selectTeamColumnBox}>
                        {playerCard(res.leadBowlerName3, res.leadBowlerId3)}
                    </div>
                    <div className={bodyStyles.selectTeamColumnBox}>
                        {playerCard(res.leadBowlerName4, res.leadBowlerId4)}
                    </div>
                </div>
            </>
        )
    }

    function handleFilterClickOpen() {
        setDialogOpen(true);
    }

    function handleFilterClickClose() {
        setDialogOpen(false);
    }

    function renderSelectTeamComponent() {
        return (
            <div className={bodyStyles.selectTeam}>
                <div className={bodyStyles.selectTeamMain}>
                    {renderTeamComposition(selectedTeam)}
                </div>
                <div className={bodyStyles.selectTeamButton}>
                    <Button variant="contained" color="primary" onClick={() => setUpdatingTeam(true)}>Update this team</Button>
                </div>
            </div>
        )
    }

    function renderSearchBarContainer() {
        return (
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
                            <InputLabel shrink id="sort label">Sort</InputLabel>
                                <Select
                                    label="Sort"
                                    id="sort"
                                    value={sort}
                                    displayEmpty
                                    onChange={(e) => {setSort(e.target.value)}}
                                >
                                    <MenuItem value={'name'}>Name</MenuItem>
                                    <MenuItem value={'recentPerformance'}>Recent Performance</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl className={toolbarStyles.filterFormControl}>
                            <InputLabel shrink id="sort order label">Sort Order</InputLabel>
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
                        {/* <DialogContent className={toolbarStyles.fullDialogContent}>
                            <FormControl className={toolbarStyles.preferenceFormControl}>
                                <InputLabel shrink>Preferences</InputLabel>
                                <Input id="preference" value={preference} onChange={(e) => {setPreference(e.target.value)}} />
                            </FormControl>
                        </DialogContent> */}
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
        )
    }

    function teamViewingMode() {
        return (
            <div className={bodyStyles.teamsBody}>
                <div className={bodyStyles.teamsListContainer}>
                    {response !== {} && response.status === 200 && renderTeams(response)}
                    {response === {} && <div>...Loading</div>}
                </div>
                {Object.keys(selectedTeam).length !== 0 && selectedTeam.consructor !== Object && renderSelectTeamComponent()}
            </div>
        )
    }

    function teamEditingMode() {
        return (
            <div>Editing mode</div>
        )
    }

    useEffect(() => {
        axios.get(`http://128.199.253.108:8082/team/getAllTeam`)
            .then(res => {
                setResponse(res);
            })
    }, [random]);

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
                    <Button variant="contained" color="primary" onClick={placeholderAlert}>Create Team</Button>
                </div>
                {updatingTeam === true && renderSearchBarContainer()}
            </div>
            {updatingTeam === false && teamViewingMode()}
            {updatingTeam === true && teamEditingMode()}
        </div>
    )
}

export default Teams;