import React, { useEffect, useState } from 'react';
import styles from './css/navbar.module.css';
import profileStyles from './css/profile.module.css';
import mcclogo from './img/mcc-logo.png';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import profilepic from  './img/profile.png';
import axios from 'axios';
import { useParams } from "react-router-dom";
import NativeSelect from '@material-ui/core/NativeSelect';
import { Line } from 'react-chartjs-2';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Input from "@material-ui/core/Input";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import Tooltip from '@material-ui/core/Tooltip';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Login from './Login'


function CustomTableRow(props) {
  const [season, setSeason] = useState(props.data.season);
  const [date, setDate] = useState(props.data.matchTime);
  const [competitionId, setCompetitionId] = useState(props.data.competitionId)
  const [competitionName, setCompetitionName] = useState(props.data.competitionName)
  const [position, setPosition] = useState(props.data.position);
  const [performance, setPerformance] = useState(props.data.performanceScore)
  const [editing, setEditing] = useState(false);
  const [deleted, setDeleted] = useState(false)
  const history = useHistory()
  console.log(props.data.competitionId)
  console.log(props.competitions)

  function resetFields() {
    setSeason(props.data.season);
    setDate(props.data.matchTime);
    setCompetitionId(props.data.competitionId);
    setCompetitionName(props.data.competitionName)
    setPosition(props.data.position);
    setPerformance(props.data.performanceScore);
  }

  function deletePerformance() {
    axios.post(`http://128.199.253.108:8082/player/deleteMatchPerformanceById`, {competitionId: props.data.competitionId, id: props.data.id, matchTime: date, performanceScore: performance, playerId: props.data.playerId})
      .then(res => {
        if (res.status === 200) {
          alert("Success")
          props.performanceUpdate()
          props.performanceTableUpdate()
          history.go(0)
        }
      })
  }

  function updatePerformance() {
    axios.post(`http://128.199.253.108:8082/player/updateMatchPerformance`, {competitionId: competitionId, competitionName: competitionName, id: props.data.id, matchTime: date, performanceScore: performance, playerId: props.data.playerId, position: position, season: season})
      .then(res => {
        if (res.status === 200) {
          alert("Success")
          alert(JSON.stringify(res))
          props.performanceUpdate()
          history.go(0)
        }
      })
  }

  if (deleted === true) {
    return null;
  }

  return (
    <TableRow style={{height: '50px'}}>
      <TableCell component="th" scope="row">
        <Input style={editing ? {border: '1px solid #cccccc', borderRadius: '5px'} : {}} disabled={!editing} onChange={(e) => setSeason(e.target.value)} disableUnderline value={season}/>
      </TableCell>
      <TableCell>
        <Input style={editing ? {border: '1px solid #cccccc', borderRadius: '5px'} : {}} disabled={!editing} onChange={(e) => setDate(e.target.value)} disableUnderline value={date}/>
      </TableCell>
      <TableCell>
        <Input disabled value={competitionName}/>
        {/* <NativeSelect
          id="competition"
          disabled={!editing}
          onChange={(e) => {setCompetitionId(JSON.parse(e.target.value).id); setCompetitionName(JSON.parse(e.target.value).name)}}
          label="Competition"
          style={{minWidth: '200px'}}
          disableUnderline={!editing}
        >
          <option key={`rowcompetitionlist${competitionName}${competitionId}`} value={JSON.stringify({id: competitionId, name: competitionName})}>{`${competitionName} (#${competitionId})`}</option>
          {props.competitions.status === 200 && props.competitions.data.statusCode === 200 &&
            props.competitions.data.data.competitionList.map(function(comp,index) {
              return (
                <option key={`rowcompetitionlist${comp}${index}`} value={JSON.stringify({id: comp.id, name:comp.competitionName})}>{`${comp.competitionName} (#${comp.id})`}</option>
              )
            })
          }
        </NativeSelect> */}
      </TableCell>
      <TableCell>
        <Input style={editing ? {border: '1px solid #cccccc', borderRadius: '5px'} : {}} disabled={!editing} onChange={(e) => setPosition(e.target.value)}  disableUnderline value={position}/>
      </TableCell>
      <TableCell>
        <Input style={editing ? {border: '1px solid #cccccc', borderRadius: '5px'} : {}} disabled={!editing} onChange={(e) => setPerformance(e.target.value)}  disableUnderline value={performance}/>
      </TableCell>
      <TableCell style={{width: '120px'}} align="right">
        {editing ? 
          <>
            <Tooltip placement="top" title={"Save"}>
              <CheckCircleIcon className={profileStyles.tickIcon} onClick={() => {updatePerformance(); setEditing(false)}} fontSize="large"/>
            </Tooltip>
            <Tooltip placement="top" title={"Delete Record"}>
              <CancelIcon className={profileStyles.cancelIcon} onClick={() => {deletePerformance(); setEditing(false); setDeleted(true)}} fontSize="large"/>
            </Tooltip>
            <Tooltip placement="top" title={"Undo"}>
              <SettingsBackupRestoreIcon className={profileStyles.undoIcon} onClick={() => {resetFields(); setEditing(false)}} fontSize="large"/>
            </Tooltip>
          </>
          : 
          <Button onClick={() => setEditing(true)} size="small">Edit</Button>
        }
      </TableCell>
    </TableRow>
  )
}

