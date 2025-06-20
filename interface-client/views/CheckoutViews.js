import {Toast} from "../component/Toast.js";
import {CheckoutController} from "../controllers/CheckoutController.js";
import {Dock} from "../component/Dock.js";

export class CheckoutViews {
    constructor() {
        this.app = document.querySelector(".app")
        this.controller = new CheckoutController()
    }

    async render(navigate) {
        this.app.innerHTML = ""
        const paimentDiv = document.createElement("div")
        paimentDiv.className = "mx-auto"
        paimentDiv.innerHTML = `
    <div class="max-w-md mx-auto px-4 py-6">
    <h3 class="text-xl font-semibold mb-4 text-center">Choisis un abonnement :</h3>

    <div class="flex flex-col sm:flex-row gap-4 mb-6" id="card-container">
      <div class="card border-2 border-gray-300 rounded-xl p-4 text-center cursor-pointer w-full sm:w-1/4" data-amount="10" data-month="1">1 mois 10€</div>
      <div class="card selected border-2 border-red-500 bg-red-50 rounded-xl p-4 text-center cursor-pointer w-full sm:w-1/4" data-amount="20" data-month="3">3 mois 20€</div>
      <div class="card border-2 border-gray-300 rounded-xl p-4 text-center cursor-pointer w-full sm:w-1/4" data-amount="60" data-month="6">6 mois 60€</div>
      <div class="card border-2 border-gray-300 rounded-xl p-4 text-center cursor-pointer w-full sm:w-1/4" data-amount="130" data-month="12">12 mois 130 €</div>
    </div>

    <div id="paypal-button-container" class="mb-4"></div>
    <p id="result-message" class="text-center text-green-600 font-medium"></p>
  </div>
    `
        this.app.appendChild(paimentDiv)

        new Dock().render(navigate, this.app)

        let selectedAmount = "10";

        function updateSelection(cardEl) {
            document.querySelectorAll(".card").forEach(card => {
                card.classList.remove("selected", "border-red-500", "bg-red-50");
                card.classList.add("border-gray-300");
            });

            cardEl.classList.add("selected", "border-red-500", "bg-red-50");
            cardEl.classList.remove("border-gray-300");

            selectedAmount = cardEl.getAttribute("data-amount");
            renderPayPalButton();
        }


        document.querySelectorAll(".card").forEach(card => {
            card.addEventListener("click", () => updateSelection(card));
        });
        renderPayPalButton();

        const controller = this.controller

        function renderPayPalButton() {
            document.getElementById("paypal-button-container").innerHTML = "";

            window.paypal.Buttons({
                createOrder: function(data, actions) {
                    return actions.order.create({
                        purchase_units: [{
                            amount: { value: selectedAmount }
                        }]
                    });
                },
                onApprove: function(data, actions) {
                    return actions.order.capture().then((details) => {
                        resultMessage("Paiement validé !");
                        setTimeout(async () => {
                            const durationTime = document.querySelector(".selected").getAttribute("data-month")
                            const now = new Date()
                            const endDate = new Date(now.setMonth(now.getMonth() + Number(durationTime)))
                            const result = await controller.setPremium(endDate.toISOString())
                            if (!result.success) {
                                new Toast("Erreur lors de l'enregistrement", "alert-error")
                                return
                            }
                            new Toast("Payment validé").render()
                            localStorage.setItem('premium', 1)
                            navigate('premium')
                        }, 2000);
                    });
                },
                onError: function(err) {
                    alert('Erreur lors du paiement : ' + err);
                }
            }).render('#paypal-button-container');
        }

        function resultMessage(message) {
            const container = document.querySelector("#result-message");
            container.innerHTML = message;
        }
    }
}