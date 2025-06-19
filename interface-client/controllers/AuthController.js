import {UserModel} from "../models/UserModel.js";

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
        document.cookie = "session_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.clink.test;"
    }
}