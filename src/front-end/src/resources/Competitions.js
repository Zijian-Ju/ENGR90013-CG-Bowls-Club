import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import toolbarStyles from  './css/toolbar.module.css';
import bodyStyles from './css/body.module.css';
import teamsStyles from './css/teams.module.css';
import competitionStyles from './css/competitions.module.css'
import NavBar from './NavBar';
import React, { useEffect, useState } from 'react';
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
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import { API } from "./API";
import Image from './Image';
import { Auth } from "./Auth"

function isObjectEmpty(input) {
    var out = true;
    if (Object.keys(input).length !== 0 && input.constructor === Object) {
        out = false
    }
    return out;
};

function PlayerCard(props) {
    const history = useHistory();

    if (props.player === undefined) {
        return (
            <div style={{width: '100%', height: '110px', justifyContent: 'center', alignItems: 'center'}} className={bodyStyles.userCard}>
                Not available
            </div>
        )
    }

    if (props.player === null) {
        return (
            <div style={{width: '100%', height: '110px', justifyContent: 'center', alignItems: 'center'}} className={bodyStyles.userCard}>
                Position Open
            </div>
        )
    }

    function handleUserProfileClick(id) {
        if (Auth.isAdmin() || Auth.isSelector()) {
            history.push("/members/" + id);
        };
    }
    
    return (
        <div onClick={() => handleUserProfileClick(props.playerId)} style={{width: '100%', height: '110px'}} className={bodyStyles.userCard}>
            <div className={bodyStyles.userCardImageContainer}>
                <div className={bodyStyles.userCardImage}>
                    <Image url={props.player.photoUrl}/>
                </div>
                <div className={bodyStyles.userName}>
                    {props.player.playerName}
                </div>
            </div>
            <div className={bodyStyles.userCardDescriptionContainer}>
                <div className={bodyStyles.userCardDescriptionItem}>Performance: {props.player.recentPerformance}</div>
                <div className={bodyStyles.userCardDescriptionItem}>Availability: {props.player.playerAvailability}</div>
                <div className={bodyStyles.userCardDescriptionItem}>Favourite Position: {props.player.playerPosPreference}</div>
            </div>
        </div>
    )
}

