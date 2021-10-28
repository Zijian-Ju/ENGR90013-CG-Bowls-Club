import React, { useEffect, useState } from 'react';
import Image from './Image'
import NavBar from './NavBar';
import teamsStyles from './css/teams.module.css';
import toolbarStyles from  './css/toolbar.module.css';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { API } from "./API";
import { Auth } from './Auth';

function Player(props) {
    const [response, setResponse] = useState({})
    const history = useHistory();

    function handleUserProfileClick(id) {
        history.push("/members/" + id);
    }

    useEffect(() => {
        (async function () {
            try {
                const res = await API.getPlayerById(props.player)
                if (res.status !== 200) {
                    alert("Network error, please try again later")
                }
                if (res.status === 200 && res.data.statusCode !== 200) {
                    alert(res.data.message)
                }
                if (res.status === 200 && res.data.statusCode === 200) {
                    setResponse(res);
                }
            } catch (e) {
                console.log(e)
            }
        })();
    }, [props.player]);

    if (Object.keys(response).length === 0 || response.constructor !== Object) {
        return (
            null
        )
    } else {
        return (
            <TableRow key={response.data.data.id}>
                <TableCell scope="row">
                    {response.data.data.playerName}
                </TableCell>
                <TableCell>
                    {props.position}
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
    }
}

function Row(props) {
    const [open, setOpen] = useState(false);
    const [response, setResponse] = useState({})
    const playerIds = calculatePlayerIds(props);
    const history = useHistory();

    useEffect(() => {
        (async function () {
            try {
                const res = await API.getTeamMembersPhotoURL(props.row)
                if (res.status !== 200) {
                    alert('Network error')
                } else if (res.status === 200 && res.data.statusCode === 200) {
                    setResponse(res)
                } else {
                    alert('Server error')
                }
            } catch (e) {
                console.log(e)
            }
        })();
    }, [props.row])

    function calculatePlayerIds(team) {
        var count = [];
        Object.entries(team.row).map(([key, value]) => { 
            if (key.includes("BowlerId") && value > 0) {
                count.push([key, key.replace("Id", "Name"), value])
            }
            return null;
        })
        return count
    }

    function renderPlayerIcons(team) {
        if (Object.entries(response).length === 0 || response.constructor !== Object) {
            return null;
        }
        return (
            <div className={teamsStyles.collapsedPlayerIconRow}>
                {playerIds.map(function([positionName, playerName, playerId], index) {
                    return (
                        <div key={`playerIcons${positionName}${index}`} className={teamsStyles.collapsedPlayerIcon}>
                            <Tooltip placement="top" title={team[playerName]}>
                                <div>
                                    <Image url={response.data.data[playerId]}/>
                                </div>
                            </Tooltip>
                        </div>
                    )
                })}
            </div>
        )

    }

    function renderPlayerDetailed(player) {
        var x = []
        Object.entries(player).map(([key, value]) => { 
            if (key.includes("BowlerId") && value > 0) {
                x.push([`${key.split("B")[0]} ${key.slice(-1)}`, value])
            }
            return null;
        })
        return (
            <>
                {x.map(function(player, index) {
                    return (
                        <Player key={`${player[1]}${index}`} position={player[0]} player={player[1]}></Player>
                    )
                })}
            </>
       )
    }

    function renderTeamBreakdown(team) {
        return(
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Player Name</TableCell>
                        <TableCell>Position</TableCell>
                        <TableCell>Performance</TableCell>
                        <TableCell>Availability</TableCell>
                        <TableCell>Fav. Position</TableCell>
                        <TableCell>Pref. Teammates</TableCell>
                        <TableCell/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {renderPlayerDetailed(team)}
                </TableBody>
            </Table>
        )
    }

    function editTeamRedirect(teamId) {
        history.push({pathname: `/editteam/${teamId}`, state: teamId});
        return (null)
    }

    async function deleteTeam(id) {
        try {
            const res = await API.deleteTeam(id, props.row.teamName)
            if (res.status !== 200) {
                alert("Network error, please try again later")
            }
            if (res.status === 200 && res.data.statusCode !== 200) {
                alert(res.data.message)
            }
            if (res.status === 200 && res.data.statusCode === 200) {
                alert("Team deleted")
                history.push("/teams");
                props.parentRefresh()
            }
        } catch (e) {
            console.log(e)
        }
    }
     
    return (
        <React.Fragment>
            <TableRow className={teamsStyles.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell >
                <TableCell component="th" scope="row">
                    {props.row.teamName}
                </TableCell>
                <TableCell >
                    {playerIds.length}/16
                </TableCell>
                <TableCell>
                    {renderPlayerIcons(props.row)}
                </TableCell>
                <TableCell>
                    <Button onClick={() => editTeamRedirect(props.row.id, props)}>Edit</Button>
                    <Button onClick={() => deleteTeam(props.row.id)}>Delete</Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            {renderTeamBreakdown(props.row)}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}

function Teams() {
    const [response, setResponse] = useState({});
    const [teamSearchText, setTeamSearchText] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [newTeamName, setNewTeamName] = useState("");
    const [status, setStatus] = useState("");
    const [random, setRandom] = useState(Math.random());
    const reRender = () => setRandom(Math.random());

    function handleDialogClickOpen() {
        setDialogOpen(true);
    }

    function handleDialogClickClose() {
        setDialogOpen(false);
    }

    async function createTeam() {
        if (newTeamName === "") {
            alert("Enter a valid team name");
            return;
        }
        try {
            const res = await API.createTeam(newTeamName)
            if (res.status !== 200) {
                alert("Network error, please try again later")
            }
            if (res.status === 200 && res.data.statusCode !== 200) {
                alert(res.data.message)
            }
            if (res.status === 200 && res.data.statusCode === 200) {
                alert("Team created")
            }
            handleDialogClickClose()
            reRender()
        } catch (e) {
            console.log(e)
        }
    }

    function renderSearchBarContainer() {
        return (
            <>
                <div className={toolbarStyles.newTeamContainer}>
                    <Button variant="contained" color="primary" onClick={handleDialogClickOpen}>New Team</Button>
                    <Dialog className={toolbarStyles.filterDialog} open={dialogOpen} onClose={handleDialogClickClose}>
                        <DialogTitle>Create a team</DialogTitle>
                        <DialogContent className={toolbarStyles.filterDialogContent}>
                            <FormControl style={{width: '100%'}} className={toolbarStyles.filterFormControl}>
                                <TextField style={{width: '100%', marginTop: '10px'}} variant="outlined" label="Enter Team Name" onChange={(e) => {setNewTeamName(e.target.value)}}/>
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleDialogClickClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={(e) => {createTeam()}} color="primary">
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <div className={toolbarStyles.searchBarContainer}>
                    <div style={{width: '95%'}}>
                        <TextField style={{width: '100%'}} onChange={(e) => {setTeamSearchText(e.target.value)}} variant="outlined" label="Search Team"/>
                    </div>
                </div>
            </>
        )
    }

    function renderTable() {
        return (
            <>
                <TableContainer className={teamsStyles.body} component={Paper}>
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
                                    return (<Row parentRefresh={reRender} key={team.teamName} row={team}/>)
                                }
                                return null;
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        )
    }

    useEffect(() => {
        (async function () {
            const res = await API.getAllTeams()
            if (res.status !== 200) {
                setStatus("Network error, please try again later")
            }
            if (res.status === 200 && res.data.statusCode !== 200) {
                setStatus(res.data.message)
            }
            if (res.status === 200 && res.data.statusCode === 200) {
                setStatus("...Loading")
                setResponse(res);
            }
        })();
    }, [random]);


    if (Object.keys(response).length === 0 || response.constructor !== Object) {
        return (
            <div>{status}</div>
        )
    } else {
        return (
            <div style={{height: '100vh', display: 'flex', flexFlow: 'column'}}>
                <NavBar/>
                {Auth.isLoggedIn() && (Auth.isAdmin() || Auth.isSelector()) &&
                    <div className={toolbarStyles.toolbar}>
                        {renderSearchBarContainer()}
                    </div>
                }
                <div className={teamsStyles.body}>
                    {Object.keys(response).length !== 0 && response.constructor === Object && response.status === 200 && renderTable()}
                    {Object.keys(response).length === 0 && response.constructor === Object && <div>...Loading</div>}
                </div>
            </div>
        )
    }
}

export default Teams;