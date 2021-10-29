import Cookies from 'universal-cookie'
const cookies = new Cookies();

export const Auth = {

    getRole() {
        return cookies.get("role");
    },

    getToken() {
        return cookies.get("token"); 
    },

    getEmail() {
        return cookies.get("email");
    },

    login(token, email, role) {
        cookies.set("token", token, {path: '/'})
        cookies.set("email", email, {path: '/'})
        cookies.set("role", role, {path: '/'})
    },

    logout() {
        cookies.remove("token", { path: '/' });
        cookies.remove("email", { path: '/' });
        cookies.remove("role", { path: '/' });
    },

    isLoggedIn() {
        if (cookies.get("token") !== undefined && cookies.get("email") !== undefined) {
            return true
        } else {
            return false
        }
    },

    isAdmin() {
        return (cookies.get("role") === "admin")
    },

    isSelector() {
        return (cookies.get("role") === "selector")
    }
}