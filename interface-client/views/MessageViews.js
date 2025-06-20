import {MessageController} from "../controllers/MessageController.js";
import {Modal} from "../component/Modal.js";
import {ReportController} from "../controllers/ReportController.js";

export class MessageViews {
    constructor() {
        this.app = document.querySelector(".app")
        this.controller = new MessageController()
        this.report = new ReportController()
    }
    async render(navigate, id, name, otherID, convID, chanel, parent) {
        this.controller.conection(id, otherID, chanel)
        parent.innerHTML = ""

        const mainDiv = document.createElement("div")
        mainDiv.className = "h-screen flex flex-col"

        const nameDiv = document.createElement("div")
        nameDiv.className = "flex flex-row justify-between content-center mt-5 ml-4 mr-4"
        nameDiv.innerHTML = `
        <span class="return">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
            class="lucide lucide-chevron-left-icon lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>  
        </span>
        <div>
            <div class="avatar avatar-placeholder">
                <div class="bg-neutral text-neutral-content w-12 rounded-full">
                    <span>SY</span>
                </div>
            </div>
            ${name}
        </div>
        <span id="report">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
            class="lucide lucide-ellipsis-icon lucide-ellipsis"><circle cx="12" cy="12" r="1"/>
            <circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
        </span>
        `

        const messages = document.createElement("div")
        messages.id = "messages"
        messages.className = "flex-1 overflow-y-auto p-4 space-y-2"

        const inputDiv = document.createElement("div")
        inputDiv.className = "flex items-center gap-2 md:pb-[115px]"
        inputDiv.innerHTML = `
        <input type="text" placeholder="Votre message" class="input rounded-lg w-full" id="messageContent"/>
        <button class="btn btn-primary rounded-lg" id="sendMessage">Envoyer</button>
        `

        mainDiv.appendChild(nameDiv)
        mainDiv.appendChild(messages)
        mainDiv.appendChild(inputDiv)

        parent.appendChild(mainDiv)

        window.onload = () => {
            messages.scrollTop = messages.scrollHeight;
        };

        if (window.matchMedia('(max-width: 639px)').matches) {
            document.querySelector(".return").addEventListener("click", () => navigate("inbox"))
        } else if (window.matchMedia('(min-width: 640px)').matches) {
            mainDiv.className = "h-screen flex flex-col mb-20"
        }

        await this.controller.getAllMessages(convID)
        document.getElementById("sendMessage").addEventListener('click', (e) => {
            const content = document.getElementById("messageContent").value
            if (content.length !== 0) {
                this.controller.sendMessage(content, id, otherID, convID)
                document.getElementById("messageContent").value = ""
            }
        })
        document.getElementById("messageContent").addEventListener('keydown', (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                const content = e.target.value
                if (content.length !== 0) {
                    this.controller.sendMessage(content, id, otherID, convID)
                    e.target.value = ""
                }
            }
        })
        const modalReport = new Modal("Signalement", `
        <form class="flex flex-col gap-4" id="formReport">
            <select class="select w-full" id="selectInput" required>
                <option selected disabled>--Sélectionner une valeur--</option>
                <option value="Harcèlement ou menaces">Harcèlement ou menaces</option>
                <option value="Propos offensants ou haineux">Propos offensants ou haineux</option>
                <option value="Comportement sexuel inapproprié">Comportement sexuel inapproprié</option>
                <option value="Demande de contenu explicite">Demande de contenu explicite</option>
                <option value="Intimidation ou pression">Intimidation ou pression</option>
                <option value="Faux profil">Faux profil (identité volée, photos volées)</option>
                <option value="Arnaque financière">Arnaque financière (demande d’argent, scam)</option>
                <option value="Lien suspect ou tentative de phishing">Lien suspect ou tentative de phishing</option>
                <option value="Comportement suspect">Comportement suspect (ex : manipulation psychologique)</option>
                <option value="Photo de profil inappropriée">Photo de profil inappropriée (nudité, violence, etc.)</option>
                <option value="Bio ou messages contenant des propos choquants">Bio ou messages contenant des propos choquants</option>
                <option value="Contenu contraire aux conditions d’utilisation">Contenu contraire aux conditions d’utilisation</option>
                <option value="Publicité ou promotion">Publicité ou promotion de produits/services</option>
                <option value="Spam ou messages automatisés">Spam ou messages automatisés</option>
                <option value="Tentative de redirection">Tentative de redirection vers un autre site ou app</option>
                <option value="Âge incorrect ou mensonger">Âge incorrect ou mensonger</option>
                <option value="Usage de l’app à des fins non prévues">Usage de l’app à des fins non prévues (ex : recherche de clients, sondage, etc.)</option>
                <option value="Multiples comptes">Multiples comptes créés par la même personne</option>
                <option value="1">Autre</option>
            </select>
            <input type="text" class="input w-full hidden" id="otherValue">
            <input type="file" class="input w-full" name="image" id="images" required>
            <button class="btn btn-primary" id="sendReport">Envoyé</button>
        </form>
        `)
        modalReport.render(this.app)
        document.getElementById("formReport").addEventListener("submit", (e) => e.preventDefault())
        document.getElementById("selectInput").addEventListener("change", (e) => {
            if (e.target.value == 1) {
                document.getElementById("otherValue").classList.remove("hidden")
            } else {
                document.getElementById("otherValue").classList.add("hidden")
            }

        })
        document.getElementById("sendReport").addEventListener('click', async () => {
            await this.report.newReport(id, otherID)
        })
        document.getElementById("report").addEventListener('click', () => {
            modalReport.open()
        })
    }
}