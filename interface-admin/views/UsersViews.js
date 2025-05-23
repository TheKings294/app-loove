import {NavComponent} from "../component/NavComponent.js";
import {UsersController} from "../controlers/UsersController.js";

export class UsersViews
{
    constructor() {
        this.controller = new UsersController()
    }
    async render(navigate) {
        const nav = new NavComponent()
        const el  = document.querySelector(".app")
        el.innerHTML = ''
        nav.render(navigate, el)
        const main = document.createElement("div")
        const title = document.createElement("div");
        title.className = "flex justify-center m-auto text-2xl font-bold mb-4 flex-1";
        title.textContent = "Utilisateurs";
        main.classList.add("flex-1")
        main.appendChild(title)
        main.appendChild(await this.controller.getUsersList())
        el.appendChild(main)

    }
}

//"v6h6o82ua76go0jqk2sfcla871"