import {Dock} from "../component/Dock.js";
import {User} from "../component/User.js";
import {Footer} from "../component/Footer.js";

export class HomeViews
{
    constructor() {
        this.app = document.querySelector(".app")
    }
    render(navigate)
    {
        document.querySelector(".app").innerHTML = ``
        const title = document.createElement("p")
        title.textContent = "Home"
        title.className = "text-center text-[20px] mt-5"
        document.querySelector(".app").appendChild(title)

        const divUsersList = document.createElement("div")
        divUsersList.className = "flex flex-col items-center gap-4 my-8"
        new User("John Doe", "Je suis un test").render(navigate, divUsersList)
        new User("John Doe", "Je suis un test").render(navigate, divUsersList)
        new User("John Doe", "Je suis un test").render(navigate, divUsersList)
        new User("John Doe", "Je suis un test").render(navigate, divUsersList)
        new User("John Doe", "Je suis un test").render(navigate, divUsersList)
        new User("John Doe", "Je suis un test").render(navigate, divUsersList)

        document.querySelector(".app").appendChild(divUsersList)
        new Footer().render(navigate, this.app)
        new Dock().render(navigate, this.app)
    }
}