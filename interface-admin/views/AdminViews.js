import {NavComponent} from "../component/NavComponent.js";
import {AdminController} from "../controlers/AdminController.js";
import {ModalComponent} from "../component/ModalComponent.js";
import {Toast} from "../component/Toast.js";
import {Paginator} from "../helper/Paginator.js";
import {ListAdmin} from "../component/ListAdmin.js";


export class AdminViews
{
    constructor() {
        this.controller = new AdminController()
    }
    async render(navigate) {
        const nav = new NavComponent()
        const el  = document.querySelector(".app")
        el.innerHTML = ''
        nav.render(navigate, el)
        const main = document.createElement("div")
        const title = document.createElement("div");
        title.className = "flex justify-center m-auto text-2xl font-bold mb-4 flex-1";
        title.textContent = "Modérateurs";
        const addAdmin = document.createElement("div");
        addAdmin.className = "flex justify-center m-auto text-2xl font-bold mb-4 flex-1";
        addAdmin.innerHTML = `
        <button class="btn btn-primary" id="newAdmin">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
        class="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
        Ajouté un Modérateur
        </button>
        `
        const searchDiv = document.createElement("div")
        searchDiv.className = "flex flex-row gap-3 justify-center"
        searchDiv.innerHTML = `
        <input type="text" placeholder="Administrateur" class="input" id="search"/>
        <button class="btn btn-secondary" id="sendSearch">Recherché</button>
        `
        const btnPagination = document.createElement("div")
        btnPagination.className = 'join grid grid-cols-2 ml-30 mr-30 mt-10'
        btnPagination.innerHTML = `
        <button class="join-item btn btn-outline" id="prev">Previous page</button>
        <button class="join-item btn btn-outline" id="next">Next</button>
        `
        const contentDiv = document.createElement("div")
        contentDiv.id = "listDiv"

        const result = await this.controller.getAdminList(navigate)

        main.classList.add("flex-1")
        main.appendChild(title)
        main.appendChild(addAdmin)
        main.appendChild(searchDiv)
        main.appendChild(contentDiv)
        main.appendChild(btnPagination)
        el.appendChild(main)

        new Paginator(result.data, ListAdmin, 20)

        const contentModalAdmin = `
        <form class="flex flex-col justify-center gap-4 mt-3" id="formNewAdmin">
            <input type="email" placeholder="email@test.com" class="input w-full validator" id="email" required> 
            <input type="password" placeholder="*********" class="input w-full validator" id="password" minlength="12" 
            pattern="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
            required> 
            <input type="password" placeholder="*********" class="input w-full validator" id="passwordCheck" 
            minlength="12" 
            pattern="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
            required> 
            <button class="btn btn-primary newAdmin">Envoyer</button>
        </form>
        `

        const modalNewAdmin = new ModalComponent(contentModalAdmin)
        modalNewAdmin.render()

        document.querySelector('#newAdmin').addEventListener("click", () => {
            modalNewAdmin.open()
        })
        document.querySelector("#formNewAdmin").addEventListener("submit", (e) => e.preventDefault())
        document.querySelector(".newAdmin").addEventListener("click", async () => {
            const email = document.getElementById("email").value
            const password = document.getElementById("password").value
            const passwordCheck = document.getElementById("passwordCheck").value

            if (password !== passwordCheck) {
                new Toast("Les mots de passe de sont pas identique", "alert-error").render()
            } else {
                await this.controller.newAdmin(navigate, email, password)
                await this.render(navigate)
            }
        })
    }
}