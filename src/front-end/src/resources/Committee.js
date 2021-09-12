import React from 'react';
import { useHistory } from "react-router-dom";
import NavBar from './NavBar';


function Committee() {

    const history = useHistory();

    function membersHandleClick() {
        history.push("/members");
    };

    function homeHandleClick() {
        history.push("/home");
    };

    function teamsHandleClick() {
        history.push("/teams")
    };

    function competitionsHandleClick() {
        history.push("/competitions")
    }

    function committeeHandleClick() {
        history.push("/committee")
    }

    return (
        <>
            <NavBar/>
            <div>
                Selection Committee
            </div>
        </>
    );
};

export default Committee;