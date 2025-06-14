importScripts("https://js.pusher.com/beams/service-worker.js");

self.addEventListener('push', async (e) => {
    console.log('Push received');
    console.log('Push data:', event.data ? event.data.text() : 'No data');

    const data = event.data ? event.data.json() : {};

    event.waitUntil(
        self.registration.showNotification(data.title || 'New notification', {
            body: data.body || 'You have a new message!',
        })
    );
})