export class ModalComponent
{
    constructor(content) {
        this.modalId = Math.floor(Math.random() * 1000)
        this.content = content
        this.el = document.createElement("dialog")
        this.el.className = "modal"
        this.el.id = this.modalId
        this.el.innerHTML = `
          <div class="modal-box">
            <form method="dialog">
              <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <div class="content">
                ${content}
            </div>
          </div>
        `
    }

    render()
    {
        document.querySelector(".app").appendChild(this.el)
    }
    open() {
        this.el.showModal()
    }
}