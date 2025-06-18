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
        const searchDiv = document.createElement("div")
        searchDiv.className = "flex flex-row gap-3 justify-center"
        searchDiv.innerHTML = `
        <input type="text" placeholder="Utilisateur" class="input" id="search"/>
        <button class="btn btn-secondary" id="sendSearch">Recherché</button>
        `
        main.appendChild(searchDiv)

        const data = await this.controller.getUsersList()
        if (!data) {
            navigate('login')
        }
        new ListUser(data).render(main)

        const btnPagination = document.createElement("div")
        btnPagination.className = 'join grid grid-cols-2 ml-180 mr-180 mt-10'
        btnPagination.innerHTML = `
        <button class="join-item btn btn-outline" id="prev">Previous page</button>
        <button class="join-item btn btn-outline" id="next">Next</button>
        `
        main.appendChild(btnPagination)

        this.app.appendChild(main)

    }
}