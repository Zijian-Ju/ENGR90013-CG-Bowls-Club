import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Login from './Login'
import styles from './css/navbar.module.css';
import editTeamsStyles from './css/editteam.module.css';
import toolbarStyles from './css/toolbar.module.css';
import mcclogo from './img/mcc-logo.png';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import profilepic from './img/profile.png';
import { TextField } from '@material-ui/core';
import bodyStyles from './css/body.module.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Cookies from 'universal-cookie'
import { Close, Details } from '@material-ui/icons';
import product from "immer"
import Image from './Image'

function getDate(playerList, detail) {
  const detailArr = Object.values(detail);
  let newplayerList = [];
  for (let i = 0; i < playerList.length; i++) {
    if (!detailArr.includes(playerList[i].id)) {
      newplayerList.push(playerList[i]);
    }
  }
  return newplayerList;
}


const HomeTitle = () => {
  const history = useHistory();
  const cookies = new Cookies();
  function membersHandleClick() {
    history.push("/members");
  };

  function homeHandleClick() {
    history.push("/home");
  };

  function competitionsHandleClick() {
    history.push("/competitions")
  }

  function teamsHandleClick() {
    history.push("/teams")
  }
  function placeholderAlert() {
    return alert("Unsupported");
  }

  function committeeHandleClick() {
    history.push("/committee")
  }

  return (
    <>
    <div className={styles.body}>
            <div className={styles.logotext} >
                <img className={styles.mcclogo} onClick={homeHandleClick} src={mcclogo} alt="Logo" />
            </div>
            <div className={styles.linktabs}>
                <Button className={styles.linkbuttons} onClick={competitionsHandleClick}>COMPETITION</Button>
                {(cookies.get('role') === 'selector' || cookies.get('role') === 'admin') && <Button className={styles.linkbuttons} onClick={teamsHandleClick}>TEAMS</Button>}
                {(cookies.get('role') === 'selector' || cookies.get('role') === 'admin') && <Button className={styles.linkbuttons} onClick={membersHandleClick}>MEMBERS</Button>}
                {cookies.get('role') === 'admin' && <Button className={styles.linkbuttons} onClick={committeeHandleClick}>SELECTION COMMITTEE</Button>}
            </div>
            <div className={styles.logout}>
                <Login/>
            </div>
        </div>
    </>
  )
}

