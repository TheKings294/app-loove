import {BASE_URL} from "../Constant.js";

export class UserModel {
    constructor() {
        this.token = localStorage.getItem("token")
        this.role = localStorage.getItem("role")
        this.id = localStorage.getItem("id")
    }
    async login(email, password) {
        return await fetch(`${BASE_URL}/users/login`, {
            method: 'POST',
            credentials: 'include',
            body: new URLSearchParams({
                email: email,
                password: password
            })
        })
            .then(reponse => reponse.json())
            .then(data => {
                return {success: true, data: data}
            })
            .catch(error => {
                return {success: false, message: error.message}
            })
    }
    async singin(formData) {
        return await fetch(`${BASE_URL}/users/new`, {
            method: 'POST',
            credentials: 'include',
            body: formData
        })
            .then(reposne => reposne.json())
            .then(data => {
                return {success: true, message: data}
            })
            .catch(error => {
                return {success: false, message: error.message}
            })
    }
    async checkIsGood() {
        return await fetch(`${BASE_URL}`, {
            method: 'GET',
            credentials: 'include',
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
    async getUserCompatible(x, y) {
        return await fetch(`${BASE_URL}/users/compatible/${x}/${y}/${this.id}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Authorization': 'Bearer ' + this.token
            }
        })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 401) {
                        localStorage.clear()
                        this.token = null
                        this.role = null
                        this.id = null
                        document.cookie = "session_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.clink.local;"
                        return {success: false, message: "login"}
                    }
                }
                return response.json()
            })
            .then(data => {
                return {success: true, data: data}
            })
            .catch(error => {
                return {success: false, message: error.message}
            })
    }
    async getConv() {
        return await fetch(`${BASE_URL}/conv/${localStorage.getItem('id')}`, {
            method: 'GET',
            credentials: "include",
            headers: {
                'Authorization' : "Bearer " + this.token
            }
        })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 401) {
                        localStorage.clear()
                        this.token = null
                        this.role = null
                        this.id = null
                        document.cookie = "session_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.clink.local;"
                        return {success: false, message: "login"}
                    }
                }
                return response.json()
            })
            .then(data => {
                return {success: true, data: data.data}
            })
            .catch(error => {
                return {success: false, message: error.message}
            })
    }
    async setLike(user_ID, liked_ID) {
        return await fetch(`${BASE_URL}/like/${user_ID}/${liked_ID}`, {
            method: 'GET',
            credentials: "include",
            headers: {
                'Authorization': "Bearer " + this.token
            }
        })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 401) {
                        localStorage.clear()
                        this.token = null
                        this.role = null
                        this.id = null
                        document.cookie = "session_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.clink.local;"
                        return {success: false, message: "login"}
                    }
                }
                return response.json()
            })
            .then(data => {
                return {success: true, data: data}
            })
            .catch(error => {
                return {success: false, message: error.message}
            })
    }
    async setUnLike(user_ID, liked_ID) {
        return await fetch(`${BASE_URL}/unlike/${user_ID}/${liked_ID}`, {
            method: 'GET',
            credentials: "include",
            headers: {
                'Authorization': "Bearer " + this.token
            }
        })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 401) {
                        localStorage.clear()
                        this.token = null
                        this.role = null
                        this.id = null
                        document.cookie = "session_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.clink.local;"
                        return {success: false, message: "login"}
                    }
                }
                return response.json()
            })
            .then(data => {
                return {success: true, data: data}
            })
            .catch(error => {
                return {success: false, message: error.message}
            })
    }
    async getUserInfo() {
        return await fetch(`${BASE_URL}/users/${this.id}`, {
            method: 'GET',
            credentials: "include",
            headers: {
                'Authorization': 'Bearer ' + this.token
            }
        })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 401) {
                        localStorage.clear()
                        this.token = null
                        this.role = null
                        this.id = null
                        document.cookie = "session_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.clink.local;"
                        return {success: false, message: "login"}
                    }
                }
                return response.json()
            })
            .then(data => {
                return {success: true, data: data}
            })
            .catch(error => {
                return {success: false, message: error.message}
            })
    }
    async editUser(formData) {
        return await fetch(`${BASE_URL}/users/edit/${this.id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Authorization': 'Bearer ' + this.token
            },
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 401) {
                        localStorage.clear()
                        this.token = null
                        this.role = null
                        this.id = null
                        document.cookie = "session_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.clink.local;"
                        return {success: false, message: "login"}
                    }
                }
                return response.json()
            })
            .then(data => {
                return {success: true, data: data}
            })
            .catch(error => {
                return {success: false, message: error.message}
            })
    }
    async editPassword(formData) {
        return await fetch(`${BASE_URL}/users/edit/password/${this.id}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Authorization': 'Bearer ' + this.token
            },
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 401) {
                        localStorage.clear()
                        this.token = null
                        this.role = null
                        this.id = null
                        document.cookie = "session_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.clink.local;"
                        return {success: false, message: "login"}
                    }
                }
                return response.json()
            })
            .then(data => {
                return {success: true, data: data}
            })
            .catch(error => {
                return {success: false, message: error.message}
            })
    }
    async deleteUser() {
        return await fetch(`${BASE_URL}/users/delete/${this.id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Authorization': 'Bearer ' + this.token
            }
        })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 401) {
                        localStorage.clear()
                        this.token = null
                        this.role = null
                        this.id = null
                        document.cookie = "session_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.clink.local;"
                        return {success: false, message: "login"}
                    }
                }
                return response.json()
            })
            .then(data => {
                return {success: true, data: data}
            })
            .catch(error => {
                return {success: false, message: error.message}
            })
    }
    async unCo() {
        await fetch(`${BASE_URL}/logout`, {
            method: 'POST',
            credentials: "include"
        })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 401) {
                        localStorage.clear()
                        this.token = null
                        this.role = null
                        this.id = null
                        document.cookie = "session_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.clink.local;"
                        return {success: false, message: "login"}
                    }
                }
                return response.json()
            })
            .then(data => {
                return {success: true, data: data}
            })
            .catch(error => {
                return {success: false, message: error.message}
            })
    }
    async getAllMessages(convID) {
        return await fetch(`${BASE_URL}/messages/${convID}`, {
            method: 'GET',
            credentials: "include",
            headers: {
                'Authorization': 'Bearer ' + this.token
            }
        })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 401) {
                        localStorage.clear()
                        this.token = null
                        this.role = null
                        this.id = null
                        document.cookie = "session_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.clink.local;"
                        return {success: false, message: "login"}
                    }
                }
                return response.json()
            })
            .then(data => {
                return {success: true, data: data}
            })
            .catch(error => {
                return {success: false, message: error.message}
            })
    }
    async sendMessage(formData, idA, idB, convID) {
        return await fetch(`${BASE_URL}/message/new/${idA}/${idB}/${convID}`, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Authorization': 'Bearer ' + this.token
            },
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 401) {
                        localStorage.clear()
                        this.token = null
                        this.role = null
                        this.id = null
                        document.cookie = "session_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.clink.local;"
                        return {success: false, message: "login"}
                    }
                }
                return response.json()
            })
            .then(data => {
                return {success: true, data: data}
            })
            .catch(error => {
                return {success: false, message: error.message}
            })
    }
    async setPremium(date) {
        return await fetch(`${BASE_URL}/users/premium/${this.id}/${date}`, {
            method: 'PATCH',
            headers: {
                'Authorization': 'Bearer ' + this.token
            }
        })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 401) {
                        localStorage.clear()
                        this.token = null
                        this.role = null
                        this.id = null
                        return {success: false, message: "login"}
                    }
                }
                return response.json()
            })
            .then(data => {
                return {success: true, data: data}
            })
            .catch(error => {
                return {success: false, message: error.message}
            })
    }
    async validate(code, id) {
        return await fetch(`${BASE_URL}/users/validate/${id}/${code}`, {
            method: 'PATCH',
        })
            .then(reponse => reponse.json())
            .then(data => {
                return {success: true, data: data}
            })
            .catch(error => {
                return {success: false, message: error.message}
            })
    }
    isAuthenticated() {
        return !!this.token
    }
    hasRole(role) {
        return this.role === role
    }
}