import { useHistory } from "react-router-dom";
import styles from './css/navbar.module.css';
import Button from '@material-ui/core/Button';
import mcclogo from './img/mcc-logo.png';
import toolbarStyles from  './css/toolbar.module.css';
import teamsStyles from './css/teams.module.css';

import competitionStyles from './css/competitions.module.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import profilepic from  './img/profile.png';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';


function placeholderAlert() {
    return alert("Unsupported");
};

function isObjectEmpty(input) {
    var out = true;
    if (Object.keys(input).length !== 0 && input.constructor === Object) {
        out = false
    }
    return out;
};

function SelectTeam(props) {
    const [response, setResponse] = useState({});
    const [loading, setLoading] = useState(true);
    const [random, setRandom] = useState(Math.random());
    const reRender = () => setRandom(Math.random());

    function deleteCompetition() {
        axios.post(`http://128.199.253.108:8082/competition/deleteCompetitionById`, {id: props.comp.id})
        .then(res => {
            alert("Success")
            props.parentRefresh()
            props.resetSelectedComp({})
        })
    }

    useEffect(() => {
        axios.get(`http://128.199.253.108:8082/team/getAllTeam`)
            .then(res => {
                setResponse(res);
                setLoading(false)
            })
    }, []);

    if (loading === false) {
        return (
            <div style={{width: '100%'}}>
                <div>
                    {`Selecting a team for competition ${props.comp.competitionName} which has id:${props.comp.id}:`}
                </div>
                <div>
                    {'[Textfield to update comp name and date/day here'}
                    <Button onClick={() => deleteCompetition()}>Delete Competition</Button>
                </div>
                <TableContainer style={{width: '100%'}} component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell/>
                                <TableCell>Team</TableCell>
                                <TableCell>Members</TableCell>
                                <TableCell>Team Composition</TableCell>
                                <TableCell/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {response.data.data.teamList.map((team) => {
                                if (true) {
                                    return (<Row parentRefresh={props.parentRefresh} comp={props.comp} id={team.id} key={team.teamName} row={team}/>)
                                }
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    } else {
        return null
    }
}

function Row(props) {
    const [open, setOpen] = useState(false);
    const playerIds = calculatePlayerIds(props);
    const history = useHistory();

    console.log(props)
    
    function calculatePlayerIds(team) {
        var count = [];
        Object.entries(team.row).map(([key, value]) => { 
            if (key.includes("BowlerId") && value > 0) {
                count.push([key, key.replace("Id", "Name")])
            }
        })
        return count
    }

    function renderPlayerIcons(team) {
        return (
            <div style={{width: '100%', overflowX: 'scroll'}} className={teamsStyles.collapsedPlayerIconRow}>
                {playerIds.map(([playerId, playerName]) => (
                    <Tooltip id={`${playerId}${playerName}`} className={teamsStyles.collapsedPlayerIcon} placement="top" title={team[playerName]}>
                        <img style={{objectFit: 'contain', maxHeight: '40px'}} src={profilepic} alt="Logo" />
                    </Tooltip>
                ))}
            </div>
        )

    }

    function renderPlayerDetailed(player) {
        var x = []
        Object.entries(player).map(([key, value]) => { 
            if (key.includes("BowlerId") && value > 0) {
                x.push(value)
            }
        })
        return (
            <>
                {x.map((playerId) => (
                    <Player player={playerId}></Player>
                ))}
            </>
       )
    }

    function renderTeamBreakdown(team) {
        return(
            <Table size="small">
                <TableHead>
                    <TableCell>Player Name</TableCell>
                    <TableCell>Performance</TableCell>
                    <TableCell>Availability</TableCell>
                    <TableCell>Fav. Position</TableCell>
                    <TableCell>Pref. Teammates</TableCell>
                    <TableCell/>
                </TableHead>
                <TableBody>
                    {renderPlayerDetailed(team)}
                </TableBody>
            </Table>
        )
    } 
    
    function selectTeam(teamId) {
        axios.post(`http://128.199.253.108:8082/competition/updateCompetition`, {teamId: teamId, id: props.comp.id, competitionDays: props.comp.competitionDays, competitionName: props.comp.competitionName})
            .then(res => {
                if (res.status === 200) {
                    console.log(res)
                    alert("Success")
                    props.parentRefresh()
                }
            })
    }
    
    return (
        <>
            <TableRow className={teamsStyles.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {props.row.teamName}
                </TableCell>
                <TableCell>
                    {playerIds.length}/16
                </TableCell>
                <TableCell style={{Width: '50%'}}>
                    {renderPlayerIcons(props.row)}
                </TableCell>
                <TableCell>
                    <Button onClick={() => selectTeam(props.row.id)}>Select</Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            {renderTeamBreakdown(props.row)}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}

function Player(props) {
    const [response, setResponse] = useState({})
    const history = useHistory();
    
    function handleUserProfileClick(id) {
        history.push("/members/" + id);
    }

    useEffect(() => {
        axios.post(`http://128.199.253.108:8082/player/getPlayerById`, {id: props.player})
            .then(res => {
                if (res.status === 200 && res.data.statusCode === 200) {
                    setResponse(res);
                }
            })
    }, []);

    if (!isObjectEmpty(response) && response.data.data !== null) {
        return (
            <TableRow key={response.data.data.id}>
                <TableCell component="th" scope="row">
                    {response.data.data.playerName}
                </TableCell>
                <TableCell>
                    {response.data.data.recentPerformance}
                </TableCell>
                <TableCell>
                    {response.data.data.playerAvailability}
                </TableCell>
                <TableCell>
                    {response.data.data.playerPosPreference}
                </TableCell>
                <TableCell>
                    {response.data.data.playerPreferTeammates}
                </TableCell>
                <TableCell>
                    <Button size="small" onClick={() => handleUserProfileClick(response.data.data.id)}>View</Button>
                </TableCell>
            </TableRow>
        )
    } else {
        return null
    }
}

function Competitions() {
    const history = useHistory();
    const [random, setRandom] = useState(Math.random());
    const reRender = () => setRandom(Math.random());
    const [response, setResponse] = useState({})
    const [selectedComp, setSelectedComp] = useState({})
    const [dialogOpen, setDialogOpen] = useState(false);
    const [newCompName, setNewCompName] = useState("")
    const [newCompDay, setNewCompDay] = useState("")

    function handleDialogClickOpen() {
        setDialogOpen(true);
    }

    function handleDialogClickClose() {
        setDialogOpen(false);
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

    useEffect(() => {
        axios.post(`http://128.199.253.108:8082/competition/getAllCompetition`, {})
            .then(res => {
                setResponse(res);
            })
    }, [random]);

    function renderCompetitionList() {
        return (
            <>  
                Select:
                {response.data.data.competitionList.map((comp) => (
                    <div onClick={() => setSelectedComp(comp)} className={competitionStyles.competitionCard} id={comp.id}>
                        {comp.competitionName}
                    </div>
                ))}
            </>
        )
    }

    function getTeamByCompId(id) {
        var x = 0
        if (response.status === 200 && response.data.statusCode === 200) {
            response.data.data.competitionList.map((comp) => {
                if (comp.id == id) {
                    x = comp.teamId
                }
            })
        }
        return x;
    }

    function createNewCompetition() {
        axios.post(`http://128.199.253.108:8082/competition/addCompetition`, {competitionDay: [newCompDay], competitionDays: [newCompDay], competitionName: newCompName, teamId: 0})
            .then(res => {
                alert("success")
                reRender()
            })
    }

    function deleteCompetition() {
        axios.post(`http://128.199.253.108:8082/competition/deleteCompetitionById`, {id: selectedComp.id})
        .then(res => {
            alert("Success")
            reRender();
            setSelectedComp({})
        })
    }

    function renderTeam() {
        return (
            <div>
                <Button onClick={() => deleteCompetition()}>Delete this competition</Button>
                <div>
                    Render existing team comp with team Id {getTeamByCompId(selectedComp.id)} and competition id {selectedComp.id}
                </div> 
            </div>
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
                    <Button variant="contained" color="primary" onClick={handleDialogClickOpen}>New Competition</Button>
                    <Dialog className={toolbarStyles.filterDialog} open={dialogOpen} onClose={handleDialogClickClose}>
                        <DialogTitle>Create a competition</DialogTitle>
                        <DialogContent className={toolbarStyles.filterDialogContent}>
                            <FormControl style={{width: '100%'}} className={toolbarStyles.filterFormControl}>
                                <TextField style={{width: '100%', marginTop: '10px'}} variant="outlined" label="Enter Competition Name" onChange={(e) => {setNewCompName(e.target.value)}}/>
                            </FormControl>
                        </DialogContent>
                        <DialogContent className={toolbarStyles.fullDialogContent}>
                            <FormControl className={toolbarStyles.availabilityFormControl}>
                            <InputLabel id="competition day">Competition Day</InputLabel>
                            <Select
                                labelId="competition day label"
                                id="competition day"
                                value={newCompDay}
                                label="Competition Day"
                                onChange={(e) => {setNewCompDay(e.target.value)}}
                            >
                                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                                    <MenuItem key={day} value={day}>{day}</MenuItem>
                                ))}
                            </Select>
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleDialogClickClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={() => {createNewCompetition(); handleDialogClickClose()}} color="primary">
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
            <div className={competitionStyles.body}>
                <div className={competitionStyles.selectCompetitionContainer}>
                    {response.status === 200 && response.data.statusCode === 200 && renderCompetitionList()}
                </div>
                <div className={competitionStyles.displayCompetitionsContainer}>
                    {/* {selectedCompId === -1 ? <div>Select a team</div> : {checkIfCompHasTeam(selectedCompId) ? <RenderTeams id={selectedCompId} parentRefresh={reRender}/> : {}}} */}
                    {!isObjectEmpty(selectedComp) && getTeamByCompId(selectedComp.id) > 0 && renderTeam()}
                    {!isObjectEmpty(selectedComp) && getTeamByCompId(selectedComp.id) === 0 && <SelectTeam resetSelectedComp={setSelectedComp} comp={selectedComp} parentRefresh={reRender}/>}
                    {isObjectEmpty(selectedComp) && <div>Select a team</div>}
                </div>
            </div>
        </div>
    )
}

export default Competitions