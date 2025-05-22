export class SignInViews
{
    constructor() {
        this.app = document.querySelector(".app")
    }
    render(navigate) {
        document.querySelector(".app").innerHTML = ""

        const divOne = document.createElement("div")
        divOne.className = "divOne"

        const progress = document.createElement("div")
        progress.className = "flex justify-center items-center mt-7 flex-col"
        progress.innerHTML = `
        <progress class="progress progress-secondary w-56" value="5" max="100"></progress>
        <p class="font-[15px] mt-3">Vos Informations</p>
        `
        const imageInput = document.createElement("div")
        imageInput.className = "flex flex-col gap-4 justify-center items-center mt-3 mb-4"
        imageInput.innerHTML = `
        <div class="avatar avatar-placeholder">
            <div class="bg-neutral text-neutral-content w-24 rounded-full">
                <span class="text-3xl">JD</span>
            </div>
        </div>
        <input type="file" class="file-input rounded-lg" />
        `


        const form = document.createElement("form")
        form.className = "flex flex-col gap-4 mr-8 ml-8"
        form.innerHTML = `
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
        <input type="email" placeholder="Email" class="input input-bordered w-full rounded-lg"  />
        <input type="password" placeholder="Mot de passe" class="input input-bordered w-full rounded-lg" />
        <input type="password" placeholder="Confirmation Mot de passe" class="input input-bordered w-full rounded-lg" />
        <input type="text" placeholder="Ville" class="input input-bordered w-full rounded-lg" />
        <textarea placeholder="Biographie" class="textarea textarea-bordered w-full h-24 rounded-lg"></textarea>
        `

        const nextButton = document.createElement("button")
        nextButton.className = "btn btn-primary mt-7 float-end mr-8 rounded-lg"
        nextButton.textContent = "Suivant"
        nextButton.id = "nextToTwo"

        divOne.appendChild(progress)
        divOne.appendChild(imageInput)
        divOne.appendChild(form)
        divOne.appendChild(nextButton)

        const divTwo = document.createElement("div")
        divTwo.style.display = 'none'

        const progressTwo = document.createElement("div")
        progressTwo.className = "flex justify-center items-center mt-7 flex-col mb-4"
        progressTwo.innerHTML = `
        <progress class="progress progress-secondary w-56" value="50" max="100"></progress>
        <p class="font-[15px] mt-3">Ce que vous recherchez</p>
        `

        const shearshChoise = document.createElement("form")
        shearshChoise.className = "flex flex-col gap-4 mr-8 ml-8"
        shearshChoise.innerHTML = `
        <select class="select w-full rounded-lg">
              <option disabled selected>Choisir un genre</option>
              <option value="man">Homme</option>
              <option value="woman">Femme</option>
              <option value="other">Autre</option>
        </select>
        <input type="number" class="input validator w-full rounded-lg" required/>
        `

        const relationTypeChoise = document.createElement("div")
        relationTypeChoise.className = "flex items-center justify-center p-6"
        relationTypeChoise.innerHTML = `
        <form class="grid grid-cols-2 gap-6 max-w-md mx-auto">
            <label class="choice-card cursor-pointer">
               <input type="radio" name="relation" class="hidden" value="serieuse" />
               <div class="card bg-full-white shadow-md rounded-xl items-center p-4 text-center space-y-2 transition-all h-44 flex flex-col justify-between">
                 <img src="../assets/img-3-removebg-preview.png" alt="verre 1" class="h-20 mx-auto" />
                 <p class="font-medium text-sm">Pour une relation sérieuse</p>
               </div>
            </label>
            <!-- Choix 2 -->
            <label class="choice-card cursor-pointer">
              <input type="radio" name="relation" class="hidden" value="courte" />
              <div class="card bg-full-white shadow-md rounded-xl items-center p-4 text-center space-y-2 h-44 flex flex-col justify-between">
                <img src="../assets/img-4-removebg-preview.png" alt="verre 2" class="h-20 mx-auto" />
                <p class="font-medium text-sm">Pour une rencontre légère, fun et courte durée</p>
              </div>
            </label>
            <!-- Choix 3 -->
            <label class="choice-card cursor-pointer">
              <input type="radio" name="relation" class="hidden" value="detendue" />
              <div class="card bg-full-white shadow-md rounded-xl items-center p-4 text-center space-y-2 h-44 flex flex-col justify-between">
                <img src="../assets/img-removebg-preview.png" alt="verre 3" class="h-20 mx-auto" />
                <p class="font-medium text-sm">Pour une rencontre détendue et sans pression</p>
              </div>
            </label>        
            <!-- Choix 4 -->
            <label class="choice-card cursor-pointer">
              <input type="radio" name="relation" class="hidden" value="festive" />
              <div class="card bg-full-white shadow-md rounded-xl items-center p-4 text-center space-y-2 h-44 flex flex-col justify-between">
                <img src="../assets/img-2-removebg-preview.png" alt="verre 4" class="h-20 mx-auto" />
                <p class="font-medium text-sm">Pour une aventure spontanée, festive</p>
              </div>
            </label>      
            <!-- Choix 5 -->
            <label class="choice-card cursor-pointer col-span-2">
              <input type="radio" name="relation" class="hidden" value="amicale" />
              <div class="card bg-full-white shadow-md rounded-xl items-center p-4 text-center space-y-2 h-44 flex flex-col justify-between">
                <img src="../assets/img-5-removebg-preview.png" alt="verre 5" class="h-20 mx-auto" />
                <p class="font-medium text-sm">Pour une relation amicale</p>
              </div>
            </label>
        </form>
        `

        const nextButtonTwo = document.createElement("button")
        nextButtonTwo.className = "btn btn-primary mt-7 float-end mr-8 rounded-lg"
        nextButtonTwo.textContent = "Suivant"
        nextButtonTwo.id = "nextToTree"
        const prevButtonTwo = document.createElement("button")
        prevButtonTwo.className = "btn btn-outline mt-7 float-start ml-8 rounded-lg"
        prevButtonTwo.textContent = "Précédent"
        prevButtonTwo.id = "prevToOne"

        divTwo.appendChild(progressTwo)
        divTwo.appendChild(shearshChoise)
        divTwo.appendChild(relationTypeChoise)
        divTwo.appendChild(nextButtonTwo)
        divTwo.appendChild(prevButtonTwo)

        const divTree = document.createElement("div")
        divTree.style.display = 'none'


        const progressTree = document.createElement("div")
        progressTree.className = "flex justify-center items-center mt-7 flex-col mb-10"
        progressTree.innerHTML = `
        <progress class="progress progress-secondary w-56" value="100" max="100"></progress>
        <p class="font-[15px] mt-3">Ce qui est important pour toi </p>
        `

        const rating = document.createElement("div")
        rating.className = 'flex flex-col gap-6'
        rating.innerHTML += `
        <div class="flex justify-between ml-2 mr-2">
            Communication
            <div class="rating rating-lg">
              <input type="radio" name="rating-1" class="mask mask-wine-glass bg-red" aria-label="1 glass" />
              <input type="radio" name="rating-1" class="mask mask-wine-glass bg-red" aria-label="2 glasses" />
              <input type="radio" name="rating-1" class="mask mask-wine-glass bg-red" aria-label="3 glasses" />
              <input type="radio" name="rating-1" class="mask mask-wine-glass bg-red" aria-label="4 glasses" />
              <input type="radio" name="rating-1" class="mask mask-wine-glass bg-red" aria-label="5 glasses" />
            </div>
        </div>
        <div class="flex justify-between ml-2 mr-2">
            Empathie
            <div class="rating rating-lg">
              <input type="radio" name="rating-2" class="mask mask-wine-glass bg-red" aria-label="1 glass" />
              <input type="radio" name="rating-2" class="mask mask-wine-glass bg-red" aria-label="2 glasses" />
              <input type="radio" name="rating-2" class="mask mask-wine-glass bg-red" aria-label="3 glasses" />
              <input type="radio" name="rating-2" class="mask mask-wine-glass bg-red" aria-label="4 glasses" />
              <input type="radio" name="rating-2" class="mask mask-wine-glass bg-red" aria-label="5 glasses" />
            </div>
        </div>
        <div class="flex justify-between ml-2 mr-2">
            Humour
            <div class="rating rating-lg">
              <input type="radio" name="rating-3" class="mask mask-wine-glass bg-red" aria-label="1 glass" />
              <input type="radio" name="rating-3" class="mask mask-wine-glass bg-red" aria-label="2 glasses" />
              <input type="radio" name="rating-3" class="mask mask-wine-glass bg-red" aria-label="3 glasses" />
              <input type="radio" name="rating-3" class="mask mask-wine-glass bg-red" aria-label="4 glasses" />
              <input type="radio" name="rating-3" class="mask mask-wine-glass bg-red" aria-label="5 glasses" />
            </div>
        </div>
        <div class="flex justify-between ml-2 mr-2">
            Fiabilité
            <div class="rating rating-lg">
              <input type="radio" name="rating-4" class="mask mask-wine-glass bg-red" aria-label="1 glass" />
              <input type="radio" name="rating-4" class="mask mask-wine-glass bg-red" aria-label="2 glasses" />
              <input type="radio" name="rating-4" class="mask mask-wine-glass bg-red" aria-label="3 glasses" />
              <input type="radio" name="rating-4" class="mask mask-wine-glass bg-red" aria-label="4 glasses" />
              <input type="radio" name="rating-4" class="mask mask-wine-glass bg-red" aria-label="5 glasses" />
            </div>
        </div>
        <div class="flex justify-between ml-2 mr-2">
            Sociabilité
            <div class="rating rating-lg">
              <input type="radio" name="rating-5" class="mask mask-wine-glass bg-red" aria-label="1 glass" />
              <input type="radio" name="rating-5" class="mask mask-wine-glass bg-red" aria-label="2 glasses" />
              <input type="radio" name="rating-5" class="mask mask-wine-glass bg-red" aria-label="3 glasses" />
              <input type="radio" name="rating-5" class="mask mask-wine-glass bg-red" aria-label="4 glasses" />
              <input type="radio" name="rating-5" class="mask mask-wine-glass bg-red" aria-label="5 glasses" />
            </div>
        </div>
        <div class="flex justify-between ml-2 mr-2">
            Spontanéité
            <div class="rating rating-lg">
              <input type="radio" name="rating-6" class="mask mask-wine-glass bg-red" aria-label="1 glass" />
              <input type="radio" name="rating-6" class="mask mask-wine-glass bg-red" aria-label="2 glasses" />
              <input type="radio" name="rating-6" class="mask mask-wine-glass bg-red" aria-label="3 glasses" />
              <input type="radio" name="rating-6" class="mask mask-wine-glass bg-red" aria-label="4 glasses" />
              <input type="radio" name="rating-6" class="mask mask-wine-glass bg-red" aria-label="5 glasses" />
            </div>
        </div>
        <div class="flex justify-between ml-2 mr-2">
            Ouverture d’esprit
            <div class="rating rating-lg">
              <input type="radio" name="rating-7" class="mask mask-wine-glass bg-red" aria-label="1 glass" />
              <input type="radio" name="rating-7" class="mask mask-wine-glass bg-red" aria-label="2 glasses" />
              <input type="radio" name="rating-7" class="mask mask-wine-glass bg-red" aria-label="3 glasses" />
              <input type="radio" name="rating-7" class="mask mask-wine-glass bg-red" aria-label="4 glasses" />
              <input type="radio" name="rating-7" class="mask mask-wine-glass bg-red" aria-label="5 glasses" />
            </div>
        </div>
        <div class="flex justify-between ml-2 mr-2">
            Romantisme
            <div class="rating rating-lg">
              <input type="radio" name="rating-8" class="mask mask-wine-glass bg-red" aria-label="1 glass" />
              <input type="radio" name="rating-8" class="mask mask-wine-glass bg-red" aria-label="2 glasses" />
              <input type="radio" name="rating-8" class="mask mask-wine-glass bg-red" aria-label="3 glasses" />
              <input type="radio" name="rating-8" class="mask mask-wine-glass bg-red" aria-label="4 glasses" />
              <input type="radio" name="rating-8" class="mask mask-wine-glass bg-red" aria-label="5 glasses" />
            </div>
        </div>
        <div class="flex justify-between ml-2 mr-2">
            Indépendance
            <div class="rating rating-lg">
              <input type="radio" name="rating-9" class="mask mask-wine-glass bg-red" aria-label="1 glass" />
              <input type="radio" name="rating-9" class="mask mask-wine-glass bg-red" aria-label="2 glasses" />
              <input type="radio" name="rating-9" class="mask mask-wine-glass bg-red" aria-label="3 glasses" />
              <input type="radio" name="rating-9" class="mask mask-wine-glass bg-red" aria-label="4 glasses" />
              <input type="radio" name="rating-9" class="mask mask-wine-glass bg-red" aria-label="5 glasses" />
            </div>
        </div>
        <div class="flex justify-between ml-2 mr-2">
            Créativité
            <div class="rating rating-lg">
              <input type="radio" name="rating-10" class="mask mask-wine-glass bg-red" aria-label="1 glass" />
              <input type="radio" name="rating-10" class="mask mask-wine-glass bg-red" aria-label="2 glasses" />
              <input type="radio" name="rating-10" class="mask mask-wine-glass bg-red" aria-label="3 glasses" />
              <input type="radio" name="rating-10" class="mask mask-wine-glass bg-red" aria-label="4 glasses" />
              <input type="radio" name="rating-10" class="mask mask-wine-glass bg-red" aria-label="5 glasses" />
            </div>
        </div>
        `
        const nextButtonTree = document.createElement("button")
        nextButtonTree.className = "btn btn-primary mt-7 float-end mr-8 rounded-lg"
        nextButtonTree.textContent = "Suivant"
        nextButtonTree.id = "send"
        const prevButtonTree = document.createElement("button")
        prevButtonTree.className = "btn btn-outline mt-7 float-start ml-8 rounded-lg"
        prevButtonTree.textContent = "Précédent"
        prevButtonTree.id = "prevToTwo"

        divTree.appendChild(progressTree)
        divTree.appendChild(rating)
        divTree.appendChild(nextButtonTree)
        divTree.appendChild(prevButtonTree)

        document.querySelector(".app").appendChild(divOne)
        document.querySelector(".app").appendChild(divTwo)
        document.querySelector(".app").appendChild(divTree)

        document.querySelector("#nextToTwo").addEventListener("click", () => {
            divOne.style.display = 'none'
            divTwo.style.display= 'block'
        })
        document.querySelector('#nextToTree').addEventListener('click', () => {
            divTwo.style.display = 'none'
            divTree.style.display = 'block'
        })
        document.querySelector("#prevToOne").addEventListener("click", () => {
            divTwo.style.display = 'none'
            divOne.style.display= 'block'
        })
        document.querySelector("#prevToTwo").addEventListener("click", () => {
            divTree.style.display = 'none'
            divTwo.style.display = 'block'
        })
        document.querySelector("#send").addEventListener("click", () => {
            navigate("home")
        })
    }
}


/*
<script>
    const imageInput = document.getElementById('imageInput');
    const avatarPreview = document.getElementById('avatarPreview');

    imageInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          avatarPreview.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  </script>
  */