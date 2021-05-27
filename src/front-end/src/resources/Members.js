import React, { useEffect, useState } from 'react';
import styles from './css/navbar.module.css';
import bodyStyles from './css/body.module.css';
import mcclogo from './img/mcc-logo.png';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import axios from 'axios';

function placeholderAlert() {
    return alert("Unsupported");
}

function Members() {
    const [response, setResponse] = useState({});
    const history = useHistory();

    function handleUserClick(id) {
        history.push("/members/" + id);
    }

    useEffect(() => {

        axios.post(`http://128.199.253.108:8082/player/getAllUser`, {username: "string"})
            .then(res => {
                setResponse(res);
                console.log(res);
            })
    });

    function renderUsers(data) {
        const userArray = data.data.data.playerList;
        return (
            <div className={bodyStyles.allUsersContainer}>
                <div className={bodyStyles.allUsersContainerRow} style={{marginBottom: '10px', backgroundColor: 'black', color: 'white'}}>
                    <div className={bodyStyles.allUsersContainerRowElement}>User ID</div>
                    <div className={bodyStyles.allUsersContainerRowElement}>Name</div>
                    <div className={bodyStyles.allUsersContainerRowElement}>Email</div>
                    <div className={bodyStyles.allUsersContainerRowElement}>Mobile</div>
                    <div className={bodyStyles.allUsersContainerRowElement}>Profile Link</div>
                </div>
                {userArray.map(user => (
                    <div className={bodyStyles.allUsersContainerRow}>
                            <div className={bodyStyles.allUsersContainerRowElement}>{user.id}</div>
                            <div className={bodyStyles.allUsersContainerRowElement}>{user.playerName}</div>
                            <div className={bodyStyles.allUsersContainerRowElement}>{user.playerEmail}</div>
                            <div className={bodyStyles.allUsersContainerRowElement}>{user.playerPhone}</div>
                            <Button className={bodyStyles.allUsersContainerRowElement} onClick={() => {handleUserClick(user.id)}}>Click to open</Button>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <>
            <div className={styles.body}>
                <div className={styles.logotext} >
                    <img className={styles.mcclogo} src={mcclogo} alt="Logo" />
                </div>
                <div className={styles.linktabs}>
                    <Button className={styles.linkbuttons} onClick={placeholderAlert}>Unsupported Placeholder</Button>
                    <Button className={styles.linkbuttons} onClick={placeholderAlert}>Unsupported Placeholder</Button>
                    <Button className={styles.linkbuttons} onClick={placeholderAlert}>Unsupported Placeholder</Button>
                    <Button className={styles.linkbuttons} onClick={placeholderAlert}>Unsupported Placeholder</Button>
                </div>
            </div>
            {/* <div>
                {JSON.stringify(response)}
            </div> */}

            {response !== {} && response.status === 200 && renderUsers(response)}

        </>
    );
};

export default Members;