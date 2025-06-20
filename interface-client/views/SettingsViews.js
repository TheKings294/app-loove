import {Dock} from "../component/Dock.js";
import {Modal} from "../component/Modal.js";
import {SettingController} from "../controllers/SettingController.js";

export class SettingsViews
{
    constructor() {
        this.app = document.querySelector(".app")
        this.app.className = "app"
        this.app.classList.remove("flex", "justify-center", "min-h-screen", "flex-col")
        this.controller = new SettingController()
    }
    async render(navigate)
    {
        const dataUser = await this.controller.getUserInfo()
        localStorage.setItem("email", dataUser.data[0].email)
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
        <span>Informations personnelles</span>
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
        buttonDelete.id = 'deleteButton'

        const unCo = document.createElement("button")
        unCo.textContent = "Deconexion"
        unCo.className = "btn btn-outline btn-primary"
        unCo.id = "unCoButton"

        if (window.matchMedia('(width >= 64rem)').matches) {
            buttonDelete.className = "btn btn-primary mr-5 ml-5 rounded-lg"
            unCo.className = "btn btn-outline btn-primary mr-5 ml-5 rounded-lg"
        }

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
            <span class="text-gray-800">${dataUser.data[0].first_name} ${dataUser.data[0].last_name}</span>
          </li>
          <li class="flex justify-between border-b pb-2">
            <span class="font-medium text-gray-600">Email :</span>
            <span class="text-gray-800">${dataUser.data[0].email}</span>
          </li>
          <li class="flex justify-between border-b pb-2">
            <span class="font-medium text-gray-600">Ville :</span>
            <span class="text-gray-800">${dataUser.data[0].city}</span>
          </li>
          <li class="flex justify-between border-b pb-2">
            <span class="font-medium text-gray-600">Date de naissance :</span>
            <span class="text-gray-800">${
                new Date(dataUser.data[0].birthday.date.replace(" ", "T").split(".")[0])
                    .toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </li>
          <li class="flex justify-between border-b pb-2">
            <span class="font-medium text-gray-600">Type de relation :</span>
            <span class="text-gray-800">${dataUser.data[0].relation_type}</span>
          </li>
          <li class="flex justify-between border-b pb-2">
            <span class="font-medium text-gray-600">Genre recherché :</span>
            <span class="text-gray-800">${dataUser.data[0].gender_attraction}</span>
          </li>
          <li class="flex justify-between">
            <span class="font-medium text-gray-600">Age recherché :</span>
            <span class="text-gray-800">${dataUser.data[0].age_attraction}</span>
          </li>
        </ul>
        `


        infoDiv.appendChild(headInfoDiv)
        infoDiv.appendChild(infoList)

        content.appendChild(settings)
        content.appendChild(buttonDelete)
        content.appendChild(unCo)
        this.app.appendChild(title)
        this.app.appendChild(content)
        this.app.appendChild(infoDiv)

        new Dock().render(navigate, this.app)

        const formPassword = `
            <form class="flex flex-col items-center gap-4">
                <input class="input" type="password" placeholder="Ancien mot de passe" id="actual_mp">
                <input class="input" type="password" placeholder="Nouveau mot de passe" id="new_mp">
                <input class="input" type="password" placeholder="Nouveau mot de passe" id="confirm_new_mp">
                <button class="btn btn-primary rounded-lg" id="sendEditPassword" type="button">Modifier</button>
            </form>
            `
        const modalPassword = new Modal("Modification du mot de passe", formPassword)
        modalPassword.render(this.app)

        const formEditUser = `
        <form class="flex flex-col items-center gap-4">
            <div class="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Nom" class="input input-bordered w-full rounded-lg" value="${dataUser.data[0].last_name}" required id="last_name"/>
              <input type="text" placeholder="Prénom" class="input input-bordered w-full rounded-lg" value="${dataUser.data[0].first_name}" required id="first_name"/>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <input type="date" placeholder="Date de naissance" class="input input-bordered w-full rounded-lg" required value="${dataUser.data[0].birthday.date.split(" ")[0]}" id="date_of_birth" />
              <select class="select w-full rounded-lg" required id="gender">
                  <option value="man" ${dataUser.data[0].gender === "man" ? 'selected' : ''}>Homme</option>
                  <option value="woman" ${dataUser.data[0].gender === "woman" ? 'selected' : ''}>Femme</option>
                  <option value="other" ${dataUser.data[0].gender === "other" ? 'selected' : ''}>Autre</option>
              </select>
            </div>
            <input type="text" placeholder="Ville" class="input input-bordered w-full rounded-lg" value="${dataUser.data[0].city}" required id="city"/>
            <textarea placeholder="Biographie" class="textarea textarea-bordered w-full h-24 rounded-lg" required id="bio">${dataUser.data[0].description}</textarea>
            <select class="select w-full rounded-lg" required id="gender_attraction">
              <option value="man" ${dataUser.data[0].gender_attraction === "man" ? 'selected' : ''}>Homme</option>
              <option value="woman" ${dataUser.data[0].gender_attraction === "woman" ? 'selected' : ''}>Femme</option>    
              <option value="other" ${dataUser.data[0].gender_attraction === "other" ? 'selected' : ''}>Autre</option>
            </select>
            <input type="number" class="input validator w-full rounded-lg" required value="${dataUser.data[0].age_attraction}" id="age_attraction"/>
            <select class="select w-full rounded-lg" required id="relation_type">
              <option value="serious" ${dataUser.data[0].relation_type === "serious" ? 'selected' : ''}>Sérieuse</option>
              <option value="short" ${dataUser.data[0].relation_type === "short" ? 'selected' : ''}>Relation courte</option>
              <option value="chill" ${dataUser.data[0].relation_type === "chill" ? 'selected' : ''}>Rencontre</option>
              <option value="hookup" ${dataUser.data[0].relation_type === "hookup" ? 'selected' : ''}>Cout d'un soir</option>
              <option value="friends" ${dataUser.data[0].relation_type === "friends" ? 'selected' : ''}>Amis</option>
            </select>
            <button type="button" class="btn btn-primary w-full rounded-lg" id="sendEditUser">Envoyer</button>
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

        document.getElementById("sendEditUser").addEventListener('click', async () => await this.controller.editUser())
        document.getElementById("sendEditPassword").addEventListener('click', async () => await this.controller.editPassword())
        document.getElementById("deleteButton").addEventListener('click', async () => {
            if (confirm("Voulez vous vraiment supprimé votre compte")) {
                await this.controller.deleteUser()
            }
        })
        document.getElementById("unCoButton").addEventListener('click', async () => await this.controller.unCo())
    }
}