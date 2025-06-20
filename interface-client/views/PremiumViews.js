import {PremiumController} from "../controllers/PremiumController.js";
import {Dock} from "../component/Dock.js";

export class PremiumViews {
    constructor() {
        this.app = document.querySelector(".app")
        this.controller = new PremiumController()
    }
    async render(navigate) {
        this.app.innerHTML = ""
        const title = document.createElement("p")
        title.textContent = "Premium"
        title.className = "text-center text-[20px] mt-5"
        this.app.appendChild(title)

        const tabsList = document.createElement("div")
        tabsList.className = "tabs tabs-border flex justify-center"
        tabsList.setAttribute("role", "tablist")
        const tabA = document.createElement("a")
        tabA.className = "tab tab-active"
        tabA.setAttribute("role", "tab")
        tabA.innerText = "Likes"
        const tabB = document.createElement("a")
        tabB.className = "tab"
        tabB.setAttribute("role", "tab")
        tabB.innerText = "Un Likes"

        tabsList.appendChild(tabA)
        tabsList.appendChild(tabB)
        this.app.appendChild(tabsList)

        const elementLike = await this.controller.getMyLike()
        const elementUnlike = await this.controller.getMyUnlike()
        elementUnlike.style.display = "none"

        if (window.matchMedia('(width >= 64rem)').matches) {
            if (elementLike.querySelector('p') === null) {
                elementLike.classList.add("grid", "grid-cols-3", "gap-4", "mr-3", "ml-3");
            } else {
                elementLike.querySelector('p').classList.add("col-span-3")
            }

            if (elementUnlike.querySelector('p') === null) {
                elementUnlike.classList.add("grid", "grid-cols-3", "gap-4", "mr-3", "ml-3");
            } else {
               elementUnlike.querySelector('p').classList.add("col-span-3")
            }
        }


        this.app.appendChild(elementLike)
        this.app.appendChild(elementUnlike)

        tabA.addEventListener("click", () => {
            tabB.classList.remove("tab-active")
            tabA.classList.add("tab-active")
            elementLike.style.display = "grid"
            elementUnlike.style.display = "none"
        })
        tabB.addEventListener("click", () => {
            tabA.classList.remove("tab-active")
            tabB.classList.add("tab-active")
            elementLike.style.display = "none"
            elementUnlike.style.display = "grid"
        })

        new Dock().render(navigate, this.app)
    }
}