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
        title.className = "text-center text-[20px] mt-5 sm:text-lg"
        this.app.appendChild(title)

        const data = await this.controller.getConv()

        const mainDiv = document.createElement("div")

        const messageDiv = document.createElement("div")

        const divInboxList = document.createElement("div")
        divInboxList.className = "flex flex-col items-center gap-4 my-8"

        let renderMessage

        if(window.matchMedia("(width >= 64rem)").matches) {
            renderMessage = messageDiv
            divInboxList.className = "w-1/3 border-r border-black p-4 overflow-y-auto flex flex-col items-center gap-4 my-8"
            messageDiv.className = "w-full flex flex-col"
            mainDiv.className = "flex flex-col flex-row h-[calc(100vh-120px)]"
        } else {
            messageDiv.className = 'hidden'
            renderMessage = this.app
        }

        if (data.data.length !== 0) {
            data.data.forEach((inbox) => {
                const name = inbox.first_name + " " + inbox.last_name
                const inboxComponent = new Inbox(name, localStorage.getItem("id"), inbox.image)
                inboxComponent.el.addEventListener('click', () => {
                    const messageView = new MessageViews()
                    messageView.render(navigate,
                        localStorage.getItem('id'),
                        inbox.first_name,
                        localStorage.getItem('id') == inbox.user_a? inbox.user_b : inbox.user_a,
                        inbox.id,
                        inbox.chanel_name,
                        renderMessage)
                })
                inboxComponent.render(divInboxList)
            })
            mainDiv.appendChild(divInboxList)
            mainDiv.appendChild(messageDiv)
            this.app.appendChild(mainDiv)
        } else {
            const nothing = document.createElement("div")
            nothing.className = "flex flex-col items-center mb-100"
            nothing.innerHTML = `
            <p>Aucune conversation en cours</p>
            `
            this.app.appendChild(nothing)
        }

        new Dock().render(navigate, this.app)
        document.title = "Messagerie"
    }
}