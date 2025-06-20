export class User
{
    constructor(userName, imageURL ) {
        this.el = document.createElement("div")
        this.el.className = "card bg-base-100 w-75 shadow-sm"

        this.el.innerHTML = `
        <figure>
            <img
              src="${imageURL}"
              alt="Photo de l'utilisateur" 
              style="width: 50%"
              />
        </figure>
        <div class="card-body">
            <h2 class="card-title">${userName}</h2>
        </div>
        `
    }

    render(navigate, parent) {
        parent.appendChild(this.el)
    }
    listener(fonction) {
        this.el.addEventListener("click", fonction)
    }
}