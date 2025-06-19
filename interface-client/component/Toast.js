export class Toast {
    constructor(content, color = "alert-success") {
        this.el = document.createElement("div")
        this.el.className = "toast toast-top toast-end"
        this.el.innerHTML = `
          <div class="alert ${color}">
            <span>${content}</span>
          </div>
        `

        setTimeout(() => {
            this.el.remove();
        }, 3000);
    }

    render() {
        document.querySelector(".app").appendChild(this.el)
    }
}