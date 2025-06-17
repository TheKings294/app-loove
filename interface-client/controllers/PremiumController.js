import {LikeRepo} from "../models/LikeRepo.js";
import {User} from "../component/User.js";

export class PremiumController {
    constructor() {
        this.model = new LikeRepo()
    }
    async getMyLike() {
        const result = await this.model.getMyLike()

        const contentUserElement = document.createElement("div")
        contentUserElement.className = "flex flex-col items-center gap-4 my-8"

        result.data.data.forEach((user) => {
            const name = user.first_name + " " + user.last_name
            new User(name, user.image).render(result, contentUserElement)
        })
        if (contentUserElement.children.length === 0) {
            contentUserElement.innerHTML = `
            <p>Auccun utilisateur trouvé</p>
            `
        }
        return contentUserElement
    }
    async getMyUnlike() {
        const result = await this.model.getMyUnlike()

        const contentUserUnLikeElement = document.createElement("div")
        contentUserUnLikeElement.className = "flex flex-col items-center gap-4 my-8"

        result.data.data.forEach((user) => {
            const name = user.first_name + " " + user.last_name
            new User(name, user.image).render(result, contentUserUnLikeElement)
        })

        if (contentUserUnLikeElement.children.length === 0) {
            contentUserUnLikeElement.innerHTML = `
            <p>Auccun utilisateur trouvé</p>
            `
        }
        return contentUserUnLikeElement
    }
}