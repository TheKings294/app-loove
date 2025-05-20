import {AuthController} from "../controlers/authController.js";

export class UserModel
{
    constructor()
    {
        this.token = localStorage.getItem('token')
        this.role = localStorage.getItem('role')
    }
    async login(email, password)
    {
        try {
            const response = await fetch('https://api.clink.local/login-admin', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
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
        const token = "Bearer " + localStorage.getItem("token")
             fetch("https://api.clink.local/users", {
                 method: 'GET',
                 credentials: "include",
                headers: {
                    'Authorization': token
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
                     console.error("Fetch error:", error)
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