import {UserModel} from "../models/UserModel.js";
import {Toast} from "../component/Toast.js";

export class LikeController {
    constructor() {
        this.model = new UserModel()
    }
    async like(id) {
        const result = await this.model.setLike(localStorage.getItem('id'), id)

        if (!result.success) {
            new Toast(result.message, 'alert-error').render()
            return false
        }

        new Toast(result.data.message, 'alert-success').render()
    }
    async unlike(id) {
        const result = await this.model.setUnLike(localStorage.getItem('id'), id)

        if (!result.success) {
            new Toast(result.message, 'alert-error').render()
            return false
        }

        new Toast(result.data.message, 'alert-success').render()
    }
}