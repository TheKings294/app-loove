import {UserModel} from "../models/UserModel.js";
import {Toast} from "../component/Toast.js";

export class SingInController {
    constructor() {
        this.model = new UserModel()
    }

    async singin(navigate) {
        const image = document.getElementById("avatarInput").files[0]
        const firstName = document.getElementById("first-name").value
        const lastName = document.getElementById("last-name").value
        const dateOfBirth = document.getElementById("age").value
        const gender = document.getElementById("gender").value
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value
        const checkPassword = document.getElementById("checkPassword").value
        const city = document.getElementById("city").value
        const bio = document.getElementById("bio").value
        const genderIWant = document.getElementById("genderIWant").value
        const ageIWant = document.getElementById("ageIWant").value

        const relation = document.querySelector('input[name="relation"]:checked').value

        const soft_1 = document.querySelector('input[name="rating-1"]:checked').value
        const soft_2 = document.querySelector('input[name="rating-2"]:checked').value
        const soft_3 = document.querySelector('input[name="rating-3"]:checked').value
        const soft_4 = document.querySelector('input[name="rating-4"]:checked').value
        const soft_5 = document.querySelector('input[name="rating-5"]:checked').value
        const soft_6 = document.querySelector('input[name="rating-6"]:checked').value
        const soft_7 = document.querySelector('input[name="rating-7"]:checked').value
        const soft_8 = document.querySelector('input[name="rating-8"]:checked').value
        const soft_9 = document.querySelector('input[name="rating-9"]:checked').value
        const soft_10 = document.querySelector('input[name="rating-10"]:checked').value

        const allFields= [
            image, firstName, lastName, dateOfBirth, gender, email, password, checkPassword, city,
            bio, genderIWant, ageIWant, relation, soft_1, soft_2, soft_3, soft_4, soft_5, soft_6,
            soft_7, soft_8, soft_9, soft_10
        ]

        if (password !== checkPassword) {
            new Toast("Mot de passe et confirmation sont différant", "alert-error").render()
            return false
        }

        if (!allFields.every(Boolean)) {
            new Toast("Tous les champs sont obligatoire", "alert-error").render()
            return false
        }

        const formData = new FormData();

        formData.append("image", image);
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("dateOfBirth", dateOfBirth);
        formData.append("gender", gender);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("city", city);
        formData.append("description", bio);
        formData.append("genderAttraction", genderIWant);
        formData.append("ageAttraction", ageIWant);
        formData.append("relationType", relation);
        formData.append("soft_1", soft_1);
        formData.append("soft_2", soft_2);
        formData.append("soft_3", soft_3);
        formData.append("soft_4", soft_4);
        formData.append("soft_5", soft_5);
        formData.append("soft_6", soft_6);
        formData.append("soft_7", soft_7);
        formData.append("soft_8", soft_8);
        formData.append("soft_9", soft_9);
        formData.append("soft_10", soft_10);

        const result  = await this.model.singin(formData)

        console.log(result.message)

        if (!result.success) {
            new Toast(result.message, "alert-error").render()
            return false
        }

        new Toast(result.message.message).render()
        localStorage.setItem("id", result.message.user_id)
        navigate("validate")
    }
}