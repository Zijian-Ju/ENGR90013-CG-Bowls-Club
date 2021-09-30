import axios from 'axios';


export const API = {

    async sayHello() {
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
    }
}
