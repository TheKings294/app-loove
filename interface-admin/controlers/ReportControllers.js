import {ReportModel} from "../model/ReportModel.js";
import {ReportList} from "../component/ReportList.js";
import {UserModel} from "../model/userModel.js";

export class ReportControllers {
    constructor() {
        this.model = new ReportModel()
        this.user = new UserModel()
        this.listCard = []
    }

    async getAllReports() {
        const result = await this.model.getAllReports()

        const grid = document.createElement("div")
        grid.className = "ml-2 mr-2 grid grid-cols-4 gap-4"

        result.data.forEach((element) => {
            const report = new ReportList('Report ' + element.id, element.why_reported, element.image ,element.user_reported, element.id)
            report.render(grid)
            this.listCard.push(report)
        })

        return grid
    }
    bindModal() {
        this.listCard.forEach((elemnt) => {
            elemnt.bind()
        })
    }

    async ban(id, report) {
        const resultBan = await this.user.ban(id)
        if (!resultBan.success) {
            return {success: resultBan.success, message: resultBan.message}
        }

        const resultReport = await this.model.setEnd(report)
        if (!resultReport.success) {
            return {success: resultReport.success, message: resultReport.message}
        }

        return  {success: true}
    }
    async suspend(id, date, report) {
        const suspendResult = await this.user.suspend(id, date)
        if (!suspendResult.success) {
            return {success: suspendResult.success, message: suspendResult.message}
        }

        const resultReport = await this.model.setEnd(report)
        if (!resultReport.success) {
            return {success: resultReport.success, message: resultReport.message}
        }

        return  {success: true}
    }
}