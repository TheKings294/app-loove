import {Dock} from "../component/Dock.js";
import {Footer} from "../component/Footer.js";
import {Inbox} from "../component/Inbox.js";
import {MessageViews} from "./MessageViews.js";
import {InboxController} from "../controllers/InboxController.js";

export class InboxViews
{
    constructor() {
        this.app = document.querySelector(".app")
        this.controller = new InboxController()
    }
    async render(navigate)
    {
        this.app.innerHTML = ""
        const title = document.createElement("p")
        title.textContent = "Inbox"
        title.className = "text-center text-[20px] mt-5"
        this.app.appendChild(title)

        const data = await this.controller.getConv()

        const divInboxList = document.createElement("div")
        divInboxList.className = "flex flex-col items-center gap-4 my-8"

        if (data.data.length !== 0) {
            data.data.forEach((inbox) => {
                const name = inbox[0].first_name + " " + inbox[0].last_name
                const inboxComponent = new Inbox(name, localStorage.getItem("id"), inbox[0].image_url)
                inboxComponent.el.addEventListener('click', () => {
                    const messageView = new MessageViews()
                })
            })
            this.app.appendChild(divInboxList)
        } else {
            const nothing = document.createElement("div")
            nothing.className = "flex flex-col items-center mb-100"
            nothing.innerHTML = `
            <p>Auccune conversation en cours</p>
            `
            this.app.appendChild(nothing)
        }



        new Footer().render(navigate, this.app)
        new Dock().render(navigate, this.app)
        document.title = "Messagerie"
    }
}