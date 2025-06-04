import {UserModel} from "../models/UserModel.js";
import {Toast} from "../component/Toast.js";

export class SettingController {
    constructor() {
        this.model = new UserModel()
    }
    async getUserInfo() {
        const data = await this.model.getUserInfo()

        console.log(data)
        return data
    }
    async editUser() {
        const LN = document.getElementById("last_name").value
        const FN = document.getElementById("first_name").value
        const DOB = document.getElementById("date_of_birth").value
        const gender = document.getElementById("gender").value
        const city = document.getElementById("city").value
        const bio = document.getElementById("bio").value
        const GA = document.getElementById("gender_attraction").value
        const AA = document.getElementById("age_attraction").value
        const RT = document.getElementById("relation_type").value

        const allFields = [
            LN, FN, DOB, gender, city, bio, GA, AA, RT
        ]

        if (!allFields.every(Boolean)) {
            new Toast("Tous les champs sont obligatoire", "alert-error").render()
            return false
        }

        const formData = new FormData();

        formData.append("firstName", FN)
        formData.append("lastName", LN)
        formData.append("dateOfBirth", DOB)
        formData.append("gender", gender)
        formData.append("city", city)
        formData.append("description", bio)
        formData.append("genderAttraction", GA)
        formData.append("ageAttraction", AA)
        formData.append("relationType", RT)
        formData.append("email", localStorage.getItem("email"))
        formData.append("isVerified", 'false')
        formData.append("isSuspended", 'false')
        formData.append("isBan", 'false')
        formData.append("isDeleted", 'false')
        formData.append("isPremium", 'false')
        formData.append("endSuspendedDate", 'false')

        const result = await this.model.editUser(formData)

        if (!result.success) {
            new Toast(result.message, 'alert-error').render()
            return false
        }

        new Toast(result.data.message, 'alert-success').render()
        return false
    }
    async editPassword() {
        const AP = document.getElementById("actual_mp").value
        const NP = document.getElementById("new_mp").value
        const CNP = document.getElementById("confirm_new_mp").value

        if (!AP === NP) {
            new Toast("Le mot de passe doit être différant de l'acien", 'alert-error').render()
            return false
        }

        if (!NP === CNP) {
            new Toast("Le mot de passe et sa confirmation doivent être identique", 'alert-error').render()
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
        return false
    }
    async deleteUser() {
        const result = await this.model.deleteUser()

        if (!result.success) {
            new Toast(result.message, 'alert-error').render()
            return false
        }

        new Toast(result.data.message, 'alert-success').render()
        return false
    }
    async unCo() {
        await this.model.unCo()
        localStorage.clear()
        document.cookie = "session_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.clink.local;"
        window.location.reload()
    }
}