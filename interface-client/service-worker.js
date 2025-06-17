importScripts("https://js.pusher.com/beams/service-worker.js");
importScripts('/helper/db-helper-sw.js')


self.addEventListener('push', async (e) => {
    const data = e.data ? e.data.json() : {};

    console.log(data)

    if (data.data.type === 1) {
        const alreadyReceived = await hasMessageId(data.data.id);
        console.log(alreadyReceived)
        if (!alreadyReceived) {
            e.waitUntil(
                (async () => {
                    await self.registration.showNotification(data.title || 'Clink', {
                        body: data.body || 'Vous avez un nouveau message',
                    });
                    await addMessageId(data.data.id);
                })()
            );
        }
    } else if (data.data.type === 2) {
        e.waitUntil(
            self.registration.showNotification(data.title || 'Clink', {
                body: data.body || 'Vous avez un nouveau match',
            })
        );
    }
})