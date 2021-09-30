import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import NavBar from './NavBar';
import Cookies from 'universal-cookie'
import axios from 'axios';
import committeeStyles from  './css/committee.module.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import FormControl from '@material-ui/core/FormControl';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Select, TextField } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { API } from "./API";

function SelectorTable(props) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("")
    const cookies = new Cookies();
    const history = useHistory();


    function handleDialogClickOpen() {
        setDialogOpen(true);
    }

    function handleDialogClickClose() {
        setDialogOpen(false);
    }

    async function createSelector() {
        const res = await API.createSelector(email, 0, password, name, role, "", "2021-09-12T13:09:05.760Z", username, cookies.get("token"), cookies.get("email"))
        if (res.status !== 200) {
            alert("Network error, please try again later")
        }
        if (res.status === 200 && res.data.statusCode !== 200) {
            alert(res.data.message)
        }
        if (res.status === 200 && res.data.statusCode === 200) {
            alert("Success")
            history.go(0)
        }
    }

    return (
        <div className={committeeStyles.body}>
            <Button onClick={handleDialogClickOpen}>Add Selector</Button>
            <Dialog className={committeeStyles.dialog} open={dialogOpen} onClose={handleDialogClickClose}>
                <DialogTitle>Create a selector</DialogTitle>
                <DialogContent style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                    <FormControl style={{width: '100%'}}> 
                        <TextField onChange={(e) => setName(e.target.value)} style={{margin: '2.5%', marginTop: '5%', width: '75%'}} label="Name"/>
                        <TextField onChange={(e) => setEmail(e.target.value)} style={{margin: '2.5%', width: '75%'}} label="Email"/>
                        <TextField onChange={(e) => setUsername(e.target.value)} style={{margin: '2.5%', width: '75%'}} label="Username"/>
                        <TextField onChange={(e) => setPassword(e.target.value)} style={{margin: '2.5%', width: '75%'}} label="Password"/>
                    </FormControl>
                    <FormControl style={{width: '100%'}}>
                        <InputLabel id="demo-simple-select-filled-label">Role</InputLabel>
                        <Select
                            name="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            label="Role"
                            style={{margin: '2.5%', width: '75%'}}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="selector">Selector</MenuItem>
                            <MenuItem value="admin">Admin</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClickClose} color="primary">
                        Close
                    </Button>
                    <Button onClick={() => {createSelector(); handleDialogClickClose()}} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight: 'bold'}}>Name</TableCell>
                            <TableCell style={{fontWeight: 'bold'}}>Username</TableCell>
                            <TableCell style={{fontWeight: 'bold'}}>Email</TableCell>
                            <TableCell style={{fontWeight: 'bold'}}>Role</TableCell>
                            <TableCell/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.data.data.data.map((user) => {
                            return (
                                <Row key={`selector${user.id}`} row={user}/>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

function Row(props) {
    const cookies = new Cookies();
    const history = useHistory();

    async function deleteUser(row) {
        const res = await API.deleteSelector(row, cookies.get("token"), cookies.get("email"))
        if (res.status === 200) {
            alert("Success")
            history.go(0)
        } else {
            alert("Error, please try again later")
        }
    }

    return (
        <TableRow>
            <TableCell>
                {props.row.realName}
            </TableCell>
            <TableCell>
                {props.row.userName}
            </TableCell>
            <TableCell>
                {props.row.email}
            </TableCell>
            <TableCell>
                {props.row.role}
            </TableCell>
            <TableCell>
                <Button onClick={() => deleteUser(props.row)}>Delete</Button>
            </TableCell>
        </TableRow>
    )
}

function Committee() {
    const [response, setResponse] = useState({});
    const cookies = new Cookies();
    const [status, setStatus] = useState("");

    useEffect(() => {
        (async function() {
            try {
                const res = await API.getAllUser(cookies.get("token"), cookies.get("email"))
                if (res.status !== 200) {
                    setStatus("Network error, please try again later")
                }
                if (res.status === 200 && res.data.statusCode !== 200) {
                    setStatus(res.data.message)
                }
                if (res.status === 200 && res.data.statusCode === 200) {
                    setStatus("...Loading")
                    setResponse(res);
                }
            } catch (e) {
                console.log(e)
            }
        })();
    }, [cookies.get("token"), cookies.get("email")]);

    return (
        <>
            <NavBar/>
            {Object.keys(response).length !== 0 && response.constructor === Object ? <SelectorTable data={response}/> : <div>{status}</div>}
        </>
    );
};

export default Committee;