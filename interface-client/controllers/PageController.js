import {LoginViews} from "../views/LoginViews.js";
import {SignInViews} from "../views/SignInViews.js";
import {HomeViews} from "../views/HomeViews.js";
import {InboxViews} from "../views/InboxViews.js";
import {SettingsViews} from "../views/SettingsViews.js";
import {CheckoutViews} from "../views/CheckoutViews.js";
import {AuthController} from "./AuthController.js";

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
            }
        }
    }

    navigate(page) {
        if (this.routes[page]) {
            this.routes[page]()
        } else {
            document.body.innerHTML = `<h1>404 - Page non trouvée</h1>`
        }
    }

    async start() {
        this.navigate( await this.auth.checkAuth('user') ? "home": "login")
    }

}