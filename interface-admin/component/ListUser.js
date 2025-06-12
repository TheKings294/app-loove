export class ListUser {
    constructor(list) {
        this.el = document.createElement("ul")
        this.el. className = "list bg-base-100 rounded-box shadow-md"

        list.forEach((user) => {
            const li = document.createElement("li")
            li.className = "list-row"
            li.innerHTML = `
            <div>
              <div>${user[0].last_name + " "    + user[0].first_name}</div>
              <div class="text-xs font-semibold opacity-60">${user[0].email}</div>
            </div>
            `
            this.el.appendChild(li)
        })
    }

    render(parent) {
        parent.appendChild(this.el)
    }
}