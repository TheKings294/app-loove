import {ReportModel} from "../models/ReportModel.js";
import {Toast} from "../component/Toast.js";

export class ReportController {
    constructor() {
        this.model = new ReportModel()
    }
    async newReport(id, otherID) {
        const image = document.getElementById("images").files[0]
        let value = document.getElementById("selectInput").value
        if (value == 1) {
            value = document.getElementById("otherValue").value
        }
        const formData = new FormData
        formData.append("user_reported", otherID)
        formData.append("user", id)
        formData.append("why_reported", value)
        formData.append('image', image)

        const result = await this.model.newReport(formData)

        if (!result.success) {
            new Toast(result.message, "alert-error").render()
            return false
        }

        new Toast("Signalement enregistré").render()
        return true
    }
}