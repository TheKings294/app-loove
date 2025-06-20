import {UserAdminModel} from "../model/userAdminModel.js";

export class UsersController
{
    constructor() {
        this.model = new UserAdminModel()
    }
    async getUsersList() {
        const data = await this.model.getAll()

        if (!data.success) {
            document.cookie = "session_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.clink.local;"
            return false;
        }

        return data.data
    }
}