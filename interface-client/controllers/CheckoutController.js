import {UserModel} from "../models/UserModel.js";

export class CheckoutController {
    constructor() {
        this.model = new UserModel()
    }

    async setPremium(endDate) {
       return await this.model.setPremium(endDate)
    }
}