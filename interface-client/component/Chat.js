export class Chat {
    constructor(content, style = "end") {
        this.el = document.createElement("div")
        this.el.className = "chat chat-end"
        if (style === "start") {
            this.el.className = "chat chat-start"
        }
        this.el.innerHTML = `
        <div class="chat-bubble chat-bubble-neutral">${content}</div>
        `
    }

    render(parent) {
        parent.appendChild(this.el)
    }
}