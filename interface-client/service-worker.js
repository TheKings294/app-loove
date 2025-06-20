importScripts("https://js.pusher.com/beams/service-worker.js");
importScripts('/helper/db-helper-sw.js')


self.addEventListener('push', async (e) => {
    const data = e.data ? e.data.json() : {};

    e.waitUntil(
        (async () => {
            await self.registration.showNotification(data.title || 'Clink', {
                body: data.body || 'Vous avez un nouveau message',
            });
            await addMessageId(data.data.id);
        })()
    );
})