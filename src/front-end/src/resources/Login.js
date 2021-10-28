import React, { useEffect, useState } from 'react';
import loginStyles from './css/login.module.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import { useHistory } from "react-router-dom";
import { API } from "./API";
import { Auth } from "./Auth"

function Login() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [text, setText] = useState("Hello! Please login");
    const history = useHistory();

    
    
    useEffect(() => {
        (async function() {
            try {
                if (Auth.isLoggedIn()) {
                    const res = await API.getPermissions();
                    if (res.data.data.role === "guest") {
                        Auth.logout()
                    }
                }
            } catch (e) {
                console.log(e)
            }
        })();
    }, []);

    async function login() {
        try {
            const res = await API.login(email, 0, password, "string", "string", "string", "2021-09-08T12:07:26.992Z", "string");
            if (res.status !== 200) {
                        alert("Network error");
            }
            if (res.status === 200 && res.data.statusCode === 20006) {
                setText("Wrong login")
            } else if (res.status === 200 && res.data.statusCode === 200) {
                Auth.login(res.data.data.token, res.data.data.user.email, res.data.data.user.role)
                setText("Success!")
                history.go(0)
            }
        } catch(e) {
            console.log(e);
        }
    }

    function logout() {
        Auth.logout();
        setText("Hello! Please login");
        history.push("/home");
        return null
    }

    function logoutButton() {
        return (
            <div>
                <Button onClick={() => logout()}>Logout</Button>
            </div>
        )
    }

    const closeMenu = (e) => {
        if (e.key === "Tab") {
            e.preventDefault();
        } else {
            setAnchorEl(null)
        }
    }

    function loginButton() {
        return (
            <div>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={(e) => setAnchorEl(e.currentTarget)}>Login</Button>
                <Menu
                    open={Boolean(anchorEl)}
                    onClose={closeMenu}
                    anchorEl={anchorEl}
                    tabIndex="-1"       
                >   
                    <div className={loginStyles.loginMenu}>
                        <div className={loginStyles.loginMenuRow}>{text}</div>
                        <div className={loginStyles.loginMenuRow}>  
                            <TextField tabIndex="0" error={text === "Wrong login"} label="Email" onChange={(e) => setEmail(e.target.value)}></TextField>
                        </div>
                        <div className={loginStyles.loginMenuRow}>
                            <TextField tabIndex="0" error={text === "Wrong login"} type="password" label="Password" onChange={(e) => setPassword(e.target.value)}></TextField>
                        </div>
                        <div className={loginStyles.loginMenuRow}>
                            <Button type="submit" onClick={() => login()}>Login</Button>
                        </div>
                    </div>
                </Menu>
            </div>
        )
    }

    if (Auth.isLoggedIn()) {
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