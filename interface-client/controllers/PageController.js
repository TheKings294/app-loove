

export class PageController
{
    constructor() {
        this.routes = {
            home: () => {
                if (!this.auth.checkAuth()) return this.navigate("login")
                //new UsersViews().render(this.navigate.bind(this))
            },
            login: () => {
                //new LoginViews().render(this.navigate.bind(this), this.auth)
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

    start() {
        this.navigate(this.auth.checkAuth() ? "home" : "login")
    }
}