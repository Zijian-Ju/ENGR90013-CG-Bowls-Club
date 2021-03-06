import React, { useEffect, useState } from 'react';
import profileStyles from './css/profile.module.css';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Image from './Image'
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
import NavBar from './NavBar';
import { API } from "./API";
import { Auth } from './Auth'
import dayjs from 'dayjs'

function CustomTableRow(props) {
  const [season, setSeason] = useState(props.data.season);
  const [date, setDate] = useState(dayjs(props.data.matchTime).format("YYYY-MM-DD"));
  const [time, setTime] = useState(dayjs(props.data.matchTime).format("HH:mm"));
  const [competitionId, setCompetitionId] = useState(props.data.competitionId)
  const [competitionName, setCompetitionName] = useState(props.data.competitionName)
  const [position, setPosition] = useState(props.data.position);
  const [performance, setPerformance] = useState(props.data.performanceScore)
  const [editing, setEditing] = useState(false);
  const [deleted, setDeleted] = useState(false)
  const history = useHistory()

  function resetFields() {
    setSeason(props.data.season);
    setDate(dayjs(props.data.matchTime).format("YYYY-MM-DD"));
    setTime(dayjs(props.data.matchTime).format("HH:mm"));
    setCompetitionId(props.data.competitionId);
    setCompetitionName(props.data.competitionName)
    setPosition(props.data.position);
    setPerformance(props.data.performanceScore);
  }

  async function deletePerformance() {
    try {
      const res = await API.deletePerformanceById(props.data.competitionId, props.data.id, dayjs(date+time).toISOString(), performance, props.data.playerId)
      if (res.status !== 200) {
        alert("Network error, please try again later")
      }
      if (res.status === 200 && res.data.statusCode !== 200) {
        alert(res.data.message)
      }
      if (res.status === 200 && res.data.statusCode === 200) {
        alert("Success")
        props.performanceUpdate()
        props.performanceTableUpdate()
        history.go(0)
      }
    } catch (e) {
      console.log(e)
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
  }

  async function updatePerformance() {
    try {
      const res = await API.updatePerformance(competitionId, competitionName, props.data.id, dayjs(date+time).toISOString(), performance, props.data.playerId, position, season)
      if (res.status !== 200) {
        alert("Network error, please try again later")
      }
      if (res.status === 200 && res.data.statusCode !== 200) {
        alert(res.data.message)
      }
      if (res.status === 200 && res.data.statusCode === 200) {
        alert("Success")
        props.performanceUpdate()
        history.go(0)
      }
    } catch (e) {
      console.log(e)
    }
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
        <Input type="date" style={editing ? {border: '1px solid #cccccc', borderRadius: '5px'} : {}} disabled={!editing} onChange={(e) => setDate(e.target.value)} disableUnderline value={date}/>
      </TableCell>
      <TableCell>
        <Input type="time" style={editing ? {border: '1px solid #cccccc', borderRadius: '5px'} : {}} disabled={!editing} onChange={(e) => setTime(e.target.value)} disableUnderline value={time}/>
      </TableCell>
      <TableCell>
        <Input disabled value={competitionName}/>
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
  const [status, setStatus] = useState("...Loading");
  const [year, setYear] = useState("");
  const [competition, setCompetition] = useState("");

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
          setResponse(res);
        }
      } catch (e) {
        console.log(e)
      }
    })();
  }, [props.updateVar]);

  if (Object.keys(response).length === 0 || response.constructor !== Object) {
    return (
        <div>{status}</div>
    )
  } else {
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
}

