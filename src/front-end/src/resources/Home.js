import React from 'react';
import styles from './css/navbar.module.css';
import mcclogo from './img/mcc-logo.png';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';

function placeholderAlert() {
    return alert("Unsupported");
}

function Home() {

    const history = useHistory();

    function membersHandleClick() {
        history.push("/members");
    };

    return (
        <div className={styles.body}>
            <div className={styles.logotext} >
                <img className={styles.mcclogo} src={mcclogo} alt="Logo" />
            </div>
            <div className={styles.linktabs}>
                <Button className={styles.linkbuttons} onClick={placeholderAlert}>COMPETITION</Button>
                <Button className={styles.linkbuttons} onClick={placeholderAlert}>TEAMS</Button>
                <Button className={styles.linkbuttons} onClick={membersHandleClick}>MEMBERS</Button>
                <Button className={styles.linkbuttons} onClick={placeholderAlert}>SELECTION COMMITTEE</Button>
            </div>
            <div className={styles.logout}>
                <Button onClick={placeholderAlert}>LOG OUT</Button>
            </div>
        </div>
    );
};

export default Home;