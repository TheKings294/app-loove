import {AuthController} from "../controlers/authController.js";

export class UserModel
{
    constructor()
    {
        this.token = "Bearer " + localStorage.getItem("token")
        this.role = localStorage.getItem('role')
    }
    async login(email, password)
    {
        return await fetch('https://api.clink.test/login-admin', {
            method: 'POST',
            body: new URLSearchParams({
                email: email,
                password: password
            })
        })
            .then(response => response.json())
            .then(data => {
                return {success: true, data: data}
            })
            .catch(error => {
                return {success: false, message: error.message}
            })
    }

    async getAll()
    {
             return await fetch("https://api.clink.test/users", {
                 method: 'GET',
                headers: {
                    'Authorization': this.token
                }
            })
                 .then(reponse => {
                     if (!reponse.ok) {
                         if (reponse.status === 401) {
                             localStorage.clear()
                             this.token = null
                             this.role = null
                             document.cookie = "session_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.clink.local;"
                             return {success: false, message: "login"}
                         }
                     }
                     return reponse.json()
                 })
                 .then(data => {
                     return {success: true, data: data}
                 })
                 .catch(error => {
                     return { success: false, message: error.message }
                 })
    }

    async checkIsGood() {
        return await fetch("https://api.clink.test", {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem("token") ? this.token : 0
            }
        })
            .then(reponse => reponse.json())
            .then(data => {
                return {success: true, data: data}
            })
            .catch(error => {
                return { success: false, message: error.message }
            })
    }
    async ban(id) {
        return await fetch(`https://api.clink.test/users/ban/${id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': this.token
            }
        })
            .then(reponse => {
                if (!reponse.ok) {
                    if (reponse.status === 401) {
                        localStorage.clear()
                        this.token = null
                        this.role = null
                        return {success: false, message: "login"}
                    }
                }
                return reponse.json()
            })
            .then(data => {
                return {success: true, data: data}
            })
            .catch(error => {
                return { success: false, message: error.message }
            })
    }
    async suspend(id, date) {
        return await fetch(`https://api.clink.test/users/suspended/${id}/${date}`, {
            method: 'PATCH',
            headers: {
                'Authorization': this.token
            }
        })
            .then(reponse => {
                if (!reponse.ok) {
                    if (reponse.status === 401) {
                        localStorage.clear()
                        this.token = null
                        this.role = null
                        return {success: false, message: "login"}
                    }
                }
                return reponse.json()
            })
            .then(data => {
                return {success: true, data: data}
            })
            .catch(error => {
                return { success: false, message: error.message }
            })
    }
    isAuthenticated() {
        return !!this.token
    }
    hasRole(role) {
        return this.role === role
    }
}