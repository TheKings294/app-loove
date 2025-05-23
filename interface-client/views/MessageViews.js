import {Chat} from "../component/Chat.js";

export class MessageViews {
    constructor() {
        this.app = document.querySelector(".app")
    }
    render(navigate, id, name) {
        this.app.innerHTML = ""

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

        const contentDiv = document.createElement("div")
        contentDiv.className = "ml-4 mr-4 messages"

        const messages = document.createElement("div")
        messages.id = "messages"

        new Chat("Comment tu vas", "start").render(messages)
        new Chat("Ca va et toi", "end").render(messages)
        new Chat("Date ?", "start").render(messages)
        new Chat("PMU a 19h", "end").render(messages)
        new Chat("Comment tu vas", "start").render(messages)
        new Chat("Ca va et toi", "end").render(messages)
        new Chat("Date ?", "start").render(messages)
        new Chat("PMU a 19h", "end").render(messages)
        new Chat("Comment tu vas", "start").render(messages)
        new Chat("Ca va et toi", "end").render(messages)
        new Chat("Date ?", "start").render(messages)
        new Chat("PMU a 19h", "end").render(messages)
        new Chat("Comment tu vas", "start").render(messages)
        new Chat("Ca va et toi", "end").render(messages)
        new Chat("Date ?", "start").render(messages)
        new Chat("PMU a 19h", "end").render(messages)
        new Chat("Comment tu vas", "start").render(messages)
        new Chat("Ca va et toi", "end").render(messages)
        new Chat("Date ?", "start").render(messages)
        new Chat("PMU a 19h", "end").render(messages)

        const inputDiv = document.createElement("div")
        inputDiv.className = "flex flex-row justify-center mr-4 ml-4"
        inputDiv.innerHTML = `
        <input type="text" placeholder="Votre message" class="input rounded-lg w-full" />
        <button class="btn btn-primary rounded-lg">Envoyer</button>
        `

        this.app.appendChild(nameDiv)
        contentDiv.appendChild(messages)
        contentDiv.appendChild(inputDiv)
        this.app.appendChild(contentDiv)

        window.onload = () => {
            contentDiv.scrollTop = contentDiv.scrollHeight;
        };

        document.querySelector(".return").addEventListener("click", () => navigate("inbox"))
    }
}