export function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('notif-db', 1);
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('messages')) {
                db.createObjectStore('messages', { keyPath: 'id' });
            }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

export async function hasMessageId(id) {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
        const read = db.transaction('messages', 'readonly');
        const store = read.objectStore('messages');
        const getReq = store.get(id);
        getReq.onsuccess = () => resolve(!!getReq.result);
        getReq.onerror = () => reject(getReq.error);
    });
}

export async function addMessageId(id) {
    const db = await openDatabase();
    const write = db.transaction('messages', 'readwrite');
    const store = write.objectStore('messages');
    store.put({ id });
    return write.complete;
}
