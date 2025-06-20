import {UserAdminModel} from "../model/userAdminModel.js";
import {Toast} from "../component/Toast.js";

export class LoginController
{
    constructor() {
        this.userModel = new UserAdminModel()
    }
    async login(email, password, navigate)
    {
        const result = await this.userModel.login(email, password)
        console.log(result)
        if (!result.success) {
            new Toast(result.message, 'alert-error').render()
            return
        }

        localStorage.setItem("token", result.data.token)
        localStorage.setItem("role", result.data.role)
        localStorage.setItem("id", result.data.id)
        navigate("users")
    }
}