function RenderTeam(props) {
    const [response, setResponse] = useState({})
    const [competitionName, setCompetitionName] = useState("");
    const [competitionDays, setCompetitionDays] = useState([]);
    const [newCompetitionName, setNewCompetitionName] = useState("");
    const [newCompetitionDays, setNewCompetitionDays] = useState([]);
    const [status, setStatus] = useState("")

    async function deleteCompetition() {
        try {
            const res = await API.deleteCompetition(props.comp.id)
            if (res.status !== 200) {
                alert("Network error, please try again later")
            }
            if (res.status === 200 && res.data.statusCode !== 200) {
                alert(res.data.message)
            }
            if (res.status === 200 && res.data.statusCode === 200) {
                alert("Success")
                props.parentRefresh();
                props.resetSelectedComp({})
            }
        } catch (e) {
            console.log(e);
        }
    }

    async function unassociateTeam() {
        try {
            const res = await API.unassociateTeamFromCompetition(props.comp.id, props.comp.competitionDays, props.comp.competitionName)
            if (res.status !== 200) {
                alert("Network error, please try again later")
            }
            if (res.status === 200 && res.data.statusCode !== 200) {
                alert(res.data.message)
            }
            if (res.status === 200 && res.data.statusCode === 200) {
                alert("Success")
                props.parentRefresh();
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        setCompetitionName(props.comp.competitionName);
        setCompetitionDays(props.comp.competitionDays);
        setNewCompetitionDays(props.comp.competitionDays);
        setNewCompetitionName(props.comp.competitionName);
        (async function() {
            try {
                const res = await API.getDetailedTeamById(props.teamId)
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
            } catch (e) {
                console.log(e)
            }
        })();  
    }, [props.comp, props.teamId]);

    function renderPlayerDetailed(player) {
  
        if (isObjectEmpty(player)) {
            return (
                null
            )
        }

        return (
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column'}}>
                <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'row', marginTop: '10px'}}>
                    <div style={{width: '10%', height: '100%', display: 'flex', flexDirection: 'row'}}>
                        
                    </div>
                    <div style={{width: '22.5%', height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                        Skip
                    </div>
                    <div style={{width: '22.5%', height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                        Third
                    </div>
                    <div style={{width: '22.5%', height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                        Second
                    </div>
                    <div style={{width: '22.5%', height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                        Lead
                    </div>
                </div>
                <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'row'}}>
                    <div style={{width: '10%', height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        Team 1
                    </div>
                    <div style={{width: '22.5%', height: '100%', display: 'flex', flexDirection: 'row'}}>
                        <PlayerCard player={player.skipBowlerId1}/>
                    </div>
                    <div style={{width: '22.5%', height: '100%', display: 'flex', flexDirection: 'row'}}>
                        <PlayerCard player={player.thirdBowlerId1}/>
                    </div>
                    <div style={{width: '22.5%', height: '100%', display: 'flex', flexDirection: 'row'}}>
                        <PlayerCard player={player.secondBowlerId1}/> 
                    </div>
                    <div style={{width: '22.5%', height: '100%', display: 'flex', flexDirection: 'row'}}>
                        <PlayerCard player={player.leadBowlerId1}/> 
                    </div>
                </div>
                <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'row'}}>
                    <div style={{width: '10%', height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        Team 2
                    </div>
                    <div style={{width: '22.5%', height: '100%', display: 'flex', flexDirection: 'row'}}>
                        <PlayerCard player={player.skipBowlerId2}/>
                    </div>
                    <div style={{width: '22.5%', height: '100%', display: 'flex', flexDirection: 'row'}}>
                        <PlayerCard player={player.thirdBowlerId2}/> 
                    </div>
                    <div style={{width: '22.5%', height: '100%', display: 'flex', flexDirection: 'row'}}>
                        <PlayerCard player={player.secondBowlerId2}/> 
                    </div>
                    <div style={{width: '22.5%', height: '100%', display: 'flex', flexDirection: 'row'}}>
                        <PlayerCard player={player.leadBowlerId2}/> 
                    </div>
                </div>
                <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'row'}}>
                    <div style={{width: '10%', height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        Team 3
                    </div>
                    <div style={{width: '22.5%', height: '100%', display: 'flex', flexDirection: 'row'}}>
                        <PlayerCard player={player.skipBowlerId3}/>
                    </div>
                    <div style={{width: '22.5%', height: '100%', display: 'flex', flexDirection: 'row'}}>
                        <PlayerCard player={player.thirdBowlerId3}/>
                    </div>
                    <div style={{width: '22.5%', height: '100%', display: 'flex', flexDirection: 'row'}}>
                        <PlayerCard player={player.secondBowlerId3}/> 
                    </div>
                    <div style={{width: '22.5%', height: '100%', display: 'flex', flexDirection: 'row'}}>
                        <PlayerCard player={player.leadBowlerId3}/> 
                    </div>
                </div>
                <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'row'}}>
                    <div style={{width: '10%', height: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        Team 4
                    </div>
                    <div style={{width: '22.5%', height: '100%', display: 'flex', flexDirection: 'row'}}>
                        <PlayerCard player={player.skipBowlerId4}/>
                    </div>
                    <div style={{width: '22.5%', height: '100%', display: 'flex', flexDirection: 'row'}}>
                        <PlayerCard player={player.thirdBowlerId4}/> 
                    </div>
                    <div style={{width: '22.5%', height: '100%', display: 'flex', flexDirection: 'row'}}>
                        <PlayerCard player={player.secondBowlerId4}/> 
                    </div>
                    <div style={{width: '22.5%', height: '100%', display: 'flex', flexDirection: 'row'}}>
                        <PlayerCard player={player.leadBowlerId4}/> 
                    </div>
                </div>
            </div>
       )
    }

    async function changeCompetition() {
        if (competitionName === newCompetitionName && competitionDays === newCompetitionDays) {
            alert("No changes detected")
            return null
        } else {
            try {
                const res = await API.updateCompetition(props.comp.teamId, props.comp.id, newCompetitionDays, newCompetitionName)
                if (res.status !== 200) {
                    alert("Network error, please try again later")
                }
                if (res.status === 200 && res.data.statusCode !== 200) {
                    alert(res.data.message)
                }
                if (res.status === 200 && res.data.statusCode === 200) {
                    alert("Success")
                    setCompetitionName(newCompetitionName)
                    setCompetitionDays(newCompetitionDays)
                    props.parentRefresh()
                }
            } catch (e) {
                console.log(e)
            }
        }
    }

    if (Object.keys(response).length === 0 || response.constructor !== Object) {
        return (
            <div>{status}</div>
        )
    } else {
        return (
            <div className={competitionStyles.renderTeamContainer}>
                <div className={competitionStyles.renderTeamControlsContainer}>
                    <div className={competitionStyles.renderTeamsControlsTextfield}>
                        <div className={competitionStyles.renderTeamControlsTextfieldInput}>
                            <div className={competitionStyles.renderTeamsControlsTextfieldBox}>
                                <TextField
                                    style={{width: '95%'}}
                                    disabled={!(Auth.isAdmin() || Auth.isSelector())}
                                    id="standard-basic" 
                                    size="small"
                                    label="Competition Name"
                                    value={newCompetitionName}
                                    onChange={(e) => setNewCompetitionName(e.target.value)}
                                />
                            </div>
                            <div className={competitionStyles.renderTeamsControlsTextfieldBox}>
                                <FormControl style={{width: '95%'}}>
                                    <InputLabel shrink id="competition day label">Competition Days</InputLabel>
                                    <Select
                                        disabled={!(Auth.isAdmin() || Auth.isSelector())}
                                        size = "small"
                                        id="competition days"
                                        label="Competition Days"
                                        multiple
                                        value={newCompetitionDays}
                                        onChange={(e) => {setNewCompetitionDays(e.target.value)}}
                                    >
                                        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                                            <MenuItem id={`competitiondays${day}`} key={day} value={day}>{day}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div>
                            {(Auth.isAdmin() || Auth.isSelector()) && <Button onClick={() => changeCompetition()}>Save</Button>}
                        </div>
                    </div>
                    {(Auth.isAdmin() || Auth.isSelector()) &&
                        <div className={competitionStyles.renderTeamsControlsButtons}>
                            <div style={{width: '100%', textAlign: 'center'}}>
                                Team Id {props.teamId} and competition id {props.comp.id}
                            </div>
                            <div style={{width: '100%'}}>
                                <Button style={{width: '50%'}} onClick={() => deleteCompetition()}>Delete this competition</Button>
                                <Button style={{width: '50%'}}onClick={() => unassociateTeam()}>Unassociate team</Button>
                            </div>
                        </div>
                    }
                </div>
                <div style={{width: '100%', height: '100%'}}>
                    {!isObjectEmpty(response) && response.data.data !== null && renderPlayerDetailed(response.data.data)}
                </div> 
            </div>
        )
    }
}

function SelectTeam(props) {
    const [response, setResponse] = useState({});
    const [status, setStatus] = useState("");
    const [competitionName, setCompetitionName] = useState("");
    const [competitionDays, setCompetitionDays] = useState([]);
    const [newCompetitionName, setNewCompetitionName] = useState("");
    const [newCompetitionDays, setNewCompetitionDays] = useState([]);

    async function changeCompetition() {
        if (competitionName === newCompetitionName && competitionDays === newCompetitionDays) {
            alert("No changes detected")
            return null
        } else {
            try {
                const res = API.updateCompetition(props.comp.teamId, props.comp.id, newCompetitionDays, newCompetitionName)
                if (res.status !== 200) {
                    alert("Network error, please try again later")
                }
                if (res.status === 200 && res.data.statusCode !== 200) {
                    alert(res.data.message)
                }
                if (res.status === 200 && res.data.statusCode === 200) {
                    alert("Success")
                    setCompetitionName(newCompetitionName)
                    setCompetitionDays(newCompetitionDays)
                    props.parentRefresh()
                }
            } catch (e) {
                console.log(e)
            }
        }
    }

    async function deleteCompetition() {
        try {
            const res = await API.deleteCompetition(props.comp.id)
            if (res.status !== 200) {
                alert("Network error, please try again later")
            }
            if (res.status === 200 && res.data.statusCode !== 200) {
                alert(res.data.message)
            }
            if (res.status === 200 && res.data.statusCode === 200) {
                alert("Success")
                props.parentRefresh()
                props.resetSelectedComp({})
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        setCompetitionName(props.comp.competitionName);
        setCompetitionDays(props.comp.competitionDays);
        setNewCompetitionDays(props.comp.competitionDays);
        setNewCompetitionName(props.comp.competitionName);
        (async function () {
            try {
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
            } catch (e) {
                console.log(e)
            }
        })();
    }, [props.comp]);

    if (Object.keys(response).length === 0 || response.constructor !== Object) {
        return (
            <div>{status}</div>
        )
    } else if (!(Auth.isAdmin() || Auth.isSelector())) {
        return (
            <div style={{flex: 1, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>No team selected for this competition, please check back later</div>
        )
    } else {
        return (
            <div style={{width: '100%'}}>
                <div className={competitionStyles.renderTeamControlsContainer}>
                    <div className={competitionStyles.renderTeamsControlsTextfield}>
                        <div className={competitionStyles.renderTeamControlsTextfieldInput}>
                            <div className={competitionStyles.renderTeamsControlsTextfieldBox}>
                                <TextField
                                    disabled={!(Auth.isAdmin() || Auth.isSelector())}
                                    style={{width: '95%'}}
                                    id="standard-basic" 
                                    size="small"
                                    label="Competition Name"
                                    value={newCompetitionName}
                                    onChange={(e) => setNewCompetitionName(e.target.value)}
                                />
                            </div>
                            <div className={competitionStyles.renderTeamsControlsTextfieldBox}>
                                <FormControl style={{width: '95%'}}>
                                    <InputLabel shrink id="competition day label">Competition Days</InputLabel>
                                    <Select
                                        disabled={!(Auth.isAdmin() || Auth.isSelector())}
                                        size = "small"
                                        id="competition days"
                                        label="Competition Days"
                                        multiple
                                        value={newCompetitionDays}
                                        onChange={(e) => {setNewCompetitionDays(e.target.value)}}
                                    >
                                        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                                            <MenuItem id={`competitiondays${day}`} key={day} value={day}>{day}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div>
                            <Button onClick={() => changeCompetition()}>Save</Button>
                        </div>
                    </div>
                    <div className={competitionStyles.renderTeamsControlsButtons}>
                        <div style={{width: '100%', textAlign: 'center'}}>
                            Selecting for {props.comp.competitionName} (id:{props.comp.id})
                        </div>
                        <div style={{width: '100%'}}>
                            <Button style={{width: '100%'}} onClick={() => deleteCompetition()}>Delete this competition</Button>                        </div>
                    </div>
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
                                return (<Row parentRefresh={props.parentRefresh} comp={props.comp} id={team.id} key={`selectTeamRender${team.teamName}`} row={team}/>)
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}

function Row(props) {
    const [open, setOpen] = useState(false);
    const playerIds = calculatePlayerIds(props);
    const [response, setResponse] = useState({})

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
                x.push(value)
            }
            return null
        })
        return (
            <>
                {x.map((playerId) => (
                    <Player key={`renderdetailed${playerId}`} player={playerId}></Player>
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
    
    async function selectTeam(teamId) {
        try {
            const res = await API.updateCompetition(teamId, props.comp.id, props.comp.competitionDays, props.comp.competitionName);
            if (res.status !== 200) {
                alert("Network error, please try again later")
            }
            if (res.status === 200 && res.data.statusCode !== 200) {
                alert(res.data.message)
            }
            if (res.status === 200 && res.data.statusCode === 200) {
                alert("Success")
                props.parentRefresh()
            }
        } catch (e) {
            console.log(e)
        }
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
    const [status, setStatus] = useState("");
    const [loaded, setLoaded] = useState(false)
    const history = useHistory();
    const playerId = props.player

    function handleUserProfileClick(id) {
        history.push("/members/" + id);
    }

    useEffect(() => {
        (async function () {
            try {
                const res = await API.getPlayerById(playerId)
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
                setLoaded(true)
            } catch (e) {
                console.log(e)
            }
        })();
    }, [playerId]);

    if (loaded && !isObjectEmpty(response) && response.data.data !== null) {
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
    } else if (loaded) {
        return (
            <TableRow>
                <TableCell>
                    N/A
                </TableCell>
                <TableCell>
                    N/A
                </TableCell>
                <TableCell>
                    N/A
                </TableCell>
                <TableCell>
                    N/A
                </TableCell>
                <TableCell>
                    {`${status}`}
                </TableCell>
                <TableCell/>
            </TableRow>
        )
    } else {
        return null;
    }
}

function Competitions() {
    const [random, setRandom] = useState(Math.random());
    const reRender = () => setRandom(Math.random());
    const [response, setResponse] = useState({})
    const [selectedComp, setSelectedComp] = useState({})
    const [dialogOpen, setDialogOpen] = useState(false);
    const [newCompName, setNewCompName] = useState("")
    const [newCompDay, setNewCompDay] = useState("")
    const [status, setStatus] = useState("");

    function handleDialogClickOpen() {
        setDialogOpen(true);
    }

    function handleDialogClickClose() {
        setDialogOpen(false);
    }

    useEffect(() => {
        (async function () {
            try {
                const res = await API.getAllCompetitions()
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
            } catch (e) {
                console.log(e)
            }
        })();
    }, [random]);

    function renderCompetitionList() {
        return (
            <>  
                {response.data.data.competitionList.map((comp) => (
                    <div onClick={() => {setSelectedComp(comp); reRender()}} className={competitionStyles.competitionCard} key={`rendercomplist${comp.id}`}>
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
                if (comp.id === id) {
                    x = comp.teamId
                }
                return null;
            })
        }
        return x;
    }

    async function createNewCompetition() {
        if (newCompName==="" || newCompDay==="") {
            alert("Please fill all fields")
            return;
        }
        try {
            const res = await API.createNewCompetition([newCompDay], [newCompDay], newCompName)
            if (res.status !== 200) {
                alert("Network error, please try again later")
            }
            if (res.status === 200 && res.data.statusCode !== 200) {
                alert(res.data.message)
            }
            if (res.status === 200 && res.data.statusCode === 200) {
                alert("Success")
                reRender()
                setSelectedComp({})
            }
        } catch (e) {
            console.log(e)
        }
    }

    function toolbar() {
        return (
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
                                    <MenuItem id={day} key={`dialogcompday${day}`} value={day}>{day}</MenuItem>
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
        )
    }

    function body() {
        if (Object.keys(response).length === 0 || response.constructor !== Object) {
            return (
                <div>{status}</div>
            )
        } else {
            return (
                <>
                    {(Auth.isAdmin() || Auth.isSelector()) && toolbar()}
                    <div className={competitionStyles.body}>
                        <div className={competitionStyles.selectCompetitionContainer}>
                            {response.status === 200 && response.data.statusCode === 200 && renderCompetitionList()}
                        </div>
                        <div className={competitionStyles.displayCompetitionsContainer}>
                            {!isObjectEmpty(selectedComp) && getTeamByCompId(selectedComp.id) > 0 && <RenderTeam key={`renderTeamfor${selectedComp}`} comp={selectedComp} teamId={getTeamByCompId(selectedComp.id)} resetSelectedComp={setSelectedComp} parentRefresh={reRender}/>}
                            {!isObjectEmpty(selectedComp) && getTeamByCompId(selectedComp.id) === 0 && <SelectTeam key={`selectTeamfor${selectedComp}`} resetSelectedComp={setSelectedComp} comp={selectedComp} parentRefresh={reRender}/>}
                            {isObjectEmpty(selectedComp) && <div style={{flex: 1, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Select a team</div>}
                        </div>
                    </div>
                </>
            )
        }
    }

    return (
        <div style={{height: '100vh', display: 'flex', flexFlow: 'column'}}>
            <NavBar/>
            {body()}
        </div>
    )
}

export default Competitions