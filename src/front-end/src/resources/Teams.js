import React, { useEffect, useState } from 'react';
import axios from 'axios';

import styles from './css/navbar.module.css';
import teamsStyles from './css/teams.module.css';
import toolbarStyles from  './css/toolbar.module.css';
import mcclogo from './img/mcc-logo.png';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import profilepic from  './img/profile.png';
import { createGenerateClassName, TextField } from '@material-ui/core';
import bodyStyles from './css/body.module.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import Select from '@material-ui/core/Select';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';


import {KeyboardArrowDown,KeyboardArrowUp,Search,FindInPage} from '@material-ui/icons';

function placeholderAlert() {
    return alert("Unsupported");
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

    if (Object.keys(response).length !== 0 && response.constructor === Object && response.data.data !== null) {
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
        return (
            <TableRow key={'0'}>
                <TableCell component="th" scope="row">
                    ...loading
                </TableCell>
                <TableCell>
                    ...loading
                </TableCell>
                <TableCell>
                    ...loading
                </TableCell>
                <TableCell>
                    ...loading
                </TableCell>
                <TableCell>
                    ...loading
                </TableCell>
                <TableCell/>
            </TableRow>
        )
    }

}

function Row(props) {
    const [open, setOpen] = useState(false);
    const playerIds = calculatePlayerIds(props)

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
            <div className={teamsStyles.collapsedPlayerIconRow}>
                {playerIds.map(([playerId, playerName]) => (
                    <Tooltip id={playerId} className={teamsStyles.collapsedPlayerIcon} placement="top" title={team[playerName]}>
                        <img style={{objectFit: 'contain', maxHeight: '50px'}} src={profilepic} alt="Logo" />
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

    function editTeamRedirect(teamId) {
        // redirect to edit team page
        placeholderAlert();
    }

    return (
        <>
            <TableRow className={teamsStyles.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowDown /> : <KeyboardArrowDown />}
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
                    <Button onClick={() => editTeamRedirect(props.row.id)}>Edit Team</Button>
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

function Teams() {
    const [response, setResponse] = useState({});
    const [resData,setResData] = useState({})
    const [teamSearchText, setTeamSearchText] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [newTeamName, setNewTeamName] = useState("");
    // const [minPerformance, setMinPerformance] = useState(0);
    // const [maxPerformance, setMaxPerformance] = useState(10);
    // const [availability, setAvailability] = useState([]);
    // const [favPosition, setFavPosition] = useState([]);
    // const [sort, setSort] = useState("");
    // const [sortOrder, setSortOrder] = useState("");
    const history = useHistory();
    const [random, setRandom] = useState(Math.random());
    const reRender = () => setRandom(Math.random());
    const getPlayerDetail = async (team) => {
        // const res = await axios.post(`http://128.199.253.108:8082/player/getPlayerById`, {id})
        // if (res.status === 200 && res.data.statusCode === 200) {
            setResData(team);
        // }
        // console.log(res)
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

    function handleDialogClickOpen() {
        setDialogOpen(true);
    }

    function handleDialogClickClose() {
        setDialogOpen(false);
    }

    function createTeam() {
        axios.post(`http://128.199.253.108:8082/team/addTeam`, {teamName: newTeamName, leadBowlerId1: 0, leadBowlerId2: 0, leadBowlerId3:0, leadBowlerId4:0, leadBowlerName1: "", leadBowlerName2: "", leadBowlerName3: "", leadBowlerName4:"", secondBowlerId1:0, secondBowlerId2: 0, secondBowlerId3: 0, secondBowlerId4: 0, secondBowlerName1:"", secondBowlerName2:"", secondBowlerName3:"", secondBowlerName4: "", skipBowlerId1:0, skipBowlerId2: 0, skipBowlerId3: 0, skipBowlerId4:0, skipBowlerName1: "", skipBowlerName2: "", skipBowlerName3: "", skipBowlerName4:"", thirdBowlerId1:0, thirdBowlerId2:0, thirdBowlerId3:0, thirdBowlerId4:0, thirdBowlerName1:"", thirdBowlerName2:"", thirdBowlerName3: "", thirdBowlerName4:""})
            .then(res => {
                if (res.status === 200) {
                    alert("Team created")
                }
            })
            .then(x => reRender())
    }

    function renderSearchBarContainer() {
        return (
            <>
                <div className={toolbarStyles.newTeamContainer}>
                    <Button className={toolbarStyles.newTeam} onClick={handleDialogClickOpen}>New Team</Button>
                    <Dialog className={toolbarStyles.filterDialog} open={dialogOpen} onClose={handleDialogClickClose}>
                        <DialogTitle>Create a team</DialogTitle>
                        <DialogContent className={toolbarStyles.filterDialogContent}>
                            <FormControl style={{width: '100%'}} className={toolbarStyles.filterFormControl}>
                                <TextField style={{width: '100%'}} variant="outlined" label="Enter Team Name" onChange={(e) => {setNewTeamName(e.target.value)}}/>
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleDialogClickClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={() => {createTeam(); handleDialogClickClose()}} color="primary">
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <div className={toolbarStyles.searchBarContainer}>
                    <div style={{width: '50%'}}>
                        <TextField
                            style={{width: '100%',backgroundColor: '#fff'}}
                            className={toolbarStyles.input} size="small"
                            onChange={(e) => {setTeamSearchText(e.target.value)}}
                            variant="outlined"
                            placeholder="Search Team"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),}}
                        />
                    </div>
                    <Button
                        size="large"
                        className={toolbarStyles.button}
                        startIcon={<FindInPage />}
                    >
                        Filter
                    </Button>
                </div>
            </>

                /* <div className={toolbarStyles.filter}>
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
                        <DialogActions>
                            <Button onClick={handleFilterClickClose} color="primary">
                                Go Back
                            </Button>
                            <Button onClick={() => {handleFilterClickClose(); reRender()}} color="primary">
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div> */
        )
    }
    function TeamRight(props) {
        const teamList = ['skip','third','second','lead']
        const arr = [1,2,3,4]
        return <div className={teamsStyles.right}>
            {
                props.teamName && <>
                    <div className={teamsStyles.rightName}>
                        <span>{props.teamName}</span>
                        <Button color="primary" variant="contained" onClick={() => {
                            history.push({pathname: `/edit-team/${props.id}`,state: props.id})
                        }}>Edit Team</Button>
                    </div>
                    <div className={teamsStyles.rightGrid}>
                        {teamList.map(item => (<div key={item}  style={{width: '100%',textAlign: 'center'}}>
                            <div>
                                <div className={teamsStyles.rightGridTitle}>{item.replace(/\b\w+\b/g, function(word){
                                    return word.substring(0,1).toUpperCase()+word.substring(1);
                                })}</div>
                                {arr.map(i => (
                                    <div key={item+i} className={teamsStyles.rightGridItem}>
                                        <div className={bodyStyles.userCardImageContainer} style={{margin: 'auto',height: '200px',border: '1px solid #ddd',padding: '10px', borderRadius: '4px',width: '150px'}}>
                                            <div className={bodyStyles.userCardImage}>
                                                <img style={{width: '100%', objectFit: 'contain'}} src={profilepic} alt="Logo" />
                                            </div>
                                            <div style={{    position: 'relative', top: '30px'}}>
                                                {props[`${item}BowlerName${i}`]}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>))}
                    </div>
                </>
            }
        </div>
    }

    function renderTable() {
        return (
            <>
                {/* <TableContainer className={teamsStyles.body} component={Paper}>
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
                                if (team.teamName.toLowerCase().includes(teamSearchText.toLowerCase())) {
                                    return (<Row key={team.teamName} row={team}/>)
                                }
                            })}
                        </TableBody>
                    </Table>
                </TableContainer> */}
                <List className={teamsStyles.left}>
                    {response.data.data.teamList.map((team) => {
                        if (team.teamName.toLowerCase().includes(teamSearchText.toLowerCase())) {
                            return (<ListItem button key={team.teamName} onClick={() => {
                                setResData(team)}}>
                                <ListItemText className={teamsStyles.listText}>{team.teamName}</ListItemText>
                            </ListItem>)
                        }
                        return null
                    })}
                </List>
                <TeamRight {...resData}/>
            </>
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
                {renderSearchBarContainer()}
            </div>
            <div className={teamsStyles.body}>
                {Object.keys(response).length !== 0 && response.constructor === Object && response.status === 200 && renderTable()}
                {Object.keys(response).length === 0 && response.constructor === Object && <div>...Loading</div>}
            </div>
        </div>
    )
}

export default Teams;