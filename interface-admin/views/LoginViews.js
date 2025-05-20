import {LoginController} from "../controlers/loginController.js";

export class LoginViews
{

    constructor() {
        this.controller = new LoginController()
    }
    render(navigate, auth)
    {
        document.querySelector(".app").innerHTML = `
        <div class="w-full max-w-sm p-8 space-y-4 bg-base-100 rounded-2xl shadow-xl">
            <h1 class="text-2xl font-bold text-center">Connexion</h1>

            <form class="space-y-4" id="form-login">
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Email</span>
                    </label>
                    <input type="email" id="email" placeholder="exemple@mail.com" class="input input-bordered w-full" required />
                </div>
        
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Mot de passe</span>
                    </label>
                    <input type="password" id="password" placeholder="••••••••" class="input input-bordered w-full" required />
                </div>
        
                <div class="form-control mt-6">
                    <button type="submit" class="btn btn-primary" id="btnLogin">Se connecter</button>
                </div>
            </form>
        </div>
        `

        document.getElementById('form-login').addEventListener('submit', (e) => {
            e.preventDefault()
        })
        document.getElementById('btnLogin').addEventListener('click', async () => {
            const result = await this.controller.login(document.getElementById('email').value, document.getElementById('password').value)
            if (result) {
                navigate('users')
            }
        })
    }
}