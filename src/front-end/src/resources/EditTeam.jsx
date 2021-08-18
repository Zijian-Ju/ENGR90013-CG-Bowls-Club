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
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {KeyboardArrowDown,KeyboardArrowUp,Search,FindInPage} from '@material-ui/icons';


const Toolbar = (props) => {
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
  function handleFilterClickOpen() {
    setDialogOpen(true);
}
function handleFilterClickClose() {
  setDialogOpen(false);
}
  return (
    <div className={toolbarStyles.toolbar} style={{justifyContent: 'space-between'}}>
      <div> </div>
      <div className={toolbarStyles.searchBarContainer}>
          <div className={toolbarStyles.searchBar}>
              <TextField style={{width: '100%',background: '#fff'}} onChange={(e) => {
                setUserSearchText(e.target.value)
                props.searchUser(e.target.value)
              }} variant="outlined" placeholder="Search User" size="small" InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),}} />
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
  </div>
  )
}


const HomeTitle = () => {
  const history = useHistory();
  function membersHandleClick() {
    history.push("/members");
  };

  function homeHandleClick() {
      history.push("/home");
  };

  function teamsHandleClick() {
      history.push("/teams")
  }
  function placeholderAlert() {
    return alert("Unsupported");
  }
  return (
    <>
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
    </>
  )
}

const EditTeam = () => {
  const history = useHistory();
  function teamsHandleClick() {
    history.push("/teams")
}
  const onDragEnd = (e) => {
    const {draggableId,destination} = e
    const data = payerList.find(item => item.id == draggableId)
    if (data) {
      const id = `${destination.droppableId}BowlerId${destination.index > 4 ? 4 : destination.index}`
      const name = `${destination.droppableId}BowlerName${destination.index > 4 ? 4 : destination.index}`
      setTeamDetail({...teamDetail,[id]: data.id,[name]: data.playerName})
    }
  }
  const [payerList,setPayList] = useState([])
  const [copyPayerList,setCopyPayerList] = useState([])
  const [teamDetail,setTeamDetail] = useState({})
  const [userDetail,setUserDetail] = useState()
  const teamList = ['skip','third','second','lead']
  const arr = [1,2,3,4]
  const getDetail = async () => {
    const [list,detail] = await Promise.all([
      axios.post(`http://128.199.253.108:8082/player/getAllPlayer`, {searching: {availability: [], maxScore: 10, minScore: 0, order: {direction: '', sortField: ''}, position: []}}),
      axios.post(`http://128.199.253.108:8082/team/getTeamById`, {id: history.location.state})
    ])
    setPayList(list.data.data.playerList)
    setTeamDetail(detail.data.data)
    setCopyPayerList(list.data.data.playerList)
  }
  useEffect(() => {
    getDetail()
  },[])
  const getPlayerDetail = (item,i) => {
    const id = teamDetail[`${item}BowlerId${i}`]
    const detail = payerList.find(item => item.id == id)
    if (detail) {
      setUserDetail(detail)
    }
  }
  const onSave = async() => {
    await axios.post('http://128.199.253.108:8082/team/updateTeam',teamDetail)
    teamsHandleClick()
  }
  const searchUser =  (name) => {
    if (name) {

    const list = payerList.filter(item => {
      if (item.playerName.toLowerCase().includes(name.toLowerCase())) {
        return true
      }
      return false
    })

    setPayList(list)
    }else {
      setPayList(copyPayerList)
    }
  }
  return (
  <>
    <HomeTitle />
    <Toolbar searchUser={searchUser}/>
    <div className={teamsStyles.teamName}>
      <span>
      Team Name：
      </span>
      <TextField variant="outlined" size="small" value={teamDetail.teamName} onChange={({currentTarget})=>{
        setTeamDetail({...teamDetail,teamName: currentTarget.value})
      }} />
    </div>
    <div className={teamsStyles.edit}>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={teamsStyles.rightEdit}>
          {teamList.map((item,index) => (
              <Droppable droppableId={item} type="player" >{(provided, snapshot)=>(
                <div ref={provided.innerRef} >
                  <div className={teamsStyles.rightGrid} style={{gridTemplateColumns: '100%', border: 'none',marginBottom: '20px'}}>
                    <div key={item}  style={{width: '100%',textAlign: 'center'}}>
                            <div className={teamsStyles.rightGridTitle} >
                            {item.replace(/\b\w+\b/g, function(word){return word.substring(0,1).toUpperCase()+word.substring(1)})}
                          </div>
                        {arr.map((i,l) => (
                            <Draggable key={item+i} draggableId={item+i} index={l+1} isDragDisabled>
                              {(provided, snapshot) => (
                                <div  className={[teamsStyles.rightGridItem,teamsStyles.rightGridEdit].join(' ')} onClick={() => {getPlayerDetail(item,i)}}  ref={provided.innerRef}  {...provided.draggableProps}  {...provided.dragHandleProps}>
                                  <div className={bodyStyles.userCardImageContainer} style={{margin: 'auto',padding: '10px', borderRadius: '4px',width: '150px'}}>
                                    {teamDetail[`${item}BowlerName${i}`]}
                                  </div>
                                </div>
                              )}
                            </Draggable>
                        ))}
                    </div>
                  </div>
                  {provided.placeholder}
                </div>
              )}
              </Droppable>
          ))}

          <div style={{gridColumn: '1 / 5'}}>
          {userDetail && (<div id={userDetail.playerName} className={bodyStyles.userCard} style={{width: '400px'}} >
              <div className={bodyStyles.userCardImageContainer}>
                  <div className={bodyStyles.userCardImage} style={{height: 'auto'}}>
                      <img style={{width: '100%', objectFit: 'contain'}} src={profilepic} alt="Logo" />
                  </div>
                  <div className={bodyStyles.userName}>
                      {userDetail.playerName}
                  </div>
              </div>
              <div className={bodyStyles.userCardDescriptionContainer}>
                  <div className={bodyStyles.userCardDescriptionItem}>Performance: {userDetail.recentPerformance}</div>
                  <div className={bodyStyles.userCardDescriptionItem}>Availability: {userDetail.playerAvailability}</div>
                  <div className={bodyStyles.userCardDescriptionItem}>Favourite Position: {userDetail.playerPosPreference}</div>
                  <div className={bodyStyles.userCardDescriptionItem}>Preference: {userDetail.playerPreferTeammates}</div>
              </div>
          </div>)}
          <div className={teamsStyles.ButtonTeam}>
            <Button variant="contained" onClick={teamsHandleClick}>BACK</Button>
            <Button variant="contained" className={teamsStyles.saveButton} onClick={onSave}>SAVE</Button>
          </div>
          </div>
        </div>
        <Droppable droppableId="droppable2" type="player" isCombineEnabled={false}>
          {(provided, snapshot) => (
            <div ref={provided.innerRef} className={teamsStyles.editRight}>
              {payerList.map(user => (
                <Draggable key={user.id} draggableId={`${user.id}`}  index={user.id}>
                  {(provided, snapshot) => (
                    <div id={user.playerName} className={bodyStyles.userCard} style={{width: '100%'}} ref={provided.innerRef}  {...provided.draggableProps}  {...provided.dragHandleProps}>
                    <div className={bodyStyles.userCardImageContainer}>
                        <div className={bodyStyles.userCardImage} style={{height: 'auto'}}>
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
                  )}
                </Draggable>
              ))}

              {provided.placeholder}
            </div>

          )}
        </Droppable>
      </DragDropContext>
    </div>

  </>)
}
export default EditTeam
