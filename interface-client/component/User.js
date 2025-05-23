export class User
{
    constructor(userName) {
        this.el = document.createElement("div")
        this.el.className = "card bg-base-100 w-75 shadow-sm"

        this.el.innerHTML = `
        <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Photo de l'utilisateur" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">${userName}</h2>
        </div>
        `
    }

    render(navigate, parent) {
        parent.appendChild(this.el)
    }
}