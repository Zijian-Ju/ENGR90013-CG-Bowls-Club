import React, { useEffect, useState } from 'react';
import loginStyles from './css/login.module.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import axios from 'axios';
import Cookies from 'universal-cookie'
import { useHistory } from "react-router-dom";

function Login() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [text, setText] = useState("Hello! Please login");
    const cookies = new Cookies();
    const history = useHistory();
    
    useEffect(() => {
        if (cookies.get("token") !== undefined && cookies.get("email") !== undefined) {
            axios.get(`http://128.199.253.108:8082/sso/getUserPermession`, {headers: {"Access-Token": cookies.get("token"), "Email": cookies.get("email")}})
                .then(res => {
                    if (res.data.data.role === "guest") {
                        cookies.remove("token", { path: '/' });
                        cookies.remove("email", { path: '/' });
                        cookies.remove("role", { path: '/' });
                    }
                })
        }
    }, [cookies.get("token"), cookies.get("email")]);

    function login() {
        axios.post(`http://128.199.253.108:8082/sso/login`, {email: email, id: 0, password: password, realName: "string", role: "string", token: "string", tokenCreateDate: "2021-09-08T12:07:26.992Z", userName: "string"})
        .then(res => {
            if (res.status !== 200) {
                alert("Network error");
            }
            if (res.status === 200 && res.data.statusCode == 20006) {
                setText("Wrong login")
            } else if (res.status === 200 && res.data.statusCode == 200) {
                cookies.set("token", res.data.data.token, {path: '/'})
                cookies.set("email", res.data.data.user.email, {path: '/'})
                cookies.set("role", res.data.data.user.role, {path: '/'})
                setText("Success!")
                history.go(0)
            }
        })
    }

    function logout() {
        cookies.remove("token", { path: '/' });
        cookies.remove("email", { path: '/' });
        cookies.remove("role", { path: '/' });
        setText("Hello! Please login")
        history.go(0)
        return null
    }

    function logoutButton() {
        return (
            <div>
                <Button onClick={() => logout()}>Logout</Button>
            </div>
        )
    }

    function loginButton() {
        return (
            <div>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={(e) => setAnchorEl(e.currentTarget)}>Login</Button>
                <Menu
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                    anchorEl={anchorEl}
                >   
                    <div className={loginStyles.loginMenu}>
                        <div className={loginStyles.loginMenuRow}>{text}</div>
                        <div className={loginStyles.loginMenuRow}>
                            <TextField error={text === "Wrong login"} label="Email" onChange={(e) => setEmail(e.target.value)}></TextField>
                        </div>
                        <div className={loginStyles.loginMenuRow}>
                            <TextField error={text === "Wrong login"} type="password" label="Password" onChange={(e) => setPassword(e.target.value)}></TextField>
                        </div>
                        <div className={loginStyles.loginMenuRow}>
                            <Button onClick={() => login()}>Login</Button>
                        </div>
                    </div>
                </Menu>
            </div>
        )
    }

    if (cookies.get("token") !== undefined && cookies.get("email") !== undefined) {
        return ( 
            logoutButton()
        )
    } else {
        return (
            loginButton()
        )
    }
}

export default Login;