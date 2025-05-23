import {Dock} from "../component/Dock.js";
import {Modal} from "../component/Modal.js";

export class SettingsViews
{
    constructor() {
        this.app = document.querySelector(".app")
    }
    render(navigate)
    {
        this.app.innerHTML = ""
        const title = document.createElement("p")
        title.textContent = "Settings"
        title.className = "text-center text-[20px] mt-5"

        const content = document.createElement("div")
        content.id = "main"
        content.className = "flex flex-col justify-between h-full"
        const settings = document.createElement("div")
        settings.innerHTML = `
        <div class="flex justify-between items-center bg-full-white rounded-lg border-solid p-4 m-5 border-black" id="goToInfo">
        <span>Information personnelle</span>
        <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
        class="lucide lucide-chevron-right-icon lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
        </span>
        </div>
        <div class="flex justify-between items-center bg-full-white rounded-lg border-solid p-4 m-5 border-black" id="editPassword">
        <span>Mot de passe</span>
        <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
        class="lucide lucide-chevron-right-icon lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
        </span>
        </div>
        `
        const buttonDelete = document.createElement("button")
        buttonDelete.textContent = "Suppression du compte"
        buttonDelete.className = "btn btn-primary"

        const infoDiv = document.createElement("div")
        infoDiv.style.display = 'none'
        infoDiv.id = "info"

        const headInfoDiv = document.createElement("div")
        headInfoDiv.className = "flex justify-between mr-4 ml-4 mb-5"
        headInfoDiv.innerHTML = `
        <span id="return"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
        class="lucide lucide-chevron-left-icon lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg></span>
        <button class="btn btn-primary rounded-lg" id="editUser">Modifier</button>
        `
        const infoList = document.createElement("div")
        infoList.className = "mr-4 ml-4"
        infoList.innerHTML = `
        <ul class="space-y-3">
          <li class="flex justify-between border-b pb-2">
            <span class="font-medium text-gray-600">Nom :</span>
            <span class="text-gray-800">Jean Dupont</span>
          </li>
          <li class="flex justify-between border-b pb-2">
            <span class="font-medium text-gray-600">Email :</span>
            <span class="text-gray-800">jean.dupont@email.com</span>
          </li>
          <li class="flex justify-between border-b pb-2">
            <span class="font-medium text-gray-600">Rôle :</span>
            <span class="text-gray-800">Utilisateur</span>
          </li>
          <li class="flex justify-between">
            <span class="font-medium text-gray-600">Date d'inscription :</span>
            <span class="text-gray-800">23 mai 2025</span>
          </li>
        </ul>
        `


        infoDiv.appendChild(headInfoDiv)
        infoDiv.appendChild(infoList)

        content.appendChild(settings)
        content.appendChild(buttonDelete)
        this.app.appendChild(title)
        this.app.appendChild(content)
        this.app.appendChild(infoDiv)

        new Dock().render(navigate, this.app)

        const formPassword = `
            <form class="flex flex-col items-center gap-4">
                <input class="input" type="password" placeholder="*********">
                <input class="input" type="password" placeholder="*********">
                <button class="btn btn-primary rounded-lg" id="editPassword">Modifier</button>
            </form>
            `
        const modalPassword = new Modal("Modification du mot de passe", formPassword)
        modalPassword.render(this.app)

        const formEditUser = `
        <form class="flex flex-col items-center gap-4">
            <div class="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Nom" class="input input-bordered w-full rounded-lg" />
              <input type="text" placeholder="Prénom" class="input input-bordered w-full rounded-lg" />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <input type="date" placeholder="Date de naissance" class="input input-bordered w-full rounded-lg" />
              <select class="select w-full rounded-lg">
                  <option disabled selected>Choisir un genre</option>
                  <option value="man">Homme</option>
                  <option value="woman">Femme</option>
                  <option value="other">Autre</option>
              </select>
            </div>
            <input type="text" placeholder="Ville" class="input input-bordered w-full rounded-lg" />
            <textarea placeholder="Biographie" class="textarea textarea-bordered w-full h-24 rounded-lg"></textarea>
            <select class="select w-full rounded-lg">
              <option disabled selected>Choisir un genre</option>
              <option value="man">Homme</option>
              <option value="woman">Femme</option>
              <option value="other">Autre</option>
            </select>
            <input type="number" class="input validator w-full rounded-lg" required/>
            <select class="select w-full rounded-lg">
              <option disabled selected>Choisir un type de relation</option>
              <option value="1">Sérieuse</option>
              <option value="2">Relation courte</option>
              <option value="3">Rencontre</option>
              <option value="4">Cout d'un soir</option>
              <option value="5">Amis</option>
            </select>
        </form> 
        `
        const modalEditUser = new Modal("Modification de t'es information", formEditUser)
        modalEditUser.render(this.app)

        document.querySelector("#goToInfo").addEventListener("click", () => {
            content.style.display = 'none'
            infoDiv.style.display = 'block'
        })
        document.querySelector("#return").addEventListener("click", () => navigate("settings"))
        document.querySelector("#editPassword").addEventListener("click", () => modalPassword.open())
        document.querySelector("#editUser").addEventListener("click", () => modalEditUser.open())
    }
}