import {AuthController} from "./authController.js";

import {LoginViews} from "../views/LoginViews.js";
import {UsersViews} from "../views/UsersViews.js";
import {StatsViews} from "../views/StatsViews.js";
import {ReportViews} from "../views/ReportViews.js";
import {PremiumViews} from "../views/PremiumViews.js";
import {AdminViews} from "../views/AdminViews.js";


export class PageController
{
    constructor() {
        this.auth = new AuthController()
        this.routes = {
            users: () => {
                if (!this.auth.checkAuth()) return this.navigate("login") && this.auth.logout()
                new UsersViews().render(this.navigate.bind(this))
            },
            stats: () => {
                if (!this.auth.checkAuth()) return this.navigate("login") && this.auth.logout()
                new StatsViews().render(this.navigate.bind(this))
            },
            report: () => {
                if (!this.auth.checkAuth()) return this.navigate("login") && this.auth.logout()
                new ReportViews().render(this.navigate.bind(this))
            },
            premium: () => {
                if (!this.auth.checkAuth()) return this.navigate("login") && this.auth.logout()
                new PremiumViews().render(this.navigate.bind(this))
            },
            admin: () => {
                if (!this.auth.checkAuth()) return this.navigate("login") && this.auth.logout()
                new AdminViews().render(this.navigate.bind(this))
            },
            login: () => {
                new LoginViews().render(this.navigate.bind(this))
            },
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
        this.navigate(await this.auth.checkAuth('admin') ? "users" : "login")
    }
}