import {ReportModel} from "../model/ReportModel.js";
import {ReportList} from "../component/ReportList.js";

export class ReportControllers {
    constructor() {
        this.model = new ReportModel()
    }

    async getAllReports() {
        const result = await this.model.getAllReports()

        const grid = document.createElement("div")
        grid.className = "ml-2 mr-2 grid grid-cols-4 gap-4"

        result.data.forEach((element) => {
            new ReportList('Report ' + element.id, element.why_reported).render(grid)
            console.log(element)
        })

        return grid
    }
}