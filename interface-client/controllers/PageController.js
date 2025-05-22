import {LoginViews} from "../views/LoginViews.js";
import {SignInViews} from "../views/SignInViews.js";
import {HomeViews} from "../views/HomeViews.js";
import {InboxViews} from "../views/InboxViews.js";
import {SettingsViews} from "../views/SettingsViews.js";

export class PageController
{
    constructor() {
        this.routes = {
            home: () => {
                new HomeViews().render(this.navigate.bind(this))
            },
            login: () => {
                new LoginViews().render(this.navigate.bind(this), this.auth)
            },
            singIn: () => {
                new SignInViews().render(this.navigate.bind(this))
            },
            inbox: () => {
                new InboxViews().render(this.navigate.bind(this))
            },
            settings: () => {
                new SettingsViews().render(this.navigate.bind(this))
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

    start() {
        this.navigate( "login")
    }
}