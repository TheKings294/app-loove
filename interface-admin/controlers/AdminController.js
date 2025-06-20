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
        return result
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
    async editMyPassword() {
        const MP = document.getElementById('mp').value
        const NP = document.getElementById('np').value
        const CNP = document.getElementById("cnp").value

        if (MP === NP) {
            new Toast("Votre nouveau mot de passe doit être différant de l'ancien").render()
            return false
        }

        if (NP !== CNP) {
            new Toast("Les mots de passe ne sont pas identique").render()
            return false
        }
        const formData = new FormData()
        formData.append("password", NP)
        const result = await this.model.editPassword(formData)

        if (!result.success) {
            new Toast(result.message, 'alert-error').render()
            return false
        }

        new Toast(result.data.message, 'alert-success').render()
        return true
    }
}