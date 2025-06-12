export class ReportModel {
    constructor() {
        this.token = localStorage.getItem("token")
        this.role = localStorage.getItem("role")
        this.id = localStorage.getItem("id")
    }
    async newReport(formData) {
        return await fetch('https://api.clink.test/reports/new', {
            method: 'POST',
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
}