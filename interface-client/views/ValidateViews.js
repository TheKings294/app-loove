import {ValidateController} from "../controllers/ValidateController.js";

export class ValidateViews {
    constructor() {
        this.controller = new ValidateController()
        this.app = document.querySelector(".app")
    }
    async render(navigate) {
        this.app.innerHTML = ""
        this.app.innerHTML = `
        <div class="min-h-screen bg-[#F7E9D7] flex items-center justify-center">
            <div class="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
              <div class="text-center mb-4">
                <img src="https://api.clink.test/uploads/clink_logo.webp" alt="Your Logo" class="mx-auto w-32">
              </div>
              <h1 class="text-2xl font-bold text-[#60171C] mb-2 text-center">Vérification du compte</h1>
              <p class="text-gray-700 text-center mb-4">Entré le code a 6 chifres envoyé par mail</p>
        
              <form class="space-y-4 form-verif">
                <input
                  type="text"
                  name="verification_code"
                  maxlength="6"
                  pattern="[0-9]{6}"
                  required
                  class="w-full border border-gray-300 rounded p-2 text-center text-xl tracking-widest focus:outline-none focus:ring-2 focus:ring-[#60171C]"
                  placeholder="123456"
                  id="input-verif-code"
                >
        
                <button
                  type="submit"
                  class="w-full bg-[#60171C] text-white font-semibold py-2 rounded hover:bg-[#4e1217] transition"
                  id="verif-code-btn"
                >
                  Vérifié
                </button>
              </form>
            </div>
          </div>
        `
        document.querySelector("#verif-code-btn").addEventListener("click", async () => {
            const verifCode = document.getElementById("input-verif-code").value

            await this.controller.sendCode(verifCode, navigate)
        })
        document.querySelector(".form-verif").addEventListener("submit", (e) => e.preventDefault())
    }
}