import React, { useEffect, useState } from 'react';
import styles from './css/navbar.module.css';
import profileStyles from './css/profile.module.css';
import mcclogo from './img/mcc-logo.png';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import profilepic from  './img/profile.png';
import axios from 'axios';
import { useParams } from "react-router-dom";import NativeSelect from '@material-ui/core/NativeSelect';
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
import moment from 'moment';
// import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
// import DateTimePicker from '@material-ui/lab/DateTimePicker';



function CustomTableRow(props) {
  const [season, setSeason] = useState(props.data.season);
  const [date, setDate] = useState(props.data.matchTime);
  const [competitionId, setCompetitionId] = useState(props.data.competitionId)
  const [competitionName, setCompetitionName] = useState(props.data.competitionName)
  const [position, setPosition] = useState(props.data.position);
  const [performance, setPerformance] = useState(props.data.performanceScore)
  const [random, setRandom] = useState(Math.random());
  const reRender = () => setRandom(Math.random());
  const [editing, setEditing] = useState(false);
  const [deleted, setDeleted] = useState(false);

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
        }
      })
  }

  function updatePerformance() {
    axios.post(`http://128.199.253.108:8082/player/updateMatchPerformance`, {competitionId: competitionId, competitionName: competitionName, id: props.data.id, matchTime: date, performanceScore: performance, playerId: props.data.playerId, position: position, season: season})
      .then(res => {
        if (res.status === 200) {
          reRender();
          alert("Success")
        }
      })
  }
  if (deleted) {
    return null;
  }
  return (
    <TableRow style={{height: '50px'}}>
      <TableCell component="th" scope="row">
        <Input style={editing ? {border: '1px solid #cccccc', borderRadius: '5px'} : {}} disabled={!editing} onChange={(e) => setSeason(e.target.value)} disableUnderline value={season}/>
      </TableCell>
      <TableCell>
        <Input style={editing ? {border: '1px solid #cccccc', borderRadius: '5px'} : {}} disabled={!editing} onChange={(e) => setDate(e.target.value)}  disableUnderline value={date}/>
      </TableCell>
      <TableCell>
        <NativeSelect
          labelId="demo-simple-select-label"
          id="competition"
          disabled={!editing}
          onChange={(e) => {setCompetitionId(JSON.parse(e.target.value).id); setCompetitionName(JSON.parse(e.target.value).name)}}
          label="Competition"
          style={{minWidth: '200px'}}
          disableUnderline={!editing}
        >
          {props.competitions.status === 200 && props.competitions.data.statusCode === 200 &&
            props.competitions.data.data.competitionList.map((comp) => (
              <option value={JSON.stringify({id: comp.id, name:comp.competitionName})}>{comp.competitionName}</option>
            ))
          }
        </NativeSelect>
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
              <CheckCircleIcon className={profileStyles.tickIcon} onClick={() => {updatePerformance(); setEditing(false); props.refresh(); reRender()}} fontSize="large"/>
            </Tooltip>
            <Tooltip placement="top" title={"Delete Record"}>
              <CancelIcon className={profileStyles.cancelIcon} onClick={() => {deletePerformance(); setEditing(false); props.refresh(); reRender(); setDeleted(true)}} fontSize="large"/>
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

function Profile() {
    const [playerResponse, setPlayerResponse] = useState(false);
    const [competitionResponse, setCompetitionResponse] = useState({})
    const [performanceResponse, setPerformanceResponse] = useState({})
    const [performanceFilterResponse, setPerformanceFilterResponse] = useState({})
    const [performance, setPerformance] = useState("");
    const [availability, setAvailability] = useState("");
    const [favPosition, setFavPosition] = useState("");
    const [preference, setPreference] = useState("");
    const [editing, setEditing] = useState(false);
    const history = useHistory();
    const { id } = useParams();
    const [random, setRandom] = useState(Math.random());
    const reRender = () => {setRandom(Math.random())};
    const [year, setYear] = useState(2021);
    const [competition, setCompetition] = useState()
    const [dialogOpen, setDialogOpen] = useState(false);

    const [createPerformance, setCreatePerformance] = useState();
    const [createDate, setCreateDate] = useState("2021-01-01T00:00");
    const [createSeason, setCreateSeason] = useState();
    const [createPosition, setCreatePosition] = useState("")
    const [createCompetition, setCreateCompetition] = useState()
    

    useEffect(() => {

      const post1 = axios.post(`http://128.199.253.108:8082/player/getPlayerById`, {id: id});
      const post2 = axios.post(`http://128.199.253.108:8082/competition/getAllCompetition`, {});
      const post3 = axios.post(`http://128.199.253.108:8082/player/getUserPerformances`, {paging: {currentPage: 0, pageSize: 0, total:0}, searching: {playerId: id}});

      axios.all([post1, post2, post3])
      .then(axios.spread(function(res1, res2, res3) {
        if (res1.status === 200 && res1.data.statusCode === 200) {
          setPlayerResponse(res1)
          setPerformance(res1.data.data.recentPerformance)
          setAvailability(res1.data.data.playerAvailability)
          setFavPosition(res1.data.data.playerPosPreference)
          setPreference(res1.data.data.playerPreferTeammates)
        };
        if (res3.status === 200 && res3.data.statusCode === 200) {
          setPerformanceResponse(res3)
        };
        if (res2.status === 200 && res2.data.statusCode === 200) {
          setCompetitionResponse(res2)
          if (res2.data.data.competitionList.length > 0) {
            return (res2.data.data.competitionList[0].id)
          } else {
            return null
          }
        };
      }))
      .then(compId => {
        return axios.post(`http://128.199.253.108:8082/player/getUserPerformancesByFilter`, {paging: {currentPage: 0, pageSize: 0, total:0}, searching: {competitionId: compId, season: year, playerId: id}});
      })
      .then(res => {
        if (res.status === 200 && res.data.statusCode === 200) {
          setPerformanceFilterResponse(res)
        };
      })
    }, [random])

    function placeholderAlert() {
        return alert("Unsupported");
    }; 

    function updatePlayer() {
      axios.post(`http://128.199.253.108:8082/player/updatePlayer`, {id: id, photoUrl: playerResponse.data.data.photoUrl, playerName: playerResponse.data.data.playerName, playerEmail: playerResponse.data.data.playerEmail, playerGender: playerResponse.data.data.playerGender, playerNotPreferTeammates: playerResponse.data.data.playerNotPreferTeammates, playerPhone: playerResponse.data.data.playerPhone, recentPerformance: playerResponse.data.data.recentPerformance, playerAvailability: availability, playerPosPreference: favPosition, playerPreferTeammates: preference})
      .then(res => {
        alert("Saved")
        reRender();
        setEditing(false);
      })
    }

    function membersHandleClick() {
      history.push("/members");
    };

    function homeHandleClick() {
      history.push("/home");
    }

    function teamsHandleClick() {
      history.push("/teams")
    };

    function deleteUser() {
      axios.post(`http://128.199.253.108:8082/player/deletePlayerById`, {id: id})
      .then(res => {
        if (res.status === 200) {
          alert("Player deleted"); 
          history.push('/members');
        }
      })
    };

    function generateChart() {
      if (Object.keys(performanceFilterResponse).length !== 0 && performanceFilterResponse.constructor === Object) {
        const yData = performanceFilterResponse.data.data.performanceList.reverse().map((aPerformance) => {
          return (aPerformance.performanceScore)
        })
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
        return (
          <>
            <Line className={profileStyles.rightColumnGraph} data={data}/>
          </>
        )
      } else {
        return (
          <div>...Loading</div>
        )
      }
    }

    function dialogSubmit() {
      console.log(createDate)
      console.log(moment().toISOString(Date(createDate)))
      return (
        axios.post(`http://128.199.253.108:8082/player/addMatchPerformance`, {competitionId: JSON.parse(createCompetition).id, competitionName:JSON.parse(createCompetition).name, matchTime: createDate, performanceScore: createPerformance, playerId: id, position: createPosition, season: createSeason})
        .then(res => {
          if (res.status === 200) {
            console.log(res)
            alert("Performance created"); 
            reRender();
          }
        })
      )
      // return (null)
    }

    function handleDialogClickOpen() {
      setDialogOpen(true);
  }

    function handleDialogClickClose() {
        setDialogOpen(false);
    }

    function generatePastPerformance() {
      if (Object.keys(performanceResponse).length !== 0 && performanceResponse.constructor === Object) {
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
                      <DialogTitle>Adding a result for {playerResponse.data.data.playerName}</DialogTitle>
                      <DialogContent>
                          <FormControl style={{width: '48%', margin:'1%'}}>
                              <InputLabel shrink>Season</InputLabel>
                              <NativeSelect
                                labelId="demo-simple-select-label"
                                id="season"
                                value={createSeason}
                                onChange={(e) => {setCreateSeason(e.target.value)}}
                                inputProps={{name:'Season'}}
                              >
                                <option aria-label="None" value="" />
                                <option value={2019}>2019</option>
                                <option value={2020}>2020</option>
                                <option value={2021}>2021</option>
                              </NativeSelect>
                          </FormControl>
                          <FormControl style={{width: '48%', margin:'1%'}}>
                              <InputLabel shrink>Date</InputLabel>
                              <TextField onChange={(e) => setCreateDate(e.target.value)} type="datetime-local" label=" "/>
                              {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                  renderInput={(props) => <TextField {...props} />}
                                  label="DateTimePicker"
                                  value={createDate}
                                  onChange={(newValue) => {
                                    setCreateDate(newValue);
                                  }}
                                />
                              </LocalizationProvider> */}
                          </FormControl>
                          <FormControl style={{width: '48%', margin:'1%'}}>
                              <InputLabel shrink>Position</InputLabel>
                              <NativeSelect
                                labelId="demo-simple-select-label"
                                id="season"
                                value={createPosition}
                                onChange={(e) => {setCreatePosition(e.target.value)}}
                                inputProps={{name:'Year'}}
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
                                labelId="demo-simple-select-label"
                                id="competition"
                                onChange={(e) => {setCreateCompetition(e.target.value)}}
                                label="Competition"
                              >
                                <option aria-label="None" value="" />
                                {competitionResponse.status === 200 && competitionResponse.data.statusCode === 200 &&
                                  competitionResponse.data.data.competitionList.map((comp) => (
                                    <option value={JSON.stringify({id: comp.id, name: comp.competitionName})}>{comp.competitionName}</option>
                                  ))
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
                performanceResponse.data.data.performanceList.map((row) => (
                  <CustomTableRow refresh={reRender} competitions={competitionResponse} data={row}/>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )
      } else {
        return (
          <div>...Loading</div>
        )
      }
    }
    
    if (playerResponse.status === 200 && playerResponse.data.statusCode === 200) {
      return (
        <div style={{height: '100vh', display: 'flex', flexFlow: 'column'}}>
          <div className={styles.body}>
              <div className={styles.logotext} >
                  <img className={styles.mcclogo} src={mcclogo} onClick={homeHandleClick} alt="Logo" />
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
          <div className={profileStyles.body}>
            <div className={profileStyles.leftColumn}>
              <div className={profileStyles.leftColumnImgContainer}>
                <img style={{objectFit: 'contain', height: '100%'}} src={profilepic} alt="Logo" />
              </div>
              <div className={profileStyles.leftColumnNameContainer}>
                <div>
                  {playerResponse.status === 200 && playerResponse.data.statusCode === 200 && playerResponse.data.data.playerName}
                </div>
              </div>
              <div className={profileStyles.leftColumnDescriptionContainer}>
                <div className={profileStyles.leftColumnDescriptionTextfield}>
                  <TextField
                    style={{width: '100%'}}
                    disabled
                    id="Performance"
                    label="Auto Calculated Performance"
                    defaultValue={performance}
                    value={performance}
                    variant="outlined"
                    size="small"
                  />
                </div>
                <div className={profileStyles.leftColumnDescriptionTextfield}>
                  <TextField
                    style={{width: '100%'}}
                    id="Availability"
                    label="Availability"
                    defaultValue={availability}
                    value={availability}
                    variant="outlined"
                    onChange={(e) => {setAvailability(e.target.value)}}
                    disabled={!editing}
                    size="small"
                  />
                </div>
                <div className={profileStyles.leftColumnDescriptionTextfield}>
                  <TextField
                    style={{width: '100%'}}
                    id="Favourite Position"
                    label="Favourite Position"
                    defaultValue={favPosition}
                    value={favPosition}
                    variant="outlined"
                    onChange={(e) => {setFavPosition(e.target.value)}}
                    disabled={!editing}
                    size="small"
                  />
                </div>
                <div className={profileStyles.leftColumnDescriptionTextfield}>
                  <TextField
                    style={{width: '100%'}}
                    id="Preferred Teammates"
                    label="Preferred Teammates"
                    defaultValue={preference}
                    value={preference}
                    variant="outlined"
                    onChange={(e) => {setPreference(e.target.value)}}
                    disabled={!editing}
                    size="small"
                  />
                </div>
                {editing ? 
                  <div>
                    <Button onClick={() => {reRender(); setEditing(false)}}>Cancel</Button>
                    <Button onClick={() => {updatePlayer()}}>Save changes</Button> 
                  </div>
                  : 
                  <Button onClick={() => {setEditing(true)}}>Edit</Button>
                }
              </div>
              <div className={profileStyles.leftColumnButtonContainer}>
                <Button onClick={() => deleteUser()}>Delete Player</Button>
              </div>
            </div>
            <div style={{width: '75%'}} className={profileStyles.rightColumn}>
              <div className={profileStyles.rightColumnSettingsContainer}>
                <FormControl style={{minWidth: '200px', marginRight: '5%'}}>
                  <InputLabel shrink htmlFor="age-native-label-placeholder">
                    Year
                  </InputLabel>
                  <NativeSelect
                    labelId="demo-simple-select-label"
                    id="competition year"
                    value={year}
                    onChange={(e) => {setYear(e.target.value); reRender()}}
                    inputProps={{name:'Year'}}
                  >
                    <option value={2019}>2019</option>
                    <option value={2020}>2020</option>
                    <option value={2021}>2021</option>
                  </NativeSelect>
                </FormControl>
                <FormControl style={{minWidth: '200px'}}>
                  <InputLabel shrink htmlFor="age-native-label-placeholder">
                    Competition
                  </InputLabel>
                  <NativeSelect
                    labelId="demo-simple-select-label"
                    id="competition"
                    value={competition}
                    onChange={(e) => {setCompetition(e.target.value); reRender()}}
                    label="Competition"
                    style={{minWidth: '200px'}}
                  >
                    {competitionResponse.status === 200 && competitionResponse.data.statusCode === 200 &&
                      competitionResponse.data.data.competitionList.map((comp) => (
                        <option value={comp.id}>{comp.competitionName}</option>
                      ))
                    }
                  </NativeSelect>
                </FormControl>
              </div>
              <div className={profileStyles.rightColumnGraphContainer}>
                {generateChart()}
              </div>
              <div className={profileStyles.rightColumnCompetitionContainer}>
                {generatePastPerformance()}
              </div>
            </div>
          </div>
        </div> 
      )
    } else {return <div>Player does not exist</div>}       
};

export default Profile;