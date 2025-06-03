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

    }
    async editPassword() {

    }
    async deleteUser() {

    }
    async unCo() {

    }
}

/*
*     private array $inputFields = ["firstName", "lastName", "dateOfBirth", "gender", "email", "password", "city",
        "description", "image", "genderAttraction", "ageAttraction", "relationType", "isVerified", "isSuspended",
        "isBan", "isDeleted", "isPremium", "endSuspendedDate"];
* */