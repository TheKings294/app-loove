import {UserModel} from "../model/userModel.js";

export class AuthController {

    constructor() {
        this.user = new UserModel()
    }
    checkAuth(requiredRole = null)
    {
        if (!this.user.isAuthenticated()) return false;
        if (requiredRole && !this.user.hasRole(requiredRole)) return false;
        return true;
    }
}