import {Chat} from "../component/Chat.js";
import {MessageController} from "../controllers/MessageController.js";

export class MessageViews {
    constructor() {
        this.app = document.querySelector(".app")
        this.controller = new MessageController()
    }
    async render(navigate, id, name, otherID, convID, chanel) {
        this.controller.conection(id, otherID, chanel)
        this.app.innerHTML = ""

        const mainDiv = document.createElement("div")
        mainDiv.className = "h-screen flex flex-col"

        const nameDiv = document.createElement("div")
        nameDiv.className = "flex flex-row justify-between content-center mt-5 ml-4 mr-4"
        nameDiv.innerHTML = `
        <span class="return">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
            class="lucide lucide-chevron-left-icon lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>  
        </span>
        <div>
            <div class="avatar avatar-placeholder">
                <div class="bg-neutral text-neutral-content w-12 rounded-full">
                    <span>SY</span>
                </div>
            </div>
            ${name}
        </div>
        <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
            class="lucide lucide-ellipsis-icon lucide-ellipsis"><circle cx="12" cy="12" r="1"/>
            <circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
        </span>
        `

        const messages = document.createElement("div")
        messages.id = "messages"
        messages.className = "flex-1 overflow-y-auto p-4 space-y-2"

        const inputDiv = document.createElement("div")
        inputDiv.className = "flex items-center gap-2"
        inputDiv.innerHTML = `
        <input type="text" placeholder="Votre message" class="input rounded-lg w-full" id="messageContent"/>
        <button class="btn btn-primary rounded-lg" id="sendMessage">Envoyer</button>
        `
        mainDiv.appendChild(nameDiv)
        mainDiv.appendChild(messages)
        mainDiv.appendChild(inputDiv)

        this.app.appendChild(mainDiv)

        window.onload = () => {
            messages.scrollTop = messages.scrollHeight;
        };

        document.querySelector(".return").addEventListener("click", () => navigate("inbox"))
        await this.controller.getAllMessages(convID)
        console.log({
            'id' : id,
            'otherID' : otherID
        })
        document.getElementById("sendMessage").addEventListener('click', (e) => {
            const content = document.getElementById("messageContent").value
            if (content.length !== 0) {
                this.controller.sendMessage(content, id, otherID, convID)
                document.getElementById("messageContent").value = ""
            }
        })
        document.getElementById("messageContent").addEventListener('keydown', (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                const content = e.target.value
                if (content.length !== 0) {
                    this.controller.sendMessage(content, id, otherID, convID)
                    e.target.value = ""
                }
            }
        })
    }
}