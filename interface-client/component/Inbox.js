export class Inbox
{
    constructor(userName, imageUrl = "https://randomuser.me/api/portraits/men/1.jpg") {
        this.el = document.createElement("div")
        this.el.className = "flex items-center justify-between bg-full-white rounded-xl shadow-md p-4 w-full max-w-md mx-auto mr-4 ml-4";

        this.el.innerHTML = `
        <div class="flex items-center gap-4">
            <img src="${imageUrl}" alt="${userName}" class="w-16 h-16 rounded-full object-cover" />
            <span class="text-lg font-serif">${userName}</span>
        </div>
        <span class="text-2xl text-gray-500">›</span>
    `;
    }

    render(navigate, parent) {
        parent.appendChild(this.el)
    }
}