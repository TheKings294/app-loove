import {LoginViews} from "../views/LoginViews.js";
import {SignInViews} from "../views/SignInViews.js";
import {HomeViews} from "../views/HomeViews.js";
import {InboxViews} from "../views/InboxViews.js";
import {SettingsViews} from "../views/SettingsViews.js";
import {CheckoutViews} from "../views/CheckoutViews.js";
import {AuthController} from "./AuthController.js";
import {PremiumViews} from "../views/PremiumViews.js";
import {ValidateViews} from "../views/ValidateViews.js";

export class PageController
{
    constructor() {
        this.auth = new AuthController()
        this.routes = {
            home: () => {
                if (!this.auth.checkAuth("user")) return this.navigate("login") && this.auth.logout()
                new HomeViews().render(this.navigate.bind(this))
            },
            login: () => {
                new LoginViews().render(this.navigate.bind(this), this.auth)
            },
            singIn: () => {
                new SignInViews().render(this.navigate.bind(this))
            },
            inbox: () => {
                if (!this.auth.checkAuth("user")) return this.navigate("login") && this.auth.logout()
                new InboxViews().render(this.navigate.bind(this))
            },
            settings: () => {
                if (!this.auth.checkAuth("user")) return this.navigate("login") && this.auth.logout()
                new SettingsViews().render(this.navigate.bind(this))
            },
            checkout: () => {
                if (!this.auth.checkAuth("user")) return this.navigate("login") && this.auth.logout()
                new CheckoutViews().render(this.navigate.bind(this))
            },
            premium: () => {
                if (!this.auth.checkAuth("user")) return this.navigate("login") && this.auth.logout()
                new PremiumViews().render(this.navigate.bind(this))
            },
            validate: () => {
                new ValidateViews().render(this.navigate.bind(this))
            }
        }
    }

    navigate(page) {
        if (this.routes[page]) {
            this.routes[page]()
        } else {
            document.body.innerHTML = `
            <div class="bg-[#F7E9D7] min-h-screen flex items-center justify-center">
                <div class="text-center p-6">
                  <img src="https://via.placeholder.com/150x50?text=LOGO" alt="Logo" class="mx-auto mb-6 w-32">
                  
                  <h1 class="text-6xl font-bold text-[#60171C]">404</h1>
                  <p class="text-xl text-gray-700 mb-4">Oops! Page not found.</p>
                  
                  <p class="text-gray-600 mb-6">La page que vous cherchez n'existe pas</p>
                  
                  <a class="inline-block bg-[#60171C] text-white px-6 py-2 rounded hover:bg-[#4e1217] transition" id="home">
                    Go Home
                  </a>
                </div>
              </div>
            `
            document.getElementById("home").addEventListener("click", () => this.navigate("login"))
        }
    }

    async start() {
        this.navigate( await this.auth.checkAuth('user') ? "home": "login")
    }

}