function LineChartControl(props) {
  const [response, setResponse] = useState({});
  const [year, setYear] = useState("");
  const [competition, setCompetition] = useState("");

  useEffect(() => {
    axios.post(`http://128.199.253.108:8082/competition/getAllCompetition`, {})
    .then((res) => {
      if (res.status === 200 && res.data.statusCode === 200) {
        setResponse(res)
      }
    })
  },[props.updateVar]);

  return (
    <div className={profileStyles.performanceGraphContainer}>
      <div className={profileStyles.chartControlContainer}>
        <FormControl style={{minWidth: '300px', marginRight: '5%'}}>
          <InputLabel id="demo-simple-select-label">Year</InputLabel>
          <Select
            id="competition year"
            label="Year"
            value={year}
            onChange={(e) => {setYear(e.target.value)}}
            size="small"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={2019}>2019</MenuItem>
            <MenuItem value={2020}>2020</MenuItem>
            <MenuItem value={2021}>2021</MenuItem>
          </Select>
        </FormControl>
        <FormControl style={{minWidth: '300px'}}>
          <InputLabel id="age-native-label-placeholder">Competition</InputLabel>
          <Select
            label="Competition"
            id="competition"
            value={competition}
            onChange={(e) => {setCompetition(e.target.value)}}
            size="small"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {response.status === 200 && response.data.statusCode === 200 &&
              response.data.data.competitionList.map(function(comp, index) {
                return (
                  <MenuItem key={`compdropdown${comp}${index}`} value={comp.id}>{`${comp.competitionName} (#${comp.id})`}</MenuItem>
                )
              })
            }
          </Select>
        </FormControl>
      </div>
      <div className={profileStyles.chartContainer}>
        {competition !== "" && year !== "" && <LineChart performanceVar={props.performanceVar} playerId={props.playerId} compId={competition} year={year}/>}
      </div>
    </div>
    
  )
}

function LineChart(props) {
  const [loaded, setLoaded] = useState(false)
  const [yData, setYData] = useState([])

  useEffect(() => {
    axios.post(`http://128.199.253.108:8082/player/getUserPerformancesByFilter`, {paging: {currentPage: 0, pageSize: 0, total:0}, searching: {competitionId: props.compId, season: props.year, playerId: props.playerId}})
    .then((res) => {
      if (res.status === 200 & res.data.statusCode === 200) {
        console.log(res)
        setLoaded(true)
        const temp = res.data.data.performanceList.map((aPerformance) => {
          return (aPerformance.performanceScore)
        });
        setYData(temp);
      }
    })
  },[props.playerId, props.year, props.compId, props.performanceVar]);
  
  const xData = Array.from(Array(10).keys())
    const data = {
      labels: xData,
      datasets: [
        {
          label: 'Performance',
          data: yData,
          fill: false,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgba(255, 99, 132, 0.2)',
        },
      ],
    };

  
  if (loaded) {
    return (
      <Line className={profileStyles.chart} data={data}/>
    )
  } else {
    return (
      <>
        ...Loading
      </>
    )
  }
}

