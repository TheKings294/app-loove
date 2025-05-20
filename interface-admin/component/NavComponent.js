export class NavComponent
{
    constructor() {
        this.el = document.createElement("aside")
        this.el.classList.add("w-64", "bg-base-200", "flex", "flex-col", "text-base-content", "p-4")
        this.el.innerHTML = `
            <h2 class="text-xl font-bold mb-4">Menu</h2>
            <ul class="menu">
                <li>
                    <a class="flex items-center gap-2" id="usersLink">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                             stroke-linejoin="round" class="lucide lucide-users-icon lucide-users">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                            <path d="M16 3.128a4 4 0 0 1 0 7.744"/>
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                            <circle cx="9" cy="7" r="4"/>
                        </svg>
                        Users
                    </a>
                </li>
                <li>
                    <a class="flex items-center gap-2" id="adminLink">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                             stroke-linejoin="round" class="lucide lucide-shield-user-icon lucide-shield-user">
                            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
                            <path d="M6.376 18.91a6 6 0 0 1 11.249.003"/>
                            <circle cx="12" cy="11" r="4"/>
                        </svg>
                        Modérateurs
                    </a>
                </li>
                <li>
                    <a class="flex items-center gap-2" id="reportLink">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                             stroke-linejoin="round" class="lucide lucide-gavel-icon lucide-gavel">
                            <path d="m14.5 12.5-8 8a2.119 2.119 0 1 1-3-3l8-8"/>
                            <path d="m16 16 6-6"/>
                            <path d="m8 8 6-6"/>
                            <path d="m9 7 8 8"/>
                            <path d="m21 11-8-8"/>
                        </svg>
                        Signalement
                    </a>
                </li>
                <li>
                    <a class="flex items-center gap-2" id="premiumLink">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                             stroke-linejoin="round" class="lucide lucide-badge-dollar-sign-icon lucide-badge-dollar-sign">
                            <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/>
                            <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/>
                            <path d="M12 18V6"/>
                        </svg>
                        Premium
                    </a>
                </li>
                <li>
                    <a class="flex items-center gap-2" id="statsLink">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                             stroke-linejoin="round" class="lucide lucide-chart-column-icon lucide-chart-column">
                            <path d="M3 3v16a2 2 0 0 0 2 2h16"/>
                            <path d="M18 17V9"/>
                            <path d="M13 17V5"/>
                            <path d="M8 17v-3"/>
                        </svg>
                        Statistiques
                    </a>
                </li>
            </ul>
            <div  class="mt-auto">
                <div class="flex items-center gap-3 p-2">
                    <div tabindex="0" role="button" class="btn btn-ghost btn-sm rounded-btn flex items-center gap-2">
                        <div class="avatar avatar-placeholder">
                            <div class="bg-neutral text-neutral-content w-8 rounded-full">
                                <span class="text-xs">UI</span>
                            </div>
                        </div>
                    </div>
                    <p class="text-sm font-medium">Your Name</p>
                </div>
                <div>
                    <hr class="my-4 border-base-300" />
                    <button class="btn btn-sm btn-error w-full" onclick="login()">Déconnexion</button>
                </div>
            </div>
    `
    }

    render(navigate, parent = document.body) {
        parent.appendChild(this.el)
        document.querySelector("#usersLink").addEventListener('click', () => navigate('users'))
        document.querySelector("#adminLink").addEventListener('click', () => navigate('admin'))
        document.querySelector("#reportLink").addEventListener('click', () => navigate('report'))
        document.querySelector("#premiumLink").addEventListener('click', () => navigate('premium'))
        document.querySelector("#statsLink").addEventListener('click', () => navigate('stats'))
    }
}

//loginController