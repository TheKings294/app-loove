export class ListAdmin {
    constructor(list) {
        this.el = document.createElement("ul")
        this.el. className = "list bg-base-100 rounded-box shadow-md mr-3 ml-3"

        list.forEach((user) => {
            const li = document.createElement("li")
            li.className = "list-row"
            li.innerHTML = `
            <div>
              <div>${user.username}</div>
            </div>
            `
            this.el.appendChild(li)
        })
    }

    render(parent) {
        return this.el
    }
}