const EditTeam = () => {
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
  const cookies = new Cookies();

  // const history = useHistory();
  function teamsHandleClick() {
    history.push("/teams")
  }
  const onDragEnd = (e) => {
    const { draggableId, destination } = e
    const dataIndex=payerList.findIndex(item => item.id === parseInt(draggableId))
    const data = payerList[dataIndex]
    if (!destination) { return data }
    if (data) {
      const id = `${destination.droppableId}BowlerId${destination.index > 4 ? 4 : destination.index}`
      const name = `${destination.droppableId}BowlerName${destination.index > 4 ? 4 : destination.index}`
      const editData=copyPayerList.find(item=>item.id==teamDetail[id]);
      const isFind=payerList.findIndex(item=>item.id===editData?.id);
      setPayList(product(payerList,draft=>{
        if(isFind==-1){
          console.error(1111);
          if(editData){
            draft.splice(dataIndex,1,editData)
          }else{
            draft.splice(dataIndex,1)
          }
        }else{
          console.error(2222);
          draft.splice(dataIndex,1)
        }
      }))
      
      setTeamDetail({ ...teamDetail, [id]: data.id, [name]: data.playerName })
      return
      // setCopyPayerList(copyPayerList.filter(item => item.id !== data.id))
      // setPayList(payerList.filter(item => item.id !== data.id))
    }
  }
  const [payerList, setPayList] = useState([])
  const [copyPayerList, setCopyPayerList] = useState([])
  const [copyPayerListOne, setCopyPayerListOne] = useState([])
  const [teamDetail, setTeamDetail] = useState({})
  const [userDetail, setUserDetail] = useState({})
  const teamList = ['skip', 'third', 'second', 'lead']
  const arr = [1, 2, 3, 4]

  //   useEffect(() => {
  //     axios.post(`http://128.199.253.108:8082/player/getAllPlayer`, {searching: {availability: availability, maxScore: maxPerformance, minScore: minPerformance, order: {direction: sortOrder, sortField: sort}, position: favPosition}})
  //         .then(res => {
  //             setResponse(res);
  //         })
  // }, []);


  useEffect(() => {


    axios.post(`http://128.199.253.108:8082/team/getTeamById`, { id: history.location.state }, { headers: { "Access-Token": cookies.get("token"), "Email": cookies.get("email") } })
      .then((res) => {
        const detail = res.data.data;
        setTeamDetail(detail)
        axios.post(`http://128.199.253.108:8082/player/getAllPlayer`, { searching: { availability: availability, maxScore: maxPerformance, minScore: minPerformance, order: { direction: sortOrder, sortField: sort }, position: favPosition } }, { headers: { "Access-Token": cookies.get("token"), "Email": cookies.get("email") } })
          .then((list) => {
            let playerList = list?.data?.data?.playerList;
            setPayList(getDate(playerList||[], detail))
            setCopyPayerList(list?.data?.data?.playerList||[])
            setCopyPayerListOne(list?.data?.data?.playerList||[])
          })
      })
  }, [history.location.state, random, availability, favPosition, maxPerformance, minPerformance, sort, sortOrder])

  const getPlayerDetail = (item, i) => {
    const id = teamDetail[`${item}BowlerId${i}`]
    const detail = copyPayerList.find(item => item.id === id)
    console.log(id, detail);
    if (detail) {
      setUserDetail(detail)
    }
  }
  const onSave = async () => {
    await axios.post('http://128.199.253.108:8082/team/updateTeam', teamDetail, { headers: { "Access-Token": cookies.get("token"), "Email": cookies.get("email") } })
    teamsHandleClick()
  }
  const searchUser = (name) => {
    if (name) {

      const list = copyPayerList.filter(item => {
        if (item.playerName.toLowerCase().includes(name.toLowerCase())) {
          return true
        }
        return false
      })

      setPayList(list)
    } else {
      setPayList(copyPayerList)
    }
  }
  const removeList = (item, i) => {
    const id = `${item}BowlerId${i > 4 ? 4 : i}`
    const name = `${item}BowlerName${i > 4 ? 4 : i}`
    const data = copyPayerListOne.find(item => item.id === teamDetail[id])
    // setCopyPayerList([...copyPayerList, data])
    const isFind = payerList.findIndex(item => item.id === data.id);

    setPayList(product(payerList, draft => {
      if (isFind == -1) {
        console.error(1111);
        draft.push(data)
      }
    }))

    setTeamDetail({ ...teamDetail, [id]: -1, [name]: '' })
  }
  function handleFilterClickClose() {
    setDialogOpen(false);
  }
  function handleFilterClickOpen() {
    setDialogOpen(true);
  }
  function handleFilterClickClose() {
    setDialogOpen(false);
  }
  return (
    <>
      <HomeTitle />
      <div className={toolbarStyles.toolbar} style={{ justifyContent: 'flex-end' }}>

        <div
          className={toolbarStyles.searchBarContainer}
        >
          <div className={toolbarStyles.searchBar}>
            <TextField style={{ width: '100%' }} onChange={(e) => { setUserSearchText(e.target.value); searchUser(e.target.value) }} variant="outlined" label="Search User" />
          </div>
          <div className={toolbarStyles.filter}>
            <Button variant="contained" colour="primary" onClick={handleFilterClickOpen}>Filter</Button>
            <Dialog className={toolbarStyles.filterDialog} open={dialogOpen} onClose={handleFilterClickClose}>
              <DialogTitle>Filters Results</DialogTitle>
              <DialogContent className={toolbarStyles.filterDialogContent}>
                <FormControl className={toolbarStyles.filterFormControl} style={{ marginTop: "5%", marginRight: "10%" }}>
                  <InputLabel id="sort label">Sort</InputLabel>
                  <Select
                    label="Sort"
                    labelId="Sort"
                    id="sort"
                    value={sort}
                    displayEmpty
                    onChange={(e) => { setSort(e.target.value) }}
                  >
                    <MenuItem value={'name'}>Name</MenuItem>
                    <MenuItem value={'recentPerformance'}>Recent Performance</MenuItem>
                  </Select>
                </FormControl>
                <FormControl className={toolbarStyles.filterFormControl} style={{ marginTop: "5%" }}>
                  <InputLabel id="sort order label">Sort Order</InputLabel>
                  <Select
                    label="Sort order"
                    id="sort-order"
                    value={sortOrder}
                    displayEmpty
                    onChange={(e) => { setSortOrder(e.target.value) }}
                  >
                    <MenuItem value={'asc'}>Ascending</MenuItem>
                    <MenuItem value={'desc'}>Descending</MenuItem>
                  </Select>
                </FormControl>
              </DialogContent>
              <DialogContent className={toolbarStyles.filterDialogContent}>
                <FormControl className={toolbarStyles.filterFormControl} style={{ marginRight: "10%" }}>
                  <InputLabel shrink id="min performance label">Min Performance</InputLabel>
                  <Select
                    label="Minimum"
                    id="performance-min"
                    value={minPerformance}
                    displayEmpty
                    onChange={(e) => { setMinPerformance(e.target.value) }}
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
                <FormControl className={toolbarStyles.filterFormControl} disabled={minPerformance === ""} >
                  <InputLabel shrink id="availability label">Max Performance</InputLabel>
                  <Select
                    id="availability select"
                    value={maxPerformance}
                    onChange={(e) => { setMaxPerformance(e.target.value) }}
                    displayEmpty
                  >
                    {(() => {
                      const options = [];
                      for (let i = minPerformance; i <= 10; i++) {
                        options.push(<MenuItem key={i} value={i}>{i}</MenuItem>)
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
                    onChange={(e) => { setAvailability(e.target.value) }}
                  >
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(function (day, index) {
                      return (
                        <MenuItem key={`day${day}${index}`} value={day}>{day}</MenuItem>
                      )
                    })}
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
                    onChange={(e) => { setFavPosition(e.target.value) }}
                  >
                    {["Skip", "Second", "Third", "Lead"].map(function (position, index) {
                      return (
                        <MenuItem key={`${position}${index}`} value={position}>{position}</MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleFilterClickClose} color="primary">
                  Go Back
                </Button>
                <Button onClick={() => { handleFilterClickClose(); reRender() }} color="primary">
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>

      <div className={editTeamsStyles.teamName}>
        <span>
          Team Name：
        </span>
        <TextField variant="outlined" size="small" value={teamDetail.teamName} onChange={({ currentTarget }) => {
          setTeamDetail({ ...teamDetail, teamName: currentTarget.value })
        }} />
      </div>
      <div className={editTeamsStyles.edit}>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className={editTeamsStyles.rightEdit}>
            {teamList.map((item, index) => (
              <Droppable key={`droppable${item}${index}`} droppableId={item} type="player" >{(provided, snapshot) => (
                <div ref={provided.innerRef} >
                  <div className={editTeamsStyles.rightGrid} style={{ gridTemplateColumns: '100%', border: 'none', marginBottom: '20px' }}>
                    <div key={item} style={{ width: '100%', textAlign: 'center' }}>
                      <div className={editTeamsStyles.rightGridTitle} >
                        {item.replace(/\b\w+\b/g, function (word) { return word.substring(0, 1).toUpperCase() + word.substring(1) })}
                      </div>
                      {arr.map((i, l) => (
                        <Draggable key={item + i} draggableId={item + i} index={l + 1} isDragDisabled>
                          {(provided, snapshot) => (
                            <div
                              className={[editTeamsStyles.rightGridItem, editTeamsStyles.rightGridEdit].join(' ')}
                              onClick={() => { getPlayerDetail(item, i) }}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div className={bodyStyles.userCardImageContainer} style={{ margin: 'auto', padding: '10px 5px', width: '100%', borderRadius: '4px', textAlign: 'left', flexDirection: 'row', justifyContent: 'space-between', }}>
                                {teamDetail[`${item}BowlerName${i}`] && (
                                  <>
                                    <span>{teamDetail[`${item}BowlerName${i}`]}</span>
                                    <Close style={{ cursor: 'pointer' }} onClick={(e) => {
                                      e.stopPropagation()
                                      removeList(item, i)
                                    }} />
                                  </>
                                )}
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
            <div style={{ gridColumn: '1 / 5' }}>
              {userDetail && (<div id={userDetail.playerName} className={bodyStyles.userCard} style={{ width: '400px' }} >
                <div className={bodyStyles.userCardImageContainer}>
                  <div className={bodyStyles.userCardImage} style={{ height: 'auto' }}>
                    <Image url={userDetail.photoUrl}/>
                    {console.log(userDetail.photoUrl)}
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
              <div className={editTeamsStyles.ButtonTeam}>
                <Button variant="contained" onClick={teamsHandleClick}>BACK</Button>
                <Button variant="contained" className={editTeamsStyles.saveButton} onClick={onSave}>SAVE</Button>
              </div>
            </div>
          </div>
          <Droppable droppableId="droppable2" type="player" isCombineEnabled={false}>
            {(provided, snapshot) => (
              <div ref={provided.innerRef} className={editTeamsStyles.editRight}>
                {payerList.map(user => (
                  <Draggable key={user.id} draggableId={`${user.id}`} index={user.id}>
                    {(provided, snapshot) => (
                      <div id={user.playerName} className={bodyStyles.userCard} style={{ width: '100%' }} ref={provided.innerRef}  {...provided.draggableProps}  {...provided.dragHandleProps}>
                        <div className={bodyStyles.userCardImageContainer}>
                          <div className={bodyStyles.userCardImage} style={{ height: 'auto' }}>
                            <Image url={user.photoUrl}/>
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
