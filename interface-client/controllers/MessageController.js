import {UserModel} from "../models/UserModel.js";
import {Chat} from "../component/Chat.js";
import {addMessageId} from "../helper/db-helper.js";

export class MessageController {
    constructor() {
        this.model = new UserModel()
    }
     async getAllMessages(convID) {
         this.messageContent = document.getElementById("messages")
        const result = await this.model.getAllMessages(convID)
         if (result.data.data.length !== 0) {
             result.data.data.forEach((message) => {
                 if (message.user_send_it == localStorage.getItem('id')) {
                    new Chat(message.content, "end").render(this.messageContent)
                 } else {
                    new Chat(message.content, 'start').render(this.messageContent)
                 }
             })
         }
     }
     conection(idA, idB, chanelName) {

         this.pusher = new Pusher('25ea8b5586413d679037', {
             cluster: 'eu',
             forceTLS: true,
             authorizer: (channel, options) => {
                 return {
                     authorize: (socketId, callback) => {
                         const params = new URLSearchParams();
                         params.append('socket_id', socketId);
                         params.append('channel_name', chanelName);

                         const xhr = new XMLHttpRequest();
                         xhr.open('POST', 'https://api.clink.test/pusher/auth', true);
                         xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                         xhr.setRequestHeader('Authorization', `Bearer ${this.model.token}`);
                         xhr.withCredentials = true;

                         xhr.onreadystatechange = function () {
                             if (xhr.readyState === 4) {
                                 if (xhr.status === 200) {
                                     try {
                                         const data = JSON.parse(xhr.responseText);
                                         callback(null, data);
                                     } catch (e) {
                                         callback(true, { error: 'Réponse JSON invalide' });
                                     }
                                 } else {
                                     callback(true, { error: xhr.responseText });
                                 }
                             }
                         };

                         xhr.send(params.toString());
                     }
                 };
             }
         });



         this.chanel = this.pusher.subscribe(chanelName)

         this.chanel.bind('new-message', async (data) => {
             if (localStorage.getItem('id') == data.to) {
                 new Chat(data.message, 'start').render(this.messageContent)
                 await addMessageId(data.message_id)
             }
         })
     }
     async sendMessage(content, id, otherID, convID) {
        new Chat(content, 'end').render(this.messageContent)

         const formData = new FormData()
         formData.append('message', content)

         await this.model.sendMessage(formData, id, otherID, convID)
     }
}