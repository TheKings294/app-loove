import {Dock} from "../component/Dock.js";
import {Footer} from "../component/Footer.js";
import {Inbox} from "../component/Inbox.js";

export class InboxViews
{
    constructor() {
        this.app = document.querySelector(".app")
    }
    render(navigate)
    {
        document.querySelector(".app").innerHTML = ""
        const title = document.createElement("p")
        title.textContent = "Inbox"
        title.className = "text-center text-[20px] mt-5"
        this.app.appendChild(title)

        const divInboxList = document.createElement("div")
        divInboxList.className = "flex flex-col items-center gap-4 my-8"
        new Inbox("John Doe").render(navigate, divInboxList)
        new Inbox("John Doe").render(navigate, divInboxList)
        new Inbox("John Doe").render(navigate, divInboxList)
        new Inbox("John Doe").render(navigate, divInboxList)

        this.app.appendChild(divInboxList)
        new Footer().render(navigate, this.app)
        new Dock().render(navigate, this.app)
        document.title = "Messagerie"
    }
}