import {Dock} from "../component/Dock.js";

export class SettingsViews
{
    constructor() {
        this.app = document.querySelector(".app")
    }
    render(navigate)
    {
        this.app.innerHTML = ""
        const title = document.createElement("p")
        title.textContent = "Settings"
        title.className = "text-center text-[20px] mt-5"
        this.app.appendChild(title)
        new Dock().render(navigate, this.app)
    }
}