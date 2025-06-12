

export class PremiumViews {
    constructor() {
        this.app = document.querySelector(".app")
        //this.controller = new SettingController()
    }
    async render(navigate) {
        this.app.innerHTML = ""
    }
}