import {StatsModel} from "../model/StatsModel.js";

export class StatsController {
    constructor() {
        this.model = new StatsModel()
    }
    async getAllStats() {
        const result = await this.model.getAllStats()
        console.log(result)

        const divStats = document.createElement("div")
        divStats.className = "flex flex-col items-center gap-8 p-6 bg-background min-h-screen"

        const divGraph = document.createElement("div")
        divGraph.className = "flex flex-wrap justify-center gap-8 w-full"

        const genderGraph = document.createElement("canvas")
        genderGraph.id = "genderGraph"
        genderGraph.className = "bg-card rounded-xl shadow-lg max-w-xs w-full h-auto p-4"

        const skillGraph = document.createElement("canvas")
        skillGraph.id = "skillGraph"
        skillGraph.className = "bg-card rounded-xl shadow-lg w-full md:max-w-[80rem] h-[500px] p-4"
        skillGraph.width = 1000
        skillGraph.height = 600

        const divCount = document.createElement("div")
        divCount.className = "flex flex-wrap justify-center gap-6 w-full"

        const userCount = document.createElement("div")
        userCount.className = "bg-card rounded-lg shadow-md px-6 py-4 text-center"
        userCount.innerHTML = `
        <p class="text-foreground text-lg font-medium">Utilisateur : 
        <span class="text-primary font-bold">${result.data.user[0].user_count}</span>
        <\p>
        `
        const premiumCount = document.createElement("div")
        premiumCount.className = "bg-card rounded-lg shadow-md px-6 py-4 text-center"
        premiumCount.innerHTML = `
        <p class="text-foreground text-lg font-medium">Premium : 
        <span class="text-primary font-bold">${result.data.premium[0].user_premium}</span>
        <\p>
        `
        const ageAverage = document.createElement("div")
        ageAverage.className = "bg-card rounded-lg shadow-md px-6 py-4 text-center"
        ageAverage.innerHTML = `
        <p class="text-foreground text-lg font-medium">Moyenne d'age : 
        <span class="text-primary font-bold">${Math.trunc(result.data.age[0].age)} ans</span> 
        <\p>
        `

        const total = document.createElement("div")
        total.className = "bg-card rounded-lg shadow-md px-6 py-4 text-center"
        total.innerHTML = `
        <p class="text-foreground text-lg font-medium">Revenue du mois : 
        <span class="text-primary font-bold">${Math.trunc(result.data.transaction)} €</span> 
        <\p>
        `

        new Chart(genderGraph, {
            type: 'doughnut',
            data: {
                labels: ['Homme', 'Femme', 'Autres'],
                datasets: [{
                    labels: 'Genre',
                    data : [result.data.gender[0].count, result.data.gender[1].count, result.data.gender[2].count],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                }
            },
        })
        new Chart(skillGraph, {
            type: 'bar',
            data: {
                labels: ['Communication', 'Empathie', 'Humour', 'Fiabilité', 'Sociabilité', 'Spontanéité',
                    'Ouverture d’esprit', 'Romantisme', 'Indépendance', 'Créativité'],
                datasets: [{
                    label: 'Skill',
                    data : [
                        Math.trunc(result.data.soft[0][1]),
                        Math.trunc(result.data.soft[0][2]),
                        Math.trunc(result.data.soft[0][3]),
                        Math.trunc(result.data.soft[0][4]),
                        Math.trunc(result.data.soft[0][5]),
                        Math.trunc(result.data.soft[0][6]),
                        Math.trunc(result.data.soft[0][7]),
                        Math.trunc(result.data.soft[0][8]),
                        Math.trunc(result.data.soft[0][9]),
                        Math.trunc(result.data.soft[0][10]),
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        min: 0,
                        max: 5,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            },
        })

        divCount.appendChild(userCount)
        divCount.appendChild(premiumCount)
        divCount.appendChild(ageAverage)
        divCount.appendChild(total)

        divGraph.appendChild(genderGraph)
        divGraph.appendChild(divCount)
        divGraph.appendChild(skillGraph)

        divStats.appendChild(divGraph)

        divStats.style.overflowY = "scroll"

        return divStats
    }
}