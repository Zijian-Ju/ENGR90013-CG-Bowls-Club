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
  const onDragEnd = (e) => {
    console.log(e)
  }
  const [payerList,setPayList] = useState([])
  const [teamDetail,setTeamDetail] = useState({})
  const teamList = ['skip','third','second','lead']
  const arr = [1,2,3,4]
  const getDetail = async () => {
    const [list,detail] = await Promise.all([
      axios.post(`http://128.199.253.108:8082/player/getAllPlayer`, {searching: {availability: [], maxScore: 10, minScore: 0, order: {direction: '', sortField: ''}, position: []}}),
      axios.post(`http://128.199.253.108:8082/team/getTeamById`, {id: history.location.state})
    ])
    setPayList(list.data.data.playerList)
    setTeamDetail(detail.data.data)
  }
  useEffect(() => {
    getDetail()
  },[])
  return (
  <>
    <HomeTitle />
    <div className={teamsStyles.edit}>
      <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable1" type="player" >{(provided, snapshot)=>(
            <div ref={provided.innerRef}>
              <div className={teamsStyles.rightGrid}>
                {teamList.map((item,index) => (<div key={item}  style={{width: '100%',textAlign: 'center'}}>
                  <div>
                    <div className={teamsStyles.rightGridTitle}>
                      {item.replace(/\b\w+\b/g, function(word){return word.substring(0,1).toUpperCase()+word.substring(1)})}
                    </div>
                    {arr.map(i => (
                        <Draggable key={item+i} draggableId={item+i} index={Number(`${i}${index}`)} isDragDisabled>
                          {(provided, snapshot) => (
                            <div  className={teamsStyles.rightGridItem} ref={provided.innerRef}  {...provided.draggableProps}  {...provided.dragHandleProps}>
                              <div className={bodyStyles.userCardImageContainer} style={{margin: 'auto',padding: '10px', borderRadius: '4px',width: '150px'}}>
                                {teamDetail[`${item}BowlerName${i}`]}
                              </div>
                            </div>
                          )}
                        </Draggable>
                    ))}
                  </div>
                </div>))}
              </div>
            </div>
          )}</Droppable>
          <Droppable droppableId="droppable2" type="player" isCombineEnabled={false}>
            {(provided, snapshot) => (
              <div ref={provided.innerRef}>
                {payerList.map(user => (
                  <Draggable key={user.id} draggableId={`${user.id}`}  index={user.id}>
                    {(provided, snapshot) => (
                      <div id={user.playerName} className={bodyStyles.userCard} style={{width: '100%'}} ref={provided.innerRef}  {...provided.draggableProps}  {...provided.dragHandleProps}>
                      <div className={bodyStyles.userCardImageContainer}>
                          <div className={bodyStyles.userCardImage}>
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
