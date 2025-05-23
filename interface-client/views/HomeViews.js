import {Dock} from "../component/Dock.js";
import {User} from "../component/User.js";
import {Footer} from "../component/Footer.js";
import {Modal} from "../component/Modal.js";

export class HomeViews
{
    constructor() {
        this.app = document.querySelector(".app")
    }
    render(navigate)
    {
        document.querySelector(".app").innerHTML = ``
        const title = document.createElement("p")
        title.textContent = "Home"
        title.className = "text-center text-[20px] mt-5"
        document.querySelector(".app").appendChild(title)

        const divUsersList = document.createElement("div")
        divUsersList.className = "flex flex-col items-center gap-4 my-8"
        for (let i = 0; i < 10; i++) {
            const user = new User("John Doe")
            user.render(navigate, divUsersList)

            const userContent = `
            <div class="relative">
              <img src="https://images.unsplash.com/photo-1527980965255-d3b416303d12" alt="User 1" class="w-full h-72 object-cover">
              <h2 class="absolute bottom-[-1.25rem] left-1/2 transform -translate-x-1/2 text-4xl text-black bg-white px-4 rounded-xl font-serif">
                User 1
              </h2>
            </div>
            <div class="px-6 pt-10 pb-6 text-black font-serif">
              <p class="text-justify text-sm leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus nunc sed ultrices volutpat. Curabitur 
                semper imperdiet sapien, eu suscipit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus 
                nunc sed ultrices volutpat. Curabitur semper imperdiet sapien, eu suscipit. Lorem ipsum dolor sit amet, 
                consectetur adipiscing elit. In cursus nunc sed ultrices volutpat. Curabitur semper imperdiet sapien, eu suscipit.
              </p>
            </div>
            <div class="flex justify-center gap-8 pb-6">
              <button class="btn btn-lg bg-rose-200 hover:bg-rose-300 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <button class="btn btn-lg bg-rose-200 hover:bg-rose-300 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 
                  7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 
                  14.76 3 16.5 3 19.58 3 22 5.42 
                  22 8.5c0 3.78-3.4 6.86-8.55 
                  11.54L12 21.35z" />
                </svg>
              </button>
            </div>
            `

            const modalUser = new Modal("", userContent)
            modalUser.render(this.app)
            user.el.addEventListener("click", () => modalUser.open())
        }
        document.querySelector(".app").appendChild(divUsersList)
        new Footer().render(navigate, this.app)
        new Dock().render(navigate, this.app)
    }
}