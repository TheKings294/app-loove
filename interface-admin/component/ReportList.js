import {ModalComponent} from "./ModalComponent.js";
import {ReportControllers} from "../controlers/ReportControllers.js";
import {Toast} from "./Toast.js";

export class ReportList {
    constructor(title, content, image, userID, reportID) {
        this.report = new ReportControllers()
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

        const container = document.createElement('div');
        const p = document.createElement('p');
        p.textContent = 'Motif du signalement : ' + content;
        container.appendChild(p);

        const img = document.createElement('img');
        img.src = `https://api.clink.test/uploads/${image}`;
        img.className = 'mt-4 mb-4'
        container.appendChild(img);

        const formSuspend = document.createElement('form');
        formSuspend.id = 'formSuspend';
        formSuspend.className = 'flex justify-between'
        formSuspend.addEventListener("submit", (e) => e.preventDefault())

        const input = document.createElement('input');
        input.type = 'date';
        input.className = 'input';
        input.required = true

        const suspendBtn = document.createElement('button');
        suspendBtn.className = 'btn btn-warning';
        suspendBtn.id = 'suspendBtn';
        suspendBtn.textContent = 'Suspendre';
        suspendBtn.addEventListener("click", async () => {
            const date = new Date(input.value)
            if (date.getTime() < Date.now()) {
                new Toast("La date de le suspention est incorect", 'alert-error').render()
                return false
            }
            const result = await this.report.suspend(userID, date.toISOString(), reportID)

            if (!result.success) {
                new Toast(result.message, 'alert-error').render()
                return false
            }
            new Toast("Utilisateur suspendu").render()
            this.modal.close()
            this.el.classList.add("hidden")
            return true
        })

        formSuspend.appendChild(input);
        formSuspend.appendChild(suspendBtn);

        const formBan = document.createElement('form');
        formBan.id = 'formBan';
        formBan.className = 'flex justify-end mt-4'
        formBan.addEventListener("submit", (e) => e.preventDefault())

        const banBtn = document.createElement('button');
        banBtn.className = 'btn btn-error';
        banBtn.id = 'banBtn';
        banBtn.textContent = 'Banir';
        banBtn.addEventListener("click", async () => {
            if (confirm("Etes vous sur de ban l'utilisateur")) {
                const result = await this.report.ban(userID, reportID)
                if (!result.success) {
                    new Toast(result.message, 'alert-error').render()
                    return false
                }
                new Toast("Utilisateur banni").render()
                this.modal.close()
                this.el.classList.add("hidden")
                return true
            }
        })

        formBan.appendChild(banBtn);

        container.appendChild(formSuspend);
        container.appendChild(formBan);

        this.modal = new ModalComponent(container)
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