function LineChart(props) {
  const [loaded, setLoaded] = useState(false)
  const [yData, setYData] = useState([])
  const [status, setStatus] = useState("...Loading");

  useEffect(() => {
    (async function () {
      try {
        const res = await API.getFilteredUserPerformances(props.compId, props.year, props.playerId)
        if (res.status !== 200) {
          setStatus("Network error, please try again later")
        }
        if (res.status === 200 && res.data.statusCode !== 200) {
          setStatus(res.data.message)
        }
        if (res.status === 200 && res.data.statusCode === 200) {
          setLoaded(true)
          const temp = res.data.data.performanceList.map((aPerformance) => {
            return (aPerformance.performanceScore)
          });
          setYData(temp);
        }
      } catch (e) {
        console.log(e)
      }
    })();
  },[props.playerId, props.year, props.compId, props.performanceVar]);
  
  const xData = Array.from(Array(10).keys())

  const data = {
    labels: xData,
    datasets: [
      {
        label: 'Performance',
        data: yData.reverse(),
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
        {status}
      </>
    )
  }
}

function Details(props) {

  const [response, setResponse] = useState({});
  const [status, setStatus] = useState("...Loading");
  const [editableFields, setEditableFields] = useState({});
  const [editing, setEditing] = useState(false);
  const playerId = props.playerId;
  const [random, setRandom] = useState(Math.random());
  const reRender = () => {setRandom(Math.random())};
  const [selectedFile, setSelectedFile] = useState({});

  function objectNotEmpty(obj) {
    if (Object.keys(obj).length !== 0 && obj.constructor === Object) {
      return true
    } else {
      return false;
    }
  }

  async function updatePlayer() {
    try {
      const additionalProps = {id: playerId, photoUrl: response.data.data.photoUrl, playerEmail: response.data.data.playerEmail, playerGender: response.data.data.playerGender, playerPhone: response.data.data.playerPhone, playerName: response.data.data.playerName, playerPreferTeammates: response.data.data.playerPreferTeammates, recentPerformance: response.data.data.recentPerformance}
      const res = await API.updatePlayer({...editableFields, ...additionalProps})
      if (res.status !== 200) {
        alert("Network error, please try again later")
      }
      if (res.status === 200 && res.data.statusCode !== 200) {
        alert(res.data.message)
      }
      if (res.status === 200 && res.data.statusCode === 200) {
        alert("Saved")
      }
      setEditing(false);
    } catch (e) {
      console.log(e)
    } 
  }

  const uploadSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile, selectedFile.name);
      
      const res1 = await API.uploadImage(formData);
      if (res1.status !== 200) {
        alert("Network error, please try again later")
      } else if (res1.status === 200 && res1.data.code === 200) {
        await API.updatePlayer({...response.data.data, 'photoUrl': res1.data.img})
        alert('Image successfully updated')
        setSelectedFile();
        reRender();
      } else {
        alert("Server error")
      }
    } catch (e) {
      console.log(e)
    }
  }

  const onFileChange = (event) => {
    const validTypes = ["image/jpg", "image/jpeg", "image/png"]
    if (validTypes.includes(event.target.files[0].type)) {
      setSelectedFile(event.target.files[0])
    } else {
      alert("Invalid file type uploaded")
    }
  }

  function imageUpload() {
    return (
      <div className={profileStyles.playerDetailsUpdateImageButton}>
        <div style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center'}}>
          <Button>
            <label htmlFor="fileUpload">Upload Image</label>
          </Button>
          <input
            id="fileUpload"
            type="file"
            name="file"
            onChange={onFileChange}
            style={{display: 'none'}}
          />        
          <Button disabled={!objectNotEmpty(selectedFile)} onClick={uploadSubmit}>Save image</Button> 
        </div>
        <div style={{display: 'flex', flexDirection: 'row', width: '100%', overflow: 'hidden'}}>
          {objectNotEmpty(selectedFile) && <div>File:{selectedFile.name}</div>}
        </div>
      </div>
    )
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
          setResponse(res)
          setEditableFields({playerAvailability: res.data.data.playerAvailability, playerPosPreference: res.data.data.playerPosPreference, notes: res.data.data.notes, playerNotPreferTeammates: res.data.data.playerNotPreferTeammates})
        }
      } catch (e) {
        console.log(e)
      }
    })();
  }, [playerId, random])

  if (objectNotEmpty(response)) {
    return (
      <div style={{height: '100%', width: '100%'}}>
        <div className={profileStyles.playerDetailsImage}>
          <Image url={response.data.data.photoUrl}/>
        </div>
        <div className={profileStyles.playerDetailsUpdateImage}>
          {imageUpload()}
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
            onChange={(e) => {setEditableFields({...editableFields, playerPosPreference: e.target.value})}}
            disabled={!editing}
            size="small"
            value={editableFields.playerPosPreference}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            style={{margin: '3%', width: '94%'}}
            id="Not Preferred Teammates"
            label="Not Preferred Teammates"
            variant="outlined"
            onChange={(e) => {setEditableFields({...editableFields, playerNotPreferTeammates: e.target.value})}}
            disabled={!editing}
            size="small"
            value={editableFields.playerNotPreferTeammates}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            style={{margin: '3%', width: '94%'}}
            id="Notes"
            label="Notes"
            variant="outlined"
            onChange={(e) => {setEditableFields({...editableFields, notes: e.target.value})}}
            disabled={!editing}
            size="small"
            value={editableFields.notes}
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
    return <div style={{height: '100%'}}>{status}</div>
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
  const [status, setStatus] = useState("...Loading");
  const [createPerformance, setCreatePerformance] = useState("");
  const [createDate, setCreateDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [createTime, setCreateTime] = useState(dayjs().format("HH:mm"))
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
              <TableCell>Time</TableCell>
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
                        <InputLabel shrink>Date</InputLabel>
                          <TextField variant="standard" type="date" defaultValue={createDate} id="date-local" InputLabelProps={{shrink: true}} onChange={(e) => setCreateDate(e.target.value)} label=" "/>   
                      </FormControl>
                      <FormControl style={{width: '48%', margin:'1%'}}>
                      <InputLabel shrink>Time</InputLabel>
                          <TextField variant="standard" type="time" defaultValue={createTime} id="time-local" InputLabelProps={{shrink: true}} onChange={(e) => setCreateTime(e.target.value)} label=" "/>   
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

  async function dialogSubmit() {
    if (createPerformance === "" || createDate === undefined || createTime === undefined || createSeason === "" || createPosition === "" || createCompetition === "") {
      alert("Please fill all fields")
      return null;
    }

    try {
      const res = await API.addMatchPerformance(JSON.parse(createCompetition).id, JSON.parse(createCompetition).name, dayjs(createDate+createTime).toISOString(), createPerformance, playerId, createPosition, createSeason)

      if (res.status !== 200) {
        alert("Network error, please try again later")
      }
      if (res.status === 200 && res.data.statusCode !== 200) {
        alert(res.data.message)
      }
      if (res.status === 200 && res.data.statusCode === 200) {
        alert("Performance created"); 
        props.performanceUpdate()
        reRender()
        history.go(0)
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    (async function () {
      try {
        const res1 = await API.getAllPlayerPerformances(playerId)
        const res2 = await API.getAllCompetitions()
        if (res1.status !== 200 || res2.status !== 200) {
          setStatus("Network error, please try again later")
        }
        if ((res1.status === 200 && res1.data.statusCode !== 200) || (res2.status === 200 && res2.data.statusCode !== 200)) {
          setStatus(`Code 1: ${res1.data.message} Code 2: ${res2.data.message}`)
        }
        if (res1.status === 200 && res1.data.statusCode === 200 && res2.status === 200 && res2.data.statusCode === 200) {
          setPerformanceResponse(res1)
          setCompetitionResponse(res2)
        }
      } catch (e) {
        console.log(e)
      }
    })();
  }, [playerId, random, props.updateVar])

  if (objectNotEmpty(performanceResponse)) {
    return (
      <>
        {performanceTable()}
      </>
    )
  } else {
    return <div>{status}</div>
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

  async function deletePlayer() {
    try {
      const res = await API.deletePlayerById(id)
      if (res.status !== 200) {
        alert("Network error, please try again later")
      }
      if (res.status === 200 && res.data.statusCode !== 200) {
        alert(res.data.message)
      }
      if (res.status === 200 && res.data.statusCode === 200) {
        alert("Player deleted"); 
        history.push('/members');
      }
    } catch (e) {
      console.log(e)
    }
  };

  function body() {
    if (!Auth.isLoggedIn()) {
      return (
          <div>Please log in</div>
      )
    } else {
      return (
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
      )
    }
  }

  return (
    <div style={{height: '100vh', display: 'flex', flexFlow: 'column'}}>
      <NavBar/>
      {body()}
    </div>
  )
};

export default Profile;