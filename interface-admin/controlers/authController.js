import {UserAdminModel} from "../model/userAdminModel.js";

export class AuthController {

    constructor() {
        this.model = new UserAdminModel()
    }
    async checkAuth(requiredRole = null, navigate) {
        const isGood = await new UserAdminModel().checkIsGood()
        if (!this.model.isAuthenticated()) return false;
        if (requiredRole && !this.model.hasRole(requiredRole)) return false;
        if (isGood.data.code === 1000) {
            this.logout()
            navigate('login')
            return false
        }
        return true;
    }
    logout() {
        localStorage.clear()
    }
}