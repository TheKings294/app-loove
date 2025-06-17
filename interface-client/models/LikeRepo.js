export class LikeRepo {
    constructor() {
        this.token = localStorage.getItem("token")
        this.role = localStorage.getItem("role")
        this.id = localStorage.getItem("id")
    }
    async getMyLike() {
        return await fetch(`https://api.clink.test/like/${this.id}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        })
            .then(reponse => reponse.json())
            .then(data => {
                return {success: true, data: data}
            })
            .catch(error => {
                return {success: false, message: error.message}
            })
    }
    async getMyUnlike() {
        return await fetch(`https://api.clink.test/unlike/${this.id}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        })
            .then(reponse => reponse.json())
            .then(data => {
                return {success: true, data: data}
            })
            .catch(error => {
                return {success: false, message: error.message}
            })
    }
}