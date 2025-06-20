import {LikeRepo} from "../models/LikeRepo.js";
import {User} from "../component/User.js";
import {Modal} from "../component/Modal.js";
import {LikeController} from "./LikeController.js";
import {BASE_URL} from "../Constant.js";

export class PremiumController {
    constructor() {
        this.model = new LikeRepo()
        this.likeController = new LikeController()
    }
    async getMyLike() {
        const result = await this.model.getMyLike()

        const contentUserElement = document.createElement("div")
        contentUserElement.className = "flex flex-col items-center gap-4 my-8"

        result.data.data.forEach((user) => {
            const name = user.first_name + " " + user.last_name
            const userObjet = new User(name, `${BASE_URL}/uploads/` + user.image)
            userObjet.render(result, contentUserElement)
            userObjet.listener(() => this.modalLike(user))
        })
        if (contentUserElement.children.length === 0) {
            contentUserElement.innerHTML = `
            <p>Auccun utilisateur trouvé</p>
            `
        }
        return contentUserElement
    }
    async getMyUnlike() {
        const result = await this.model.getMyUnlike()

        const contentUserUnLikeElement = document.createElement("div")
        contentUserUnLikeElement.className = "flex flex-col items-center gap-4 my-8"

        result.data.data.forEach((user) => {
            const name = user.first_name + " " + user.last_name
            const userObjet = new User(name, user.image)
            userObjet.render(result, contentUserUnLikeElement)
            userObjet.listener(() => this.modalUnLike(user))
        })

        if (contentUserUnLikeElement.children.length === 0) {
            contentUserUnLikeElement.innerHTML = `
            <p>Auccun utilisateur trouvé</p>
            `
        }
        return contentUserUnLikeElement
    }
    async modalLike(user) {
        const container = document.createElement("div");
        container.className = "relative";

        const img = document.createElement("img");
        img.src = `https://api.clink.test/uploads/${user.image}`;
        img.alt = name;
        img.className = "w-full h-72 object-contain";
        container.appendChild(img);

        const h2 = document.createElement("h2");
        h2.className = "absolute bottom-[-1.25rem] left-1/2 transform -translate-x-1/2 text-4xl text-black bg-white px-4 rounded-xl font-serif";
        h2.textContent = name;
        container.appendChild(h2);

        const descDiv = document.createElement("div");
        descDiv.className = "px-6 pt-10 pb-6 text-black font-serif";

        const p = document.createElement("p");
        p.className = "text-justify text-sm leading-relaxed";
        p.textContent = user.description;

        descDiv.appendChild(p);

        const btnDiv = document.createElement("div");
        btnDiv.className = "flex justify-center gap-8 pb-6";
        btnDiv.dataset.id = user.id;

        const btnUnlike = document.createElement("button");
        btnUnlike.className = "btn btn-lg bg-rose-200 hover:bg-rose-300 rounded-xl";
        btnUnlike.onclick = () => this.likeController.unlike(user.id);

        const svgUnlike = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgUnlike.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svgUnlike.setAttribute("class", "h-6 w-6 text-black");
        svgUnlike.setAttribute("fill", "none");
        svgUnlike.setAttribute("viewBox", "0 0 24 24");
        svgUnlike.setAttribute("stroke", "currentColor");

        const pathUnlike = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pathUnlike.setAttribute("stroke-linecap", "round");
        pathUnlike.setAttribute("stroke-linejoin", "round");
        pathUnlike.setAttribute("stroke-width", "2");
        pathUnlike.setAttribute("d", "M6 18L18 6M6 6l12 12");

        svgUnlike.appendChild(pathUnlike);
        btnUnlike.appendChild(svgUnlike);

        const btnLike = document.createElement("button");
        btnLike.className = "btn btn-lg bg-rose-200 hover:bg-rose-300 rounded-xl";
        btnLike.onclick = () => this.likeController.like(user.id);

        const svgLike = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgLike.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svgLike.setAttribute("class", "h-6 w-6 text-black");
        svgLike.setAttribute("fill", "currentColor");
        svgLike.setAttribute("viewBox", "0 0 24 24");

        const pathLike = document.createElementNS("http://www.w3.org/2000/svg", "path");
        pathLike.setAttribute("d", `
          M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
          2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 
          14.76 3 16.5 3 19.58 3 22 5.42 
          22 8.5c0 3.78-3.4 6.86-8.55 
          11.54L12 21.35z
        `);

        svgLike.appendChild(pathLike);
        btnLike.appendChild(svgLike);

        btnDiv.appendChild(btnUnlike);
        btnDiv.appendChild(btnLike);

        const card = document.createElement("div");
        card.appendChild(container);
        card.appendChild(descDiv);
        card.appendChild(btnDiv);

        const modal = new Modal("", card)
        modal.render(document.querySelector(".app"))
        modal.open()
    }
    async modalUnLike(user) {
        const container = document.createElement("div");
        container.className = "relative";

        const img = document.createElement("img");
        img.src = `https://api.clink.test/uploads/${user.image}`;
        img.alt = name;
        img.className = "w-full h-72 object-contain";
        container.appendChild(img);

        const h2 = document.createElement("h2");
        h2.className = "absolute bottom-[-1.25rem] left-1/2 transform -translate-x-1/2 text-4xl text-black bg-white px-4 rounded-xl font-serif";
        h2.textContent = name;
        container.appendChild(h2);

        const descDiv = document.createElement("div");
        descDiv.className = "px-6 pt-10 pb-6 text-black font-serif";

        const p = document.createElement("p");
        p.className = "text-justify text-sm leading-relaxed";
        p.textContent = user.description;

        descDiv.appendChild(p);

        const card = document.createElement("div");
        card.appendChild(container);
        card.appendChild(descDiv);

        const modal = new Modal("", card)
        modal.render(document.querySelector(".app"))
        modal.open()
    }
}