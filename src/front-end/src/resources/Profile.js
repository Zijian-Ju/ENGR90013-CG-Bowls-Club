import React, { useEffect, useState } from 'react';
import styles from './css/navbar.module.css';
import bodyStyles from './css/body.module.css';
import mcclogo from './img/mcc-logo.png';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useParams } from "react-router-dom";


function Profile({match}) {
    const [response, setResponse] = useState({});
    const history = useHistory();
    const { id } = useParams();

    // useEffect(() => {
    //     axios.post(`http://128.199.253.108:8082/user/getuserbyid`, {username: "string"})
    //         .then(res => {
    //             setResponse(res);
    //         })
    // });

    return (
      
        <div>
            {"Profile page of user: " + JSON.stringify(id)}
        </div>
    )
}

export default Profile;