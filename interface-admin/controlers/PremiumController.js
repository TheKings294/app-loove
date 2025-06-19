import {StatsModel} from "../model/StatsModel.js";
import {UserModel} from "../model/userModel.js";

export class PremiumController {
    constructor() {
        this.modelStats = new StatsModel()
        this.modelUser = new UserModel()
    }

    async getPremiumUser() {
        return await this.modelUser.getPremiumUser()
    }
    async getStatsPaypal() {
        return await this.modelStats.getStatsPaypal()
    }
}