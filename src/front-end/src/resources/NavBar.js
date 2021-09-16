import styles from './css/navbar.module.css';
import mcclogo from './img/mcc-logo.png';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Login from './Login'
import Cookies from 'universal-cookie'
function NavBar() {

    const history = useHistory();
    const cookies = new Cookies();

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
        <div className={styles.body}>
            <div className={styles.logotext} >
                <img className={styles.mcclogo} onClick={homeHandleClick} src={mcclogo} alt="Logo" />
            </div>
            <div className={styles.linktabs}>
                <Button className={styles.linkbuttons} onClick={competitionsHandleClick}>COMPETITION</Button>
                {(cookies.get('role') === 'selector' || cookies.get('role') === 'admin') && <Button className={styles.linkbuttons} onClick={teamsHandleClick}>TEAMS</Button>}
                {(cookies.get('role') === 'selector' || cookies.get('role') === 'admin') && <Button className={styles.linkbuttons} onClick={membersHandleClick}>MEMBERS</Button>}
                {cookies.get('role') === 'admin' && <Button className={styles.linkbuttons} onClick={committeeHandleClick}>SELECTION COMMITTEE</Button>}
            </div>
            <div className={styles.logout}>
                <Login/>
            </div>
        </div>
    )
}

export default NavBar;