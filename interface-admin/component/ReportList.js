import {ModalComponent} from "./ModalComponent.js";

export class ReportList {
    constructor(title, content) {
        this.btnId = Math.floor(Math.random() * 1000)
        this.el = document.createElement("div")
        this.el.className = "card bg-primary text-primary-content w-96"
        this.el.innerHTML = `
        <div class="card-body">
            <h2 class="card-title">${title}</h2>
            <p>${content}</p>
            <div class="card-actions justify-end">
              <button class="btn" id="${this.btnId}">Résoudre maintenant</button>
            </div>
         </div>
        `

        this.modal = new ModalComponent("Hello")
        this.modal.render()
    }

    render(parent) {
        parent.appendChild(this.el)
    }
    bind() {
        document.getElementById(`${this.btnId}`).addEventListener("click", () => {
            this.modal.open()
        })
    }
}