import {ListUser} from "../component/ListUser.js";
import {ListAdmin} from "../component/ListAdmin.js";

export class Paginator {
    constructor(data, list, itemsPerPage = 20) {
        this.originalData = data
        this.filteredData = [...data]
        this.itemParPage = itemsPerPage
        this.curentPage = 1
        this.listObj = list

        this.contentDiv = document.getElementById("listDiv")
        this.prevBtn = document.getElementById("prev")
        this.nextBtn = document.getElementById("next")
        this.searchInput = document.getElementById("sendSearch")
        this.input = document.getElementById("search")

        this.searchInput.addEventListener('click', () => this.handleSearch())
        this.render()
    }
    handleSearch() {
        const query = this.input.value.toLowerCase()
        this.filteredData = this.originalData.filter(item => {
            if (this.listObj === ListUser) {
                return item[0].last_name.toLowerCase().includes(query)
            } else if (this.listObj === ListAdmin) {
                return item.username.toLowerCase().includes(query)
            }
        })
        this.curentPage = 1
        this.render()
    }
    paginateData() {
        const start = (this.curentPage - 1) * this.itemParPage
        const end = start + this.itemParPage
        return this.filteredData.slice(start, end)
    }
    renderItems() {
        const items = this.paginateData()
        this.contentDiv.innerHTML = ''

        new this.listObj(items).render(this.contentDiv)
    }
    handlePagination() {
        const totalPages = Math.ceil(this.filteredData.length / this.itemParPage);

        this.prevBtn.addEventListener("click", () =>{
            if (this.curentPage > 1) {
                this.curentPage = this.curentPage -1
                this.render()
            }
        })
        this.nextBtn.addEventListener("click", () => {
            if (this.curentPage < totalPages) {
                this.curentPage = this.curentPage + 1
                this.render()
            }
        })
    }
    render() {
        this.renderItems()
        this.handlePagination()
    }
}