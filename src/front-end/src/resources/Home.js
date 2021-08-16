import React,{Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Button from '@material-ui/core/Button';
import styles from './css/navbar.module.css';
import mcclogo from './img/mcc-logo.png';
import './css/home.css';
import { Switch,Route,Redirect } from 'react-router-dom';
import MidweekPennant from './other/WeekendPennat';
import WeekendPennat from './other/MidweekPennant';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }));
  

class Home extends Component{
    constructor(props){
        super(props)
    }

    state = {
        leftNav: [
            {name: 'WeekEnd Pennant',url: '/home/midweekPennant'},
            {name: 'Midweek Pennant',url: '/home/weekendPennat'},
            {name: 'Thursday 7-A-Side',url: ''},
            {name: 'Night Pennant',url: ''},
        ],
        activeNavIndex: 0
    }
    membersHandleClick = () => this.props.history.push("/members");
    homeHandleClick = () => this.props.history.push("/home");
    teamsHandleClick = () => this.props.history.push("/teams");
    placeholderAlert = () => alert("Unsupported");

    headerView = () => {
        return (
            <div className={styles.body}>
                <div className={styles.logotext} >
                    <img className={styles.mcclogo} onClick={this.homeHandleClick} src={mcclogo} alt="Logo" />
                </div>
                <div className={styles.linktabs}>
                    <Button className={styles.linkbuttons} onClick={this.placeholderAlert}>COMPETITION</Button>
                    <Button className={styles.linkbuttons} onClick={this.teamsHandleClick}>TEAMS</Button>
                    <Button className={styles.linkbuttons} onClick={this.membersHandleClick}>MEMBERS</Button>
                    <Button className={styles.linkbuttons} onClick={this.placeholderAlert}>SELECTION COMMITTEE</Button>
                </div>
                <div className={styles.logout}>
                    <Button onClick={this.placeholderAlert}>LOG OUT</Button>
                </div>
            </div>
        )
    }
    pageSwitch = (url,index) => {
        this.setState({activeNavIndex:index})
        console.log(url,this.props);
        if(url){
            this.props.history.push(url)
        }
    }
    silderItem = ({name,url,index}) => {
        return (
            <ListItem selected={this.state.activeNavIndex == index} button key={index} onClick={() => this.pageSwitch(url,index)}>
                <ListItemText style={{fontSize: '28px',color: 'teal',fontWeight: 'bold'}} primary={name} />
            </ListItem>
        )
    }

    componentDidMount(){
        const {pathname} = this.props.history.location; 
        const activeNavIndex = this.state.leftNav.findIndex(item => item['url'] == pathname);
        if(activeNavIndex != -1){
            this.setState({activeNavIndex})
        }
    }

    render(){
        const {leftNav} =this.state;
        return (
            <div className="home">
                <header>{this.headerView()}</header>
                <main className="main">
                    <section className="silder">
                        <List component="nav">
                            {leftNav.map((item,index) => this.silderItem({...item,index}))}
                        </List>
                    </section>
                    <section className="body">
                        <Switch>
                            <Route exact path="/home/midweekPennant" component={()=><MidweekPennant/>} />
                            <Route exact path="/home/weekendPennat" component={()=> <WeekendPennat/>}/>
                            <Route exact path="/home">
                                <Redirect to="/home/weekendPennat" />
                            </Route>
                        </Switch>
                    </section>
                </main>
            </div>
        );
    }
}

export default Home;