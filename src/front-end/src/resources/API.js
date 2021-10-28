import axios from 'axios';
import { backendUrl, imageHostUrl } from '../config'
import { Auth } from "./Auth"


export const API = {
    
    async test() {
        return (
            alert("hello")
        )
    },

    async login(email, id, password, realName, role, token, tokenCreateDate, userName) {
        const response = await axios.post(`${backendUrl}/sso/login`, {email: email, id: id, password: password, realName: realName, role: role, token: token, tokenCreateDate: tokenCreateDate, userName: userName})
        return response;
    },

    async getPermissions() {
        const response = await axios.get(`${backendUrl}/sso/getUserPermession`, {headers: {"Access-Token": Auth.getToken(), "Email": Auth.getEmail()}})
        return response;
    },

    async createSelector(email, id, password, realName, role, token, tokenCreateDate, userName) {
        const response = await axios.post(`${backendUrl}/sso/addUser`, {email: email, id: id, password: password, realName: realName, role: role, token: token, tokenCreateDate: tokenCreateDate, userName: userName}, {headers: {"Access-Token": Auth.getToken(), "Email": Auth.getEmail()}})
        return response;
    },

    async deleteSelector(user) {
        const response = await axios.post(`${backendUrl}/sso/deleteUser`, user, {headers: {"Access-Token": Auth.getToken(), "Email": Auth.getEmail()}})
        return response;
    },

    async getAllUser() {
        const response = await axios.get(`${backendUrl}/sso/getAllUser`, {headers: {"Access-Token": Auth.getToken(), "Email": Auth.getEmail()}})
        return response;
    },

    async deleteCompetition(compId) {
        const response = await axios.post(`${backendUrl}/competition/deleteCompetitionById`, {id: compId}, {headers: {"Access-Token": Auth.getToken(), "Email": Auth.getEmail()}})
        return response;
    },

    async unassociateTeamFromCompetition(compId, competitionDays, competitionName) {
        return this.updateCompetition(0, compId, competitionDays, competitionName, Auth.getToken(), Auth.getEmail());
    },

    async updateCompetition(teamId, compId, competitionDays, competitionName) {
        const response = await axios.post(`${backendUrl}/competition/updateCompetition`, {teamId: teamId, id: compId, competitionDays: competitionDays, competitionName: competitionName}, {headers: {"Access-Token": Auth.getToken(), "Email": Auth.getEmail()}})
        return response;
    },

    async getTeamById(teamId) {
        const response = await axios.post(`${backendUrl}/team/getTeamById`, {id: teamId}, {headers: {"Access-Token": Auth.getToken(), "Email": Auth.getToken()}})
        return response;
    },

    async getAllTeams() {
        const response = await axios.get(`${backendUrl}/team/getAllTeam`, {headers: {"Access-Token": Auth.getToken(), "Email": Auth.getEmail()}})
        return response;
    },

    async getPlayerById(playerId) {
        const response = await axios.post(`${backendUrl}/player/getPlayerById`, {id: playerId}, {headers: {"Access-Token": Auth.getToken(), "Email": Auth.getEmail()}})
        return response;
    },

    async getAllCompetitions() {
        const response = await axios.post(`${backendUrl}/competition/getAllCompetition`, {}, {headers: {"Access-Token": Auth.getToken(), "Email": Auth.getEmail()}})
        return response;
    },

    async createNewCompetition(day, days, name) {
        const response = await axios.post(`${backendUrl}/competition/addCompetition`, {competitionDay: day, competitionDays: days, competitionName: name, teamId: 0}, {headers: {"Access-Token": Auth.getToken(), "Email": Auth.getEmail()}})
        return response;
    },

    async createBowler(photoURL, availability, email, gender, name, notPreferredTM, phone, posPref, preferredTM, notes) {
        const response = await axios.post(`${backendUrl}/player/addPlayer`, {photoUrl: photoURL, playerAvailability: availability, playerEmail: email, playerGender: gender, playerName : name, playerNotPreferTeammates: notPreferredTM, playerPhone: phone, playerPosPreference: posPref, playerPreferTeammates: preferredTM, recentPerformance: 0, id: 0, notes: notes}, {headers: {"Access-Token": Auth.getToken(), "Email": Auth.getEmail()}})
        return response;
    },

    async getAllPlayers(availability, maxPerformance, minPerformance, sortOrder, sortField, favPosition) {
        const response = await axios.post(`${backendUrl}/player/getAllPlayer`, {searching: {availability: availability, maxScore: maxPerformance, minScore: minPerformance, order: {direction: sortOrder, sortField: sortField}, position: favPosition}}, {headers: {"Access-Token": Auth.getToken(), "Email": Auth.getEmail()}})
        return response;
    },

    async deletePerformanceById(competitionId, performanceId, matchTime, performanceScore, playerId) {
        const response = await axios.post(`${backendUrl}/player/deleteMatchPerformanceById`, {competitionId: competitionId, id: performanceId, matchTime: matchTime, performanceScore: performanceScore, playerId: playerId}, {headers: {"Access-Token": Auth.getToken(), "Email": Auth.getEmail()}})
        return response;
    },

    async updatePerformance(competitionId, competitionName, performanceId, matchTime, performanceScore, playerId, position, season) {
        const response = await axios.post(`${backendUrl}/player/updateMatchPerformance`, {competitionId: competitionId, competitionName: competitionName, id: performanceId, matchTime: matchTime, performanceScore: performanceScore, playerId: playerId, position: position, season: season}, {headers: {"Access-Token": Auth.getToken(), "Email": Auth.getEmail()}})
        return response;
    },

    async getFilteredUserPerformances(competitionId, season, playerId) {
        const response = await axios.post(`${backendUrl}/player/getUserPerformancesByFilter`, {paging: {currentPage: 0, pageSize: 0, total:0}, searching: {competitionId: competitionId, season: season, playerId: playerId}}, {headers: {"Access-Token": Auth.getToken(), "Email": Auth.getEmail()}})
        return response;
    },

    async updatePlayer(playerDetails) {
        const response = await axios.post(`${backendUrl}/player/updatePlayer`, playerDetails, {headers: {"Access-Token": Auth.getToken(), "Email": Auth.getEmail()}})
        return response;
    },

    async getAllPlayerPerformances(playerId) {
        const response = await axios.post(`${backendUrl}/player/getUserPerformances`, {paging: {currentPage: 0, pageSize: 0, total:0}, searching: {playerId: playerId}}, {headers: {"Access-Token": Auth.getToken(), "Email": Auth.getEmail()}})
        return response;
    },

    async deletePlayerById(playerId) {
        const response = await axios.post(`${backendUrl}/player/deletePlayerById`, {id: playerId}, {headers: {"Access-Token": Auth.getToken(), "Email": Auth.getEmail()}})
        return response;
    },

    async deleteTeam(teamId, teamName) {
        const response = await axios.post(`${backendUrl}/team/deleteTeam`, {id: teamId, teamName: teamName, leadBowlerId1: 0, leadBowlerId2: 0, leadBowlerId3:0, leadBowlerId4:0, leadBowlerName1: "", leadBowlerName2: "", leadBowlerName3: "", leadBowlerName4:"", secondBowlerId1:0, secondBowlerId2: 0, secondBowlerId3: 0, secondBowlerId4: 0, secondBowlerName1:"", secondBowlerName2:"", secondBowlerName3:"", secondBowlerName4: "", skipBowlerId1:0, skipBowlerId2: 0, skipBowlerId3: 0, skipBowlerId4:0, skipBowlerName1: "", skipBowlerName2: "", skipBowlerName3: "", skipBowlerName4:"", thirdBowlerId1:0, thirdBowlerId2:0, thirdBowlerId3:0, thirdBowlerId4:0, thirdBowlerName1:"", thirdBowlerName2:"", thirdBowlerName3: "", thirdBowlerName4:""}, {headers: {"Access-Token": Auth.getToken(), "Email": Auth.getEmail()}})
        return response;
    },

    async createTeam(teamName) {
        const response = await axios.post(`${backendUrl}/team/addTeam`, {teamName: teamName, leadBowlerId1: 0, leadBowlerId2: 0, leadBowlerId3:0, leadBowlerId4:0, leadBowlerName1: "", leadBowlerName2: "", leadBowlerName3: "", leadBowlerName4:"", secondBowlerId1:0, secondBowlerId2: 0, secondBowlerId3: 0, secondBowlerId4: 0, secondBowlerName1:"", secondBowlerName2:"", secondBowlerName3:"", secondBowlerName4: "", skipBowlerId1:0, skipBowlerId2: 0, skipBowlerId3: 0, skipBowlerId4:0, skipBowlerName1: "", skipBowlerName2: "", skipBowlerName3: "", skipBowlerName4:"", thirdBowlerId1:0, thirdBowlerId2:0, thirdBowlerId3:0, thirdBowlerId4:0, thirdBowlerName1:"", thirdBowlerName2:"", thirdBowlerName3: "", thirdBowlerName4:""}, {headers: {"Access-Token": Auth.getToken(), "Email": Auth.getEmail()}})
        return response;
    },

    async uploadImage(formData) {
        const response = await axios.post(`${imageHostUrl}/upload`, formData)
        return response;
    },

    async getTeamMembersPhotoURL(team) {
        const response = await axios.post(`${backendUrl}/team/getTeamPlayerPhotos`, team, {headers: {"Access-Token": Auth.getToken(), "Email": Auth.getEmail()}})
        return response
    },

    async addMatchPerformance(compId, compName, matchTime, performanceScore, playerId, position, season) {
        const response = await axios.post(`${backendUrl}/player/addMatchPerformance`, {competitionId: compId, competitionName: compName, matchTime: matchTime, performanceScore: performanceScore, playerId: playerId, position: position, season: season}, {headers: {"Access-Token": Auth.getToken(), "Email": Auth.getEmail()}})
        return response
    },

    async getDetailedTeamById(teamId) {
        const response = await axios.post(`${backendUrl}/team/getTeamPlayerDetails`, {id: teamId}, {headers: {"Access-Token": Auth.getToken(), "Email": Auth.getEmail()}})
        return response;
    },
    async updateTeam(teamDetail) {
        const response = await axios.post(`${backendUrl}/team/updateTeam`, teamDetail, {headers: {"Access-Token": Auth.getToken(), "Email": Auth.getEmail()}})
        return response;
    },
}
