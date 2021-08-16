import React, { Component } from 'react';
import { createTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green, purple } from '@material-ui/core/colors';
import { withRouter } from 'react-router-dom';

const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: '#4E758A',
      '&:hover': {
        backgroundColor: '#4E758A',
      },
    },
  }))(Button);

class WeekendPennat extends Component {
    constructor(props){
        super(props)
    }
    selectTeams = () => {
        this.props.history.push('/moreTeams')
    }
    render() {
        return (
            <div>
                <ColorButton variant="contained" color="primary" onClick={this.selectTeams}>SELECTITEM</ColorButton>
            </div>
        );
    }   
}

export default withRouter(WeekendPennat);