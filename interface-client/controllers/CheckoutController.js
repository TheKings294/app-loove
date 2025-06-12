import {UserModel} from "../models/UserModel.js";

export class CheckoutController {
    constructor() {
        this.model = new UserModel()
    }

    async setPremium() {
       return await this.model.setPremium()
    }
}