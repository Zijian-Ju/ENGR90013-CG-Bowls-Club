import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import MoreIcon from '@material-ui/icons/More';


import styles from "../css/navbar.module.css";
import mcclogo from "../img/mcc-logo.png";
import '../css/moreTeams.css'





class MoreTeams extends Component {
    state = {
        navList: [
            { name: "Mulgrave CC1", key: "Mulgrave CC1" },
            { name: "Mulgrave CC2", key: "Mulgrave CC2" },
            { name: "Mulgrave CC3", key: "Mulgrave CC3" },
            { name: "Mulgrave CC4", key: "Mulgrave CC4" },
        ],
        headList: [
            {name:"Skip",key: "Skip"},
            {name:"Third",key: "Third"},
            {name:"Second",key: "Second"},
            {name:"Lead",key: "Lead"},
        ],
        itemData: [
            {img: 'https://material-ui.com/static/images/image-list/olive.jpg',title: 'Olive oli',author: 'by: congerdesign'},
            {img: 'https://material-ui.com/static/images/image-list/olive.jpg',title: 'Olive oli',author: 'by: congerdesign'},
            {img: 'https://material-ui.com/static/images/image-list/olive.jpg',title: 'Olive oli',author: 'by: congerdesign'},
            {img: 'https://material-ui.com/static/images/image-list/olive.jpg',title: 'Olive oli',author: 'by: congerdesign'},
            {img: 'https://material-ui.com/static/images/image-list/olive.jpg',title: 'Olive oli',author: 'by: congerdesign'},
        ]
    };
    silderItem = ({ name, key, index }) => {
        return (
            <ListItem
                selected={this.state.activeNavIndex == index}
                button
                key={index}
                onClick={() => this.itemSwitch(key, index)}
            >
                <ListItemText
                    style={{
                        fontSize: "28px",
                        color: "teal",
                        fontWeight: "bold",
                    }}
                    primary={name}
                />
            </ListItem>
        );
    };

    membersHandleClick = () => this.props.history.push("/members");
    homeHandleClick = () => this.props.history.push("/home");
    teamsHandleClick = () => this.props.history.push("/teams");
    placeholderAlert = () => alert("Unsupported");
    backHandle = () => {
        this.props.history.goBack();
    }
    headerView = () => {
        return (
            <div className={styles.body}>
                <div className={styles.logotext}>
                    <img
                        className={styles.mcclogo}
                        onClick={this.homeHandleClick}
                        src={mcclogo}
                        alt="Logo"
                    />
                </div>
                <div className={styles.linktabs}>
                    <Button
                        className={styles.linkbuttons}
                        onClick={this.placeholderAlert}
                    >
                        COMPETITION
                    </Button>
                    <Button
                        className={styles.linkbuttons}
                        onClick={this.teamsHandleClick}
                    >
                        TEAMS
                    </Button>
                    <Button
                        className={styles.linkbuttons}
                        onClick={this.membersHandleClick}
                    >
                        MEMBERS
                    </Button>
                    <Button
                        className={styles.linkbuttons}
                        onClick={this.placeholderAlert}
                    >
                        SELECTION COMMITTEE
                    </Button>
                </div>
                <div className={styles.logout}>
                    <Button onClick={this.placeholderAlert}>LOG OUT</Button>
                </div>
            </div>
        );
    };

    itemSwitch = (key, index) => {};
    render() {
        const { navList ,headList,itemData} = this.state;
        return (
            <div className="more-teams">
                <header>{this.headerView()}</header>
                <div className="main">
                    <div className="left-teams-nav">
                        <List component="nav">
                            {navList.map((item, index) =>
                                this.silderItem({ ...item, index })
                            )}
                        </List>
                    </div>
                    <div className="right-teams-list">
                        <div>
                            <Button color="primary" style={{color: '#333333',fontWeight: 'bold'}} endIcon={<MoreIcon fontSize="large" style={{color: '#333333'}}/>}>Primary</Button>
                        </div>
                        <div className="list">
                            {
                                headList.map((item,index)=>(
                                    <div className="item" key={index}>
                                        <div className="head">{item['name']}</div>
                                        <div className="user-item">
                                        {
                                            itemData.map((cItem,idx) => (
                                                <div className="item"  key={idx}>
                                                    <img src={cItem.img} alt={cItem.title} style={{width: '100%',height: '200px'}}/>
                                                    <h3>{cItem.title}</h3>
                                                    <p>{cItem.author}</p>
                                                </div>
                                            ))
                                        }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="footer">
                            <Button variant="contained" style={{backgroundColor: '#4E758A'}} color="primary" onClick={this.backHandle}>SELECT</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MoreTeams;
