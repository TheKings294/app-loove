import {StatsModel} from "../model/StatsModel.js";
import {UserAdminModel} from "../model/userAdminModel.js";

export class PremiumController {
    constructor() {
        this.modelStats = new StatsModel()
        this.modelUser = new UserAdminModel()
    }

    async getPremiumUser() {
        return await this.modelUser.getPremiumUser()
    }
    async getStatsPaypal() {
        return await this.modelStats.getStatsPaypal()
    }
}