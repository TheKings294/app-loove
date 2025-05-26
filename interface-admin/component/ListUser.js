export class ListUser {
    constructor(list) {
        this.el = document.createElement("ul")
        this.el. className = "list bg-base-100 rounded-box shadow-md"

        list.forEach((user) => {
            const li = document.createElement("li")
            li.className = "list-row"
            li.innerHTML = `
            <div><img class="size-10 rounded-box" src="https://api.clink.test/uploads/${user[0].image_url}"/></div>
            <div>
              <div>${user[0].last_name + " "    + user[0].first_name}</div>
              <div class="text-xs font-semibold opacity-60">${user[0].email}</div>
            </div>
            <button class="btn btn-square btn-ghost">
              <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg>
            </button>
            `
            this.el.appendChild(li)
        })
    }

    render(parent) {
        parent.appendChild(this.el)
    }
}