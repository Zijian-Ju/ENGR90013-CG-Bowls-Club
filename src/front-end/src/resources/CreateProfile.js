import React, { useState } from 'react';
import bodyStyles from './css/body.module.css';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import NavBar from './NavBar';
import Cookies from 'universal-cookie'
import { API } from "./API";

function CreateProfile() {
    const [playerName, setPlayerName] = useState("");
    const [playerEmail, setPlayerEmail] = useState("");
    const [playerPhone, setPlayerPhone] = useState("");
    const [playerPreference, setPlayerPreference] = useState("");
    const [playerAvailability, setPlayerAvailability] = useState("");
    const [playerGender, setPlayerGender] = useState("");
    const [playerNotPreferredTM, setPlayerNotPreferredTM] = useState("");
    const [playerPreferredTM, setPlayerPreferredTM] = useState("");
    const [notes, setNotes] = useState("");
    const [selectedFile, setSelectedFile] = useState();

    const history = useHistory();
    const cookies = new Cookies();

    async function onSubmit() {
      try {

        if (playerName === "" || playerEmail === "" || playerPhone==="" || playerAvailability ==="" || playerGender === "") {
          alert("Please fill name, email, phone, availability and gender");
          return null;
        }
        var imgUrl = ""

        if (selectedFile !== undefined) {
          const formData = new FormData();
          formData.append("file", selectedFile, selectedFile.name);
          const res1 = await API.uploadImage(formData);
          if (res1.status !== 200) {
            alert("Network error, please try again later")
          } else if (res1.status === 200 && res1.data.code === 200) {
            imgUrl = res1.data.img
          } else {
            alert("Image server error")
          }
        }

        const res2 = await API.createBowler(imgUrl, playerAvailability, playerEmail, playerGender, playerName, playerNotPreferredTM, playerPhone, playerPreference, playerPreferredTM, notes, cookies.get("token"), cookies.get("email"))
        if (res2.status !== 200) {
          alert("Network error, please try again later")
        }
        if (res2.status === 200 && res2.data.statusCode !== 200) {
          alert(res2.data.message)
        }
        if (res2.status === 200 && res2.data.statusCode === 200) {
          alert("Player Created"); 
          history.push("/members");
        }
      } catch (e) {
        console.log(e)
      }
    }

    const onFileChange = (event) => {
      const validTypes = ["image/jpg", "image/jpeg", "image/png"]
      if (validTypes.includes(event.target.files[0].type)) {
        setSelectedFile(event.target.files[0])
      } else {
        alert("Invalid file type uploaded")
      }
    }

    function imageUpload() {
      return (
        <div style={{display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center'}}>
          <div style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center'}}>
            <Button>
              <label for="fileUpload">Upload Image</label>
            </Button>
            <input
              id="fileUpload"
              type="file"
              name="file"
              onChange={onFileChange}
              style={{display: 'none'}}
            />
            <Button disabled={selectedFile === undefined} onClick={() => setSelectedFile()}>Deselect Image</Button>        
          </div>
          <div style={{display: 'flex', flexDirection: 'row', width: '100%', overflow: 'hidden'}}>
            {selectedFile !== undefined && <div style={{textAlign: 'center'}}>File:{selectedFile.name}</div>}
          </div>
        </div>
      )
    }

    return (
        <div style={{height: '100vh', display: 'flex', flexFlow: 'column'}}>
            <NavBar/>
            <div className = {bodyStyles.profilePage}>
              <div style={{width:'40%', height: '100%'}} className = {bodyStyles.profilePageColumn}>
                <div style ={{height: '93.5%', backgroundColor:'white'}} className = {bodyStyles.profilePageColumnContainer}>
                  <div className = {bodyStyles.profilePageContainerTitle}>
                    Basic Information
                  </div>
                  <div className = {bodyStyles.profilePageBasicInfoContainer}>
                    <div className = {bodyStyles.profilePageInfoContainerRow}>
                      <div className = {bodyStyles.profilePageContainerRowText}>
                        Name
                      </div>
                      <div className = {bodyStyles.profilePageContainerRowTextfield}>
                        <TextField size='small' style={{width:'100%'}} id="filled-basic" label="Enter Name" variant="outlined" defaultValue={playerName} onChange={(e) => {setPlayerName(e.target.value)}}/>
                      </div>
                    </div>
                    <div className = {bodyStyles.profilePageInfoContainerRow}>
                      <div className = {bodyStyles.profilePageContainerRowText}>
                        Email
                      </div>
                      <div className = {bodyStyles.profilePageContainerRowTextfield}>
                        <TextField size='small' style={{width:'100%'}} id="filled-basic" label="Enter Email" variant="outlined" defaultValue={playerEmail} onChange={(e) => {setPlayerEmail(e.target.value)}}/>
                      </div>
                    </div>
                    <div className = {bodyStyles.profilePageInfoContainerRow}>
                      <div className = {bodyStyles.profilePageContainerRowText}>
                        Phone
                      </div>
                      <div className = {bodyStyles.profilePageContainerRowTextfield}>
                        <TextField size='small' style={{width:'100%'}} id="filled-basic" label="Enter Phone Number" variant="outlined" defaultValue={playerPhone} onChange={(e) => {setPlayerPhone(e.target.value)}}/>
                      </div>
                    </div>
                    <div className = {bodyStyles.profilePageInfoContainerRow}>
                      <div className = {bodyStyles.profilePageContainerRowText}>
                        Availability
                      </div>
                      <div className = {bodyStyles.profilePageContainerRowTextfield}>
                        <TextField size='small' style={{width:'100%'}} id="filled-basic" label="Enter Availability" variant="outlined" defaultValue={playerAvailability} onChange={(e) => {setPlayerAvailability(e.target.value)}}/>
                      </div>
                    </div>
                    <div className = {bodyStyles.profilePageInfoContainerRow}>
                      <div className = {bodyStyles.profilePageContainerRowText}>
                         Preference Position
                      </div>
                      <div className = {bodyStyles.profilePageContainerRowTextfield}>
                        <TextField size='small' style={{width:'100%'}} id="filled-basic" label="Enter Preference" variant="outlined" defaultValue={playerPreference} onChange={(e) => {setPlayerPreference(e.target.value)}}/>
                      </div>
                    </div>
                    <div className = {bodyStyles.profilePageInfoContainerRow}>
                      <div className = {bodyStyles.profilePageContainerRowText}>
                        Preferred Teammate
                      </div>
                      <div className = {bodyStyles.profilePageContainerRowTextfield}>
                        <TextField size='small' style={{width:'100%'}} id="filled-basic" label="Enter Preferred Teammate" variant="outlined" defaultValue={playerPreferredTM} onChange={(e) => {setPlayerPreferredTM(e.target.value)}}/>
                      </div>
                    </div>
                    <div className = {bodyStyles.profilePageInfoContainerRow}>
                      <div className = {bodyStyles.profilePageContainerRowText}>
                        Unpreferred Teammate
                      </div>
                      <div className = {bodyStyles.profilePageContainerRowTextfield}>
                        <TextField size='small' style={{width:'100%'}} id="filled-basic" label="Enter Unpreferred Teammate" variant="outlined" defaultValue={playerNotPreferredTM} onChange={(e) => {setPlayerNotPreferredTM(e.target.value)}}/>
                      </div>
                    </div>
                    <div className = {bodyStyles.profilePageInfoContainerRow}>
                      <div className = {bodyStyles.profilePageContainerRowText}>
                        Gender
                      </div>
                      <div className = {bodyStyles.profilePageContainerRowTextfield}>
                        <TextField size='small' style={{width:'100%'}} id="filled-basic" label="Enter Gender" variant="outlined" defaultValue={playerGender} onChange={(e) => {setPlayerGender(e.target.value)}}/>
                      </div>
                    </div>
                    <div className = {bodyStyles.profilePageInfoContainerRow}>
                      <div className = {bodyStyles.profilePageContainerRowText}>
                        Notes
                      </div>
                      <div className = {bodyStyles.profilePageContainerRowTextfield}>
                        <TextField size='small' style={{width:'100%'}} id="filled-basic" label="Enter Notes" variant="outlined" defaultValue={notes} onChange={(e) => {setNotes(e.target.value)}}/>
                      </div>
                    </div>
                    <div className = {bodyStyles.profilePageInfoContainerRow}>
                      {imageUpload()}
                    </div>
                  </div>
                  <div className = {bodyStyles.profilePageBasicInfoSubmit}>
                    <Button variant="contained" onClick={onSubmit}>Create Profile</Button>
                  </div>
                </div>
              </div>
            </div>
        </div>
    )
};


export default CreateProfile;