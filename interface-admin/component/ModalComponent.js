export class ModalComponent
{
    constructor() {
        this.el.innerHTML = `
        <dialog id="my_modal_3" class="modal">
          <div class="modal-box">
            <form method="dialog">
              <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <div class="content">
        
            </div>
          </div>
        </dialog>
        `
    }

    render(parent = document.body)
    {
        parent.appendChild(this.el)
    }
}