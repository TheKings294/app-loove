import {UserModel} from "../model/userModel.js";
export class LoginController
{
    constructor() {
        this.userModel = new UserModel()
    }
    async login(email, password)
    {
        const result= await this.userModel.login(email, password)
        return result.success
    }
}