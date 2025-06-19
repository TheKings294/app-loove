export class Modal
{
    constructor(title, content) {
        this.modalId = Math.floor(Math.random() * 1000)
        this.content = content
        this.el = document.createElement("dialog")
        this.el.className = "modal"
        this.el.id = this.modalId
        this.el.innerHTML = `
        <div class="modal-box">
            <h3 class="text-lg font-bold">${title}</h3>
            <div id="contentModal-${this.modalId}"></div>
            <div class="modal-action">
              <form method="dialog">
                <button class="btn">Close</button>
              </form>
            </div>
        </div>
        `

        const contentWrapper = this.el.querySelector(`#contentModal-${this.modalId}`)

        if (typeof content === 'string') {
            contentWrapper.innerHTML = content
        } else if (content instanceof Node) {
            contentWrapper.appendChild(content)
        }
    }

    render(parent) {
        parent.appendChild(this.el)
    }
    open() {
        this.el.showModal()
    }
}