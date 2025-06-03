import {UserModel} from "../models/UserModel.js";

export class HomeController {
    constructor() {
        this.model = new UserModel()
    }

    async getUsers() {
        let latitude = 0
        let longitude = 0
        navigator.geolocation.getCurrentPosition(
            (position) => {
                latitude = position.coords.latitude
                longitude = position.coords.longitude
            }
        )

        const result = await this.model.getUserCompatible(longitude, latitude)

        return result
    }
}