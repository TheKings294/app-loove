import {LoginController} from "../controllers/LoginController.js";

export class LoginViews
{
    constructor() {
        this.app = document.querySelector(".app")
        this.controller = new LoginController()
    }
    render(navigate) {
        this.app.innerHTML = `
        <div class="w-64 mr-auto ml-auto mb-15">
            <img src="../assets/clink_logo.webp" alt="logo">
        </div>
        <div class="flex mr-auto ml-auto flex-col content-between">
            <div id="formDiv" class="flex flex-col">
                <form class="flex flex-col gap-3 mr-auto ml-auto">
                    <input type="email" placeholder="test@test.com" class="input w-[150%] self-center" id="email"/>
                    <input type="password" placeholder="**********" class="input w-[150%] self-center" id="password"/>
                    <button class="btn btn-neutral w-[80%] self-center" style="background-color: #60171C;" id="LoginBtn">Connexion</button>
                </form>
                <button class="btn btn-link">Mot de passe oublié ?</button>   
            </div>
            <div id="SingInDiv" class="flex fixed justify-center bottom-0 left-[50%]" style="transform: translate(-50%, -50%)">
                <button class="btn btn-outline" style="border-color: #60171C;" id="SingInButton">Inscription</button>
            </div>
        </div>
        `

        document.querySelector("#SingInButton").addEventListener('click', () => navigate("singIn"))
        document.querySelector("#LoginBtn").addEventListener('click', () => this.controller.login(navigate))
        document.querySelector("form").addEventListener("submit", (e) => e.preventDefault())
    }
}