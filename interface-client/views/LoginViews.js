import {LoginController} from "../controllers/LoginController.js";

export class LoginViews
{
    constructor() {
        this.app = document.querySelector(".app")
        this.controller = new LoginController()
    }
    render(navigate) {
        this.app.innerHTML = `
        <div class="flex flex-col justify-center min-h-screen">
            <div class="w-full max-w-lg mx-auto mb-4 px-4 sm:pb-10">
                <img src="../assets/clink_logo.webp" alt="logo" class="w-full h-auto max-w-xs mx-auto md:max-w-sm lg:max-w-[150px]">
            </div>
    
            <div class="flex flex-col mx-auto items-center gap-6 px-4 w-full max-w-lg">
              <form class="flex flex-col gap-4 w-full">
                <input type="email" placeholder="test@test.com" class="input w-full sm:input-xl lg:input-md" id="email"/>
                <input type="password" placeholder="**********" class="input w-full sm:input-xl lg:input-md" id="password"/>
                <button class="btn btn-neutral w-full sm:btn-xl lg:btn-md" style="background-color: #60171C;" id="LoginBtn">Connexion</button>
              </form>
              <button class="btn btn-link self-center">Mot de passe oublié ?</button>
            
              <div id="SingInDiv" class="flex justify-center sm:mt-5 w-full max-w-lg">
                <button class="btn btn-outline sm:btn-xl lg:btn-md w-full max-w-xs mx-auto" style="border-color: #60171C;" id="SingInButton">Inscription</button>
              </div>
            </div>
        </div>
        `

        document.querySelector("#SingInButton").addEventListener('click', () => navigate("singIn"))
        document.querySelector("#LoginBtn").addEventListener('click', () => this.controller.login(navigate))
        document.querySelector("form").addEventListener("submit", (e) => e.preventDefault())
    }
}