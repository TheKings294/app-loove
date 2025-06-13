export class ReportModel {
    constructor() {
        this.token = "Bearer " + localStorage.getItem("token")
    }
    async getAllReports() {
        return await fetch('https://api.clink.test/reports', {
            method: 'GET',
            headers: {
                'Authorization': this.token
            },
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
    async setEnd(id) {
        return await fetch(`https://api.clink.test/reports/finish/${id}`, {
            method: 'POST',
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
}