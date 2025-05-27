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
            credentials: 'include',
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
}