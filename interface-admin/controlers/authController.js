import {UserModel} from "../model/userModel.js";

export class AuthController {

    constructor() {
        this.user = new UserModel()
    }
    async checkAuth(requiredRole = null)
    {
        const isGood = await this.user.checkIsGood()
        console.log(isGood)
        if (!this.user.isAuthenticated()) return false;
        if (requiredRole && !this.user.hasRole(requiredRole)) return false;
        if (isGood.data.code === 1000) return false;
        return true;
    }
    logout() {
        localStorage.clear()
        document.cookie = "session_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.clink.local;"
    }
}