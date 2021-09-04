import React, { useEffect, useState } from 'react';
import loginStyles from './css/login.module.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


function Login() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={(e) => setAnchorEl(e.currentTarget)}>Login</Button>
            <Menu
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                anchorEl={anchorEl}
            >   
                <div className={loginStyles.loginMenu}>
                    <div className={loginStyles.loginMenuRow}>Hello! Please login</div>
                    <div className={loginStyles.loginMenuRow}>
                        <TextField label="Username" onChange={(e) => setUsername(e.target.value)}></TextField>
                    </div>
                    <div className={loginStyles.loginMenuRow}>
                        <TextField label="Password" onChange={(e) => setPassword(e.target.value)}></TextField>
                    </div>
                    <div className={loginStyles.loginMenuRow}>
                        <Button>Login</Button>
                    </div>
                </div>
            </Menu>
        </div>
    )
}

export default Login;