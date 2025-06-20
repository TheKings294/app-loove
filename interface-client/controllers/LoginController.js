import {UserModel} from "../models/UserModel.js";
import {Toast} from "../component/Toast.js";
import {NotifController} from "./NotifController.js";

export class LoginController {
    constructor() {
        this.model = new UserModel()
    }
    async login(navigate) {
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value

        const result = await this.model.login(email, password)

        console.log(result)
        if (!result.success) {
            new Toast(result.message, 'alert-error').render()
            return
        }

        if (result.data.message === "Need Verification") {
            localStorage.setItem("id", result.data.id)
            navigate("validate")
            return
        }

        if (result.data.message === "Wrong password") {
            localStorage.clear()
            return
        }

        if (!result.data.token) {
            new Toast(result.data.message, 'alert-error').render()
            return
        }

        localStorage.clear()
        localStorage.setItem("token", result.data.token)
        localStorage.setItem("role", "user")
        localStorage.setItem("id", result.data.id)
        localStorage.setItem('premium', result.data.premium)

        if (!this.isMobile()) {
            const notif = new NotifController()
            console.log('user-' + result.data.id)
            notif.register()
                .then(() => notif.suscribe(result.data.id))
                .catch(console.error)
        }
        navigate("home")
    }
    isMobile() {
        const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        return regex.test(navigator.userAgent);
    }
}