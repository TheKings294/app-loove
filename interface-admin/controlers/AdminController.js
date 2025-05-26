import {AdminModel} from "../model/AdminModel.js";
import {ListAdmin} from "../component/ListAdmin.js";
import {Toast} from "../component/Toast.js";

export class AdminController
{
    constructor() {
        this.model = new AdminModel()
    }
    async getAdminList(navigate) {
        const result = await this.model.getAllAdmins()

        if (result.message === 'login' && !result.success) {
            navigate('login')
            return
        }
        return new ListAdmin(result.data).render()
    }
    async newAdmin(navigate, email, password) {
        const result = await this.model.newAdmin(email, password)
        console.log(result.data)

        if (result.message === 'login' && !result.success) {
            location.reload();
            return
        }
        if (result.data.success === false) {
            new Toast(result.data.message, "alert-error").render()
            return
        }
        new Toast("User created").render()
    }
}