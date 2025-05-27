export class ReportList {
    constructor(title, content) {
        this.el = document.createElement("div")
        this.el.className = "card bg-primary text-primary-content w-96"
        this.el.innerHTML = `
        <div class="card-body">
            <h2 class="card-title">${title}</h2>
            <p>${content}</p>
            <div class="card-actions justify-end">
              <button class="btn">Résoudre maintenant</button>
            </div>
         </div>
        `
    }

    render(parent) {
        parent.appendChild(this.el)
    }
}