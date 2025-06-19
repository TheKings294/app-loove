import {NavComponent} from "../component/NavComponent.js";
import {PremiumController} from "../controlers/PremiumController.js";
import {Paginator} from "../helper/Paginator.js";
import {ListUser} from "../component/ListUser.js";

export class PremiumViews
{
    constructor() {
        this.controller = new PremiumController()
    }
    async render(navigate) {
        const nav = new NavComponent()
        const el  = document.querySelector(".app")
        el.innerHTML = ''
        nav.render(navigate, el)
        const main = document.createElement("div")
        const title = document.createElement("div");
        title.className = "flex justify-center m-auto text-2xl font-bold mb-4 flex-1";
        title.textContent = "Premium";
        main.classList.add("flex-1")

        const searchDiv = document.createElement("div")
        searchDiv.className = "flex flex-row gap-3 justify-center"
        searchDiv.innerHTML = `
        <input type="text" placeholder="Utilisateur" class="input" id="search"/>
        <button class="btn btn-secondary" id="sendSearch">Recherché</button>
        `
        const contentDiv = document.createElement("div")
        contentDiv.id = "listDiv"

        const btnPagination = document.createElement("div")
        btnPagination.className = 'join grid grid-cols-2 ml-30 mr-30 mt-10'
        btnPagination.innerHTML = `
        <button class="join-item btn btn-outline" id="prev">Previous page</button>
        <button class="join-item btn btn-outline" id="next">Next</button>
        `

        const canvas = document.createElement("canvas")
        canvas.id = "paypal"
        canvas.className = "g-card rounded-xl shadow-lg w-full md:max-w-[80rem] h-[500px] p-4"


        main.appendChild(title)
        main.appendChild(searchDiv)
        main.appendChild(contentDiv)
        main.appendChild(btnPagination)
        main.appendChild(canvas)

        el.appendChild(main)

        const user = await this.controller.getPremiumUser()
        const graphData = await this.controller.getStatsPaypal()

        new Paginator(user.data, ListUser, 10)

        new Chart(canvas, {
            type: 'bar',
            data: {
                labels: Object.keys(graphData.data),
                datasets: [{
                    label: 'Revenue par semaine',
                    data: Object.values(graphData.data)
                }]
            },
            options: {
                responsive: false,
            }
        });

    }
}