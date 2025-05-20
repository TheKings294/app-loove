import {UserModel} from "../model/userModel.js";

export class UsersController
{
    constructor() {
        this.model = new UserModel()
    }
    async getUsersList() {
        console.log(await this.model.getAll())

        const div = document.createElement("p")
        div.textContent = "Dans les log"
        return div
    }
}