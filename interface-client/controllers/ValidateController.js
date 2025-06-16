import {UserModel} from "../models/UserModel.js";
import {Toast} from "../component/Toast.js";

export class ValidateController {
    constructor() {
        this.model = new UserModel()
    }
    async sendCode(code, navigate) {
        const userID = localStorage.getItem("id")

        const result = await this.model.validate(code, userID)

        if (!result.success) {
            new Toast(result.message, 'alert-error').render()
            return false
        }

        if (!result.data.success) {
            new Toast(result.data.message, 'alert-error').render()
            return
        }
        navigate('login')
    }
}