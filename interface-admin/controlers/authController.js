import {UserModel} from "../model/userModel.js";

export class AuthController {

    constructor() {
        this.model = new UserModel()
    }
    async checkAuth(requiredRole = null) {
        const isGood = await this.model.checkIsGood()
        if (!this.model.isAuthenticated()) return false;
        if (requiredRole && !this.model.hasRole(requiredRole)) return false;
        if (isGood.data.code === 1000) {
            this.logout()
            return false
        }
        return true;
    }
    logout() {
        localStorage.clear()
    }
}