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
        try {
            const response = await fetch('https://api.clink.test/login-admin', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                credentials: 'include',
                body: new URLSearchParams({
                    email: email,
                    password: password
                })
            })
            const data = await response.json()

            if (!response.ok) throw new Error(data.message)

            localStorage.setItem("token", data.token)
            localStorage.setItem("role", data.role)
            this.token = data.token
            this.role = data.role
            return { success: true }
        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    async getAll()
    {
             return fetch("https://api.clink.test/users", {
                 method: 'GET',
                 credentials: "include",
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
            credentials: 'include',
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
    isAuthenticated() {
        return !!this.token
    }
    hasRole(role) {
        return this.role === role
    }
}