function Details(props) {

  const [response, setResponse] = useState({});
  const [editableFields, setEditableFields] = useState({});
  const [editing, setEditing] = useState(false);
  const playerId = props.playerId;
  const [random, setRandom] = useState(Math.random());
  const reRender = () => {setRandom(Math.random())};
  
  function objectNotEmpty(obj) {
    if (Object.keys(obj).length !== 0 && obj.constructor === Object) {
      return true
    } else {
      return false;
    }
  }

  function updatePlayer() {
    const additionalProps = {id: playerId, photoUrl: response.data.data.photoUrl, playerEmail: response.data.data.playerEmail, playerGender: response.data.data.playerGender, playerPhone: response.data.data.playerPhone, playerName: response.data.data.playerName, recentPerformance: response.data.data.recentPerformance}
    axios.post(`http://128.199.253.108:8082/player/updatePlayer`, {...editableFields, ...additionalProps})
    .then(res => {
      if (res.status === 200) {
        alert("Saved")
      }
      setEditing(false);
    })
  }

  useEffect(() => {
    axios.post(`http://128.199.253.108:8082/player/getPlayerById`, {id: playerId})
    .then((res) => {
      if (res.status === 200 && res.data.statusCode === 200) {
        setResponse(res)
        setEditableFields({playerAvailability: res.data.data.playerAvailability, playerPosPreference: res.data.data.playerPosPreference, playerPreferTeammates: res.data.data.playerPreferTeammates, playerNotPreferTeammates: res.data.data.playerNotPreferTeammates})
      }
    })
  }, [playerId, random])

  if (objectNotEmpty(response)) {
    return (
      <div style={{height: '100%', width: '100%'}}>
        <div className={profileStyles.playerDetailsImage}>
          <img style={{margin: '2.5%', objectFit: 'contain', height: '90%'}} src={profilepic} alt="Logo" />
        </div>
        <div className={profileStyles.playerDetailsName}>
          {response.data.data.playerName}
        </div>
        <div className={profileStyles.playerDetailsFields}>
          <TextField
            style={{margin: '3%', width: '94%'}}
            disabled
            id="Recent Performance"
            label="Recent Performance"
            variant="outlined"
            size="small"
            value={response.data.data.recentPerformance}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            style={{margin: '3%', width: '94%'}}
            id="Availability"
            label="Availability"
            variant="outlined"
            onChange={(e) => {setEditableFields(prevState => ({...editableFields, playerAvailability: e.target.value}))}}
            disabled={!editing}
            size="small"
            value={editableFields.playerAvailability}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            style={{margin: '3%', width: '94%'}}
            id="Favourite Position"
            label="Favourite Position"
            variant="outlined"
            onChange={(e) => {setEditableFields(prevState => ({...editableFields, playerPosPreference: e.target.value}))}}
            disabled={!editing}
            size="small"
            value={editableFields.playerPosPreference}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            style={{margin: '3%', width: '94%'}}
            id="Preferred Teammates"
            label="Preferred Teammates"
            variant="outlined"
            onChange={(e) => {setEditableFields(prevState => ({...editableFields, playerPreferTeammates: e.target.value}))}}
            disabled={!editing}
            size="small"
            value={editableFields.playerPreferTeammates}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            style={{margin: '3%', width: '94%'}}
            id="Not Preferred Teammates"
            label="Not Preferred Teammates"
            variant="outlined"
            onChange={(e) => {setEditableFields(prevState => ({...editableFields, playerNotPreferTeammates: e.target.value}))}}
            disabled={!editing}
            size="small"
            value={editableFields.playerNotPreferTeammates}
            InputLabelProps={{
              shrink: true,
            }}
          />
          {editing === false && <Button onClick={() => {setEditing(true)}}>Edit</Button>}
          {editing === true && 
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
              <Button onClick={() => {setEditing(false); updatePlayer()}}>Save</Button>
              <Button onClick={() => {setEditing(false); reRender()}}>Cancel</Button>
            </div>
          }
        </div>
      </div>
    )
  } else {
    return <div style={{height: '100%'}}>...Loading</div>
  }

}

