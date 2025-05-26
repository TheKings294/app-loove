import {NavComponent} from "../component/NavComponent.js";
import {UsersController} from "../controlers/UsersController.js";
import {ListUser} from "../component/ListUser.js";

export class UsersViews
{
    constructor() {
        this.controller = new UsersController()
        this.app = document.querySelector(".app")
    }
    async render(navigate) {
        const nav = new NavComponent()
        this.app.innerHTML = ""
        nav.render(navigate)
        const main = document.createElement("div")
        const title = document.createElement("div");
        title.className = "flex justify-center m-auto text-2xl font-bold mb-4 flex-1";
        title.textContent = "Utilisateurs";
        main.classList.add("flex-1")
        main.appendChild(title)
        const data = await this.controller.getUsersList()
        if (!data) {
            navigate('login')
        }
        new ListUser(data).render(main)
        this.app.appendChild(main)

    }
}