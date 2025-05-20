import {NavComponent} from "../component/NavComponent.js";

export class AdminViews
{
    render(navigate) {
        const nav = new NavComponent()
        const el  = document.querySelector(".app")
        el.innerHTML = ''
        nav.render(navigate, el)
        const main = document.createElement("div")
        const title = document.createElement("div");
        title.className = "flex justify-center m-auto text-2xl font-bold mb-4 flex-1";
        title.textContent = "Modérateurs";
        main.classList.add("flex-1")
        main.appendChild(title)
        //main.appendChild(await this.controller.getUsersList())
        el.appendChild(main)
    }
}