function PerformanceControl(props) {
  const [performanceResponse, setPerformanceResponse] = useState({});
  const [competitionResponse, setCompetitionResponse] = useState({});
  const playerId = props.playerId
  const [random, setRandom] = useState(Math.random());
  const reRender = () => {setRandom(Math.random())};
  const [dialogOpen, setDialogOpen] = useState(false);
  const history = useHistory()

  const [createPerformance, setCreatePerformance] = useState("");
  const [createDate, setCreateDate] = useState("2020-01-01T00:00:00.00Z");
  const [createSeason, setCreateSeason] = useState("");
  const [createPosition, setCreatePosition] = useState("")
  const [createCompetition, setCreateCompetition] = useState("")

  function objectNotEmpty(obj) {
    if (Object.keys(obj).length !== 0 && obj.constructor === Object) {
      return true
    } else {
      return false;
    }
  }

  function handleDialogClickOpen() {
    setDialogOpen(true);
}

  function handleDialogClickClose() {
      setDialogOpen(false);
  }

  function performanceTable() {
    return (
      <TableContainer style={{border: "1px solid white"}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Season</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Competition</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Performance</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" size="small" onClick={handleDialogClickOpen}>Add New</Button>
                <Dialog open={dialogOpen} onClose={handleDialogClickClose}>
                <DialogTitle>Adding a performance result</DialogTitle>
                  <DialogContent>
                      <FormControl style={{width: '48%', marginTop: '5%', margin:'1%'}}>
                          <InputLabel shrink>Season</InputLabel>
                          <NativeSelect
                            id="season"
                            value={createSeason}
                            onChange={(e) => {setCreateSeason(e.target.value)}}
                            inputProps={{name:'Season'}}
                            variant="outlined"
                          >
                            <option aria-label="None" value="" />
                            <option value={2019}>2019</option>
                            <option value={2020}>2020</option>
                            <option value={2021}>2021</option>
                          </NativeSelect>
                      </FormControl>
                      <FormControl style={{width: '48%', marginTop: '5%', margin:'1%'}}>
                          <TextField defaultValue={createDate} id="datetime-local" InputLabelProps={{shrink: true}} onChange={(e) => setCreateDate(e.target.value)} label="Date"/>   
                      </FormControl>
                      <FormControl style={{width: '48%', margin:'1%'}}>
                          <InputLabel shrink>Position</InputLabel>
                          <NativeSelect
                            id="season"
                            value={createPosition}
                            onChange={(e) => {setCreatePosition(e.target.value)}}
                            inputProps={{name:'Year'}}
                            variant="outlined"
                          >
                            <option aria-label="None" value="" />
                            <option value={"Skip"}>Skip</option>
                            <option value={"Lead"}>Lead</option>
                            <option value={"First"}>First</option>
                            <option value={"Second"}>Second</option>
                          </NativeSelect>
                      </FormControl>
                      <FormControl style={{width: '48%', margin:'1%'}}>
                          <InputLabel shrink>Competition</InputLabel>
                          <NativeSelect
                            id="competition"
                            onChange={(e) => {setCreateCompetition(e.target.value)}}
                            label="Competition"
                            variant="outlined"
                          >
                            <option aria-label="None" value="" />
                            {competitionResponse.status === 200 && competitionResponse.data.statusCode === 200 &&
                              competitionResponse.data.data.competitionList.map(function(comp, index) {
                                return (
                                  <option key={`profilecompetitionist${comp}${index}`} value={JSON.stringify({id: comp.id, name: comp.competitionName})}>{comp.competitionName}</option>
                                )
                              })
                            }
                          </NativeSelect>
                      </FormControl>
                      <FormControl style={{width: '48%', margin:'1%'}}>
                          <InputLabel shrink>Performance</InputLabel>
                          <Input onChange={(e) => setCreatePerformance(e.target.value)} id="Performance" />
                      </FormControl>
                  </DialogContent>
                  <DialogActions>
                      <Button onClick={handleDialogClickClose} color="primary">
                          Go Back
                      </Button>
                      <Button onClick={() => {dialogSubmit(); handleDialogClickClose()}} color="primary">
                          Submit
                      </Button>
                  </DialogActions>
                </Dialog>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {performanceResponse.data.data.performanceList.length === 0 ? <div>No data.</div> :
            performanceResponse.data.data.performanceList.map(function(row, index) {
              return (
                <CustomTableRow key={`customtablerow${row}${index}`} performanceTableUpdate={reRender} performanceUpdate={props.performanceUpdate} competitions={competitionResponse} data={row}/>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  function dialogSubmit() {
    return (
      axios.post(`http://128.199.253.108:8082/player/addMatchPerformance`, {competitionId: JSON.parse(createCompetition).id, competitionName:JSON.parse(createCompetition).name, matchTime: createDate, performanceScore: createPerformance, playerId: playerId, position: createPosition, season: createSeason})
      .then(res => {
        if (res.status === 200) {
          alert("Performance created"); 
          props.performanceUpdate()
          reRender()
          history.go(0)
        }
      })
    )
  }

  useEffect(() => {
    const post1 = axios.post(`http://128.199.253.108:8082/player/getUserPerformances`, {paging: {currentPage: 0, pageSize: 0, total:0}, searching: {playerId: playerId}})
    const post2 = axios.post(`http://128.199.253.108:8082/competition/getAllCompetition`, {});
    axios.all([post1, post2])
    .then(axios.spread(function(res1, res2) {
      if (res1.status === 200 & res1.data.statusCode === 200) {
        setPerformanceResponse(res1)
      }
      if (res2.status === 200 & res2.data.statusCode === 200) {
        setCompetitionResponse(res2)
      }
    }))
  }, [playerId, random, props.updateVar])

  if (objectNotEmpty(performanceResponse)) {
    return (
      <>
        {performanceTable()}
      </>
    )
  } else {
    return <div>...Loading</div>
  }
}

function Performances(props) {
  const id = props.playerId;
  const [random, setRandom] = useState(Math.random());
  const reRender = () => {setRandom(Math.random())};

  return (
    <>
      <LineChartControl performanceVar={random} playerId={id}/>
      <div className={profileStyles.performanceRecordsContainer}>
        <PerformanceControl performanceUpdate={reRender} playerId={id}/>
      </div>
    </>
  )
}

function Profile() {
  const history = useHistory();
  const { id } = useParams();

  function placeholderAlert() {
    return alert("Unsupported");
  }; 

  function membersHandleClick() {
    history.push("/members");
  };

  function homeHandleClick() {
    history.push("/home");
  }

  function teamsHandleClick() {
    history.push("/teams")
  };

  function competitionsHandleClick() {
    history.push("/competitions")
  }

  function committeeHandleClick() {
    history.push("/committee")
  }

  function deletePlayer() {
    axios.post(`http://128.199.253.108:8082/player/deletePlayerById`, {id: id})
    .then(res => {
      if (res.status === 200) {
        alert("Player deleted"); 
        history.push('/members');
      }
    })
  };

  return (
    <div style={{height: '100vh', display: 'flex', flexFlow: 'column'}}>
      <div className={styles.body}>
          <div className={styles.logotext} >
              <img className={styles.mcclogo} src={mcclogo} onClick={homeHandleClick} alt="Logo" />
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
      <div className={profileStyles.body}>
        <div className={profileStyles.playerDetailsColumn}>
          <div className={profileStyles.playerDetailsEditContainer}>
            <Details playerId={id}/>
          </div>
          <div className={profileStyles.playerDetailsDeleteContainer}>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Button onClick={() => {deletePlayer()}}>Delete Player</Button>
            </div>
          </div>
        </div>
        <div className={profileStyles.performanceColumn}>
          <Performances playerId={id}/>
        </div>
      </div>
    </div>
  )
};

export default Profile;