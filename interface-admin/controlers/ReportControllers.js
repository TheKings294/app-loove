import {ReportModel} from "../model/ReportModel.js";
import {ReportList} from "../component/ReportList.js";
import {UserAdminModel} from "../model/userAdminModel.js";

export class ReportControllers {
    constructor() {
        this.model = new ReportModel()
        this.user = new UserAdminModel()
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

        if (grid.children.length === 0) {
            grid.innerHTML = `
            <p class="text-4xl text-primary">Auccun signalement a traité</p>
            `
            grid.className = "text-center flex flex-col justify-center content-center"
        }

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