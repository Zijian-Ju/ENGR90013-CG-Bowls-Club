import axios from 'axios';


export const API = {

    async test() {
        return (
            alert("hello")
        )
    },

    async login(email, id, password, realName, role, token, tokenCreateDate, userName) {
        const response = await axios.post(`http://128.199.253.108:8082/sso/login`, {email: email, id: id, password: password, realName: realName, role: role, token: token, tokenCreateDate: tokenCreateDate, userName: userName})
        return response;
    },

    async getPermissions(token, email) {
        const response = await axios.get(`http://128.199.253.108:8082/sso/getUserPermession`, {headers: {"Access-Token": token, "Email": email}})
        return response;
    },

    async createSelector(email, id, password, realName, role, token, tokenCreateDate, userName, accessToken, accessEmail) {
        const response = await axios.post(`http://128.199.253.108:8082/sso/addUser`, {email: email, id: id, password: password, realName: realName, role: role, token: token, tokenCreateDate: tokenCreateDate, userName: userName}, {headers: {"Access-Token": accessToken, "Email": accessEmail}})
        return response;
    },

    async deleteSelector(user, accessToken, accessEmail) {
        const response = await axios.post(`http://128.199.253.108:8082/sso/deleteUser`, user, {headers: {"Access-Token": accessToken, "Email": accessEmail}})
        return response;
    },

    async getAllUser(accessToken, accessEmail) {
        const response = await axios.get(`http://128.199.253.108:8082/sso/getAllUser`, {headers: {"Access-Token": accessToken, "Email": accessEmail}})
        return response;
    },

    async deleteCompetition(compId, accessToken, accessEmail) {
        const response = await axios.post(`http://128.199.253.108:8082/competition/deleteCompetitionById`, {id: compId}, {headers: {"Access-Token": accessToken, "Email": accessEmail}})
        return response;
    },

    async unassociateTeamFromCompetition(compId, competitionDays, competitionName, accessToken, accessEmail) {
        return this.updateCompetition(0, compId, competitionDays, competitionName, accessToken, accessEmail);
    },

    async updateCompetition(teamId, compId, competitionDays, competitionName, accessToken, accessEmail) {
        const response = await axios.post(`http://128.199.253.108:8082/competition/updateCompetition`, {teamId: teamId, id: compId, competitionDays: competitionDays, competitionName: competitionName}, {headers: {"Access-Token": accessToken, "Email": accessEmail}})
        return response;
    },

    async getTeamById(teamId, accessToken, accessEmail) {
        const response = await axios.post(`http://128.199.253.108:8082/team/getTeamById`, {id: teamId}, {headers: {"Access-Token": accessToken, "Email": accessEmail}})
        return response;
    },

    async getAllTeams(accessToken, accessEmail) {
        const response = await axios.get(`http://128.199.253.108:8082/team/getAllTeam`, {headers: {"Access-Token": accessToken, "Email": accessEmail}})
        return response;
    },

    async getPlayerById(playerId, accessToken, accessEmail) {
        const response = await axios.post(`http://128.199.253.108:8082/player/getPlayerById`, {id: playerId}, {headers: {"Access-Token": accessToken, "Email": accessEmail}})
        return response;
    },

    async getAllCompetitions(accessToken, accessEmail) {
        const response = await axios.post(`http://128.199.253.108:8082/competition/getAllCompetition`, {}, {headers: {"Access-Token": accessToken, "Email": accessEmail}})
        return response;
    },

    async createNewCompetition(day, days, name, accessToken, accessEmail) {
        const response = await axios.post(`http://128.199.253.108:8082/competition/addCompetition`, {competitionDay: day, competitionDays: days, competitionName: name, teamId: 0}, {headers: {"Access-Token": accessToken, "Email": accessEmail}})
        return response;
    },

    async createBowler(photoURL, availability, email, gender, name, notPreferredTM, phone, posPref, preferredTM, notes, accessToken, accessEmail) {
        const response = await axios.post(`http://128.199.253.108:8082/player/addPlayer`, {photoUrl: photoURL, playerAvailability: availability, playerEmail: email, playerGender: gender, playerName : name, playerNotPreferTeammates: notPreferredTM, playerPhone: phone, playerPosPreference: posPref, playerPreferTeammates: preferredTM, recentPerformance: 0, id: 0, notes: notes}, {headers: {"Access-Token": accessToken, "Email": accessEmail}})
        return response;
    },

    async getAllPlayers(availability, maxPerformance, minPerformance, sortOrder, sortField, favPosition, accessToken, accessEmail) {
        const response = await axios.post(`http://128.199.253.108:8082/player/getAllPlayer`, {searching: {availability: availability, maxScore: maxPerformance, minScore: minPerformance, order: {direction: sortOrder, sortField: sortField}, position: favPosition}}, {headers: {"Access-Token": accessToken, "Email": accessEmail}})
        return response;
    },

    async deletePerformanceById(competitionId, performanceId, matchTime, performanceScore, playerId, accessToken, accessEmail) {
        const response = await axios.post(`http://128.199.253.108:8082/player/deleteMatchPerformanceById`, {competitionId: competitionId, id: performanceId, matchTime: matchTime, performanceScore: performanceScore, playerId: playerId}, {headers: {"Access-Token": accessToken, "Email": accessEmail}})
        return response;
    },

    async updatePerformance(competitionId, competitionName, performanceId, matchTime, performanceScore, playerId, position, season, accessToken, accessEmail) {
        const response = await axios.post(`http://128.199.253.108:8082/player/updateMatchPerformance`, {competitionId: competitionId, competitionName: competitionName, id: performanceId, matchTime: matchTime, performanceScore: performanceScore, playerId: playerId, position: position, season: season}, {headers: {"Access-Token": accessToken, "Email": accessEmail}})
        return response;
    },

    async getFilteredUserPerformances(competitionId, season, playerId, accessToken, accessEmail) {
        const response = await axios.post(`http://128.199.253.108:8082/player/getUserPerformancesByFilter`, {paging: {currentPage: 0, pageSize: 0, total:0}, searching: {competitionId: competitionId, season: season, playerId: playerId}}, {headers: {"Access-Token": accessToken, "Email": accessEmail}})
        return response;
    },

    async updatePlayer(playerDetails, accessToken, accessEmail) {
        const response = await axios.post(`http://128.199.253.108:8082/player/updatePlayer`, playerDetails, {headers: {"Access-Token": accessToken, "Email": accessEmail}})
        return response;
    },

    async getAllPlayerPerformances(playerId, accessToken, accessEmail) {
        const response = await axios.post(`http://128.199.253.108:8082/player/getUserPerformances`, {paging: {currentPage: 0, pageSize: 0, total:0}, searching: {playerId: playerId}}, {headers: {"Access-Token": accessToken, "Email": accessEmail}})
        return response;
    },

    async deletePlayerById(playerId, accessToken, accessEmail) {
        const response = await axios.post(`http://128.199.253.108:8082/player/deletePlayerById`, {id: playerId}, {headers: {"Access-Token": accessToken, "Email": accessEmail}})
        return response;
    },

    async deleteTeam(teamId, teamName, accessToken, accessEmail) {
        const response = await axios.post(`http://128.199.253.108:8082/team/deleteTeam`, {id: teamId, teamName: teamName, leadBowlerId1: 0, leadBowlerId2: 0, leadBowlerId3:0, leadBowlerId4:0, leadBowlerName1: "", leadBowlerName2: "", leadBowlerName3: "", leadBowlerName4:"", secondBowlerId1:0, secondBowlerId2: 0, secondBowlerId3: 0, secondBowlerId4: 0, secondBowlerName1:"", secondBowlerName2:"", secondBowlerName3:"", secondBowlerName4: "", skipBowlerId1:0, skipBowlerId2: 0, skipBowlerId3: 0, skipBowlerId4:0, skipBowlerName1: "", skipBowlerName2: "", skipBowlerName3: "", skipBowlerName4:"", thirdBowlerId1:0, thirdBowlerId2:0, thirdBowlerId3:0, thirdBowlerId4:0, thirdBowlerName1:"", thirdBowlerName2:"", thirdBowlerName3: "", thirdBowlerName4:""}, {headers: {"Access-Token": accessToken, "Email": accessEmail}})
        return response;
    },

    async createTeam(teamName, accessToken, accessEmail) {
        const response = await axios.post(`http://128.199.253.108:8082/team/addTeam`, {teamName: teamName, leadBowlerId1: 0, leadBowlerId2: 0, leadBowlerId3:0, leadBowlerId4:0, leadBowlerName1: "", leadBowlerName2: "", leadBowlerName3: "", leadBowlerName4:"", secondBowlerId1:0, secondBowlerId2: 0, secondBowlerId3: 0, secondBowlerId4: 0, secondBowlerName1:"", secondBowlerName2:"", secondBowlerName3:"", secondBowlerName4: "", skipBowlerId1:0, skipBowlerId2: 0, skipBowlerId3: 0, skipBowlerId4:0, skipBowlerName1: "", skipBowlerName2: "", skipBowlerName3: "", skipBowlerName4:"", thirdBowlerId1:0, thirdBowlerId2:0, thirdBowlerId3:0, thirdBowlerId4:0, thirdBowlerName1:"", thirdBowlerName2:"", thirdBowlerName3: "", thirdBowlerName4:""}, {headers: {"Access-Token": accessToken, "Email": accessEmail}})
        return response;
    },

    async uploadImage(formData) {
        const response = await axios.post("http://128.199.253.108:9092/upload", formData)
        return response;
    },

    async getTeamMembersPhotoURL(team, accessToken, accessEmail) {
        const response = await axios.post("http://128.199.253.108:8082/team/getTeamPlayerPhotos", team, {headers: {"Access-Token": accessToken, "Email": accessEmail}})
        return response
    },

    async addMatchPerformance(compId, compName, matchTime, performanceScore, playerId, position, season, accessToken, accessEmail) {
        const response = await axios.post(`http://128.199.253.108:8082/player/addMatchPerformance`, {competitionId: compId, competitionName: compName, matchTime: matchTime, performanceScore: performanceScore, playerId: playerId, position: position, season: season}, {headers: {"Access-Token": accessToken, "Email": accessEmail}})
        return response
    },

    async getDetailedTeamById(teamId, accessToken, accessEmail) {
        const response = await axios.post(`http://128.199.253.108:8082/team/getTeamPlayerDetails`, {id: teamId}, {headers: {"Access-Token": accessToken, "Email": accessEmail}})
        return response;
    },
}
