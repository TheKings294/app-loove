export class User
{
    constructor(userName, imageURL ) {
        this.el = document.createElement("div")
        this.el.className = "card bg-base-100 w-75 shadow-sm"

        this.el.innerHTML = `
        <figure>
            <img
              src="https://api.clink.test/uploads/${imageURL}"
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