import {UserModel} from "../models/UserModel.js";

export class InboxController {
    constructor() {
        this.model = new UserModel()
    }
    async getConv() {
        return await this.model.getConv()
    }
}