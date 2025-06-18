import {NavComponent} from "../component/NavComponent.js";
import {StatsController} from "../controlers/StatsController.js";

export class StatsViews
{
    constructor() {
        this.controller = new StatsController()
    }
    async render(navigate) {
        const nav = new NavComponent()
        const el  = document.querySelector(".app")
        el.innerHTML = ''
        nav.render(navigate, el)
        const main = document.createElement("div")
        const title = document.createElement("div");
        title.className = "flex justify-center m-auto text-2xl font-bold mb-4 flex-1";
        title.textContent = "Statistiques";
        main.classList.add("flex-1")
        main.appendChild(title)
        main.appendChild(await this.controller.getAllStats())
        el.appendChild(main)
    }
}