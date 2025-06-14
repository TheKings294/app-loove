export class NotifController {
    constructor() {
        this.beamsClient = new PusherPushNotifications.Client({
            instanceId: '50544c52-7dca-4b83-b955-f131e7cd889b',
        });
    }
    suscribe(userID) {
        console.log(`user-${userID}`)
        this.register()
            .then(() => this.beamsClient.start())
            .then(() => this.beamsClient.addDeviceInterest(`user-${userID}`))
            .then(() => console.log('Successfully registered and subscribed!'))
            .catch(console.error);
    }
    register() {
        if ('serviceWorker' in navigator) {
            return navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('Service Worker registered with scope:', registration.scope);
                    return registration;
                })
                .catch(error => {
                    console.error('Service Worker registration failed:', error);
                    throw error;
                });
        }
        else {
            return Promise.reject(new Error('Service workers not supported'));
        }
    }
}