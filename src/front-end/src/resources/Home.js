import React from 'react';
import NavBar from './NavBar';
import homeStyles from './css/home.module.css';

function Home() {

    return (
        <div style={{height: '100vh', display: 'flex', flexFlow: 'column'}}>
            <NavBar/>
            <div className={homeStyles.body}>
                <div style={{height: '70%'}}>
                </div>
                <div className={homeStyles.welcome}>
                    Welcome to MCC
                </div>
            </div>
        </div>
    );
};

export default Home;