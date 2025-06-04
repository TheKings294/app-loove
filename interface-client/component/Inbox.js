export class Inbox
{
    constructor(userName, id, imageUrl) {
        this.el = document.createElement("div")
        this.el.setAttribute("data-id", id)
        this.el.className = "flex items-center justify-between bg-full-white rounded-xl shadow-md p-4 w-full max-w-md mx-auto mr-4 ml-4 inbox";

        this.el.innerHTML = `
        <div class="flex items-center gap-4">
            <img src="https://api.clink.test/uploads/${imageUrl}" alt="${userName}" class="w-16 h-16 rounded-full object-cover" />
            <span class="text-lg font-serif">${userName}</span>
        </div>
        <span class="text-2xl text-gray-500">›</span>
    `
    }

    render(parent) {
        parent.appendChild(this.el)
    }
}