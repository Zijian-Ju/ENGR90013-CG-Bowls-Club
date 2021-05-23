import React, { useEffect, useState } from 'react';
import styles from './css/navbar.module.css';
import bodyStyles from './css/body.module.css';
import mcclogo from './img/mcc-logo.png';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import axios from 'axios';


export default class EditMember extends React.Component {
  constructor(){
      super()
    this.dom= React.createRef();
    this.userName=React.createRef()
    this.Nickname=React.createRef()
    this.Email=React.createRef()
    this.Mobile=React.createRef()
    this.Prefer=React.createRef()
  }
  
    componentDidMount(){
    this.dom.current.style.color='red'

    }
    sbmmt(){
        comsole.log(this.userID.curremt.value)
    }
    render(){
        return(
        <div>
            <hr/>
            <h1 ref={this.dom}>editmember</h1>
            <input type="text" ref={this.userName}>username</input>
            <input type="text" ref={this.Nickname}>nickname</input>
            <input type="text" ref={this.Email}>email</input>
            <input type="text" ref={this.Mobile}>mobile</input>
            <input type="text" ref={this.Prefer}>Preferred </input>
            <button onClick={this.sbmmt.bind(this)}>upload</button>
        </div>
        )
    }
}

