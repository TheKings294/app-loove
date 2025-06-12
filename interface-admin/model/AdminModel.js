export class AdminModel
{
    constructor() {
        this.token = "Bearer " + localStorage.getItem("token")
    }
    async getAllAdmins() {
        return await fetch('https://api.clink.test/users-admin', {
            method: 'GET',
            headers:  {
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
                return {success: false, message: error.message}
            })
    }
    async newAdmin(email, password) {
        return await fetch('https://api.clink.test/users-admin/new', {
            method: 'POST',
            headers: {
                'Authorization': this.token
            },
            body: new URLSearchParams({
                email: email,
                password: password
            })
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
                return {success: false, message: error.message}
            })
    }
    async checkIsGood() {
        return await fetch("https://api.clink.test", {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem("token") ? 'Bearer ' + localStorage.getItem("token") : 0
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
}