var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BCHqtzKo7j9d0KBDAc9z6bpXNZEMegXQra0K7jjwhG0Ld7-FvwXyWIFgsNi3MYGP7kUdnQiacMaHwoVAK0gE6F0",
    "privateKey": "xrSG_iDy3-GDKEVHplrlWQm1s2KobdxWCs9OU0vfKoU"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/dmkgnrKK9QM:APA91bFEq1HWJ9Uw32nbE5Rs9yB0GzMjFvjsXVfP5RcYzKzBqg693e0zjP9FoTaD4sny1xRg9PW0scpwXQNuvD7tCCWqKsofTABrUS9LioXQDtZh1Adz2Z-g_1dQA2NXUNKHk-cngp42",
    "keys": {
        "p256dh": "BD+aSOVT4cB/Du+JOLHdhSlCfuaGYZXxvapuFNCTEhIbL8b06As5ElS5qD9/qL8L1rRvXthncPthUgfxWrxViG0=",
        "auth": "sm4K7f8GRExJYgl6RHlGkg=="
    }
};
var payload = 'Welcome in Football application Champions League';

var options = {
    gcmAPIKey: '29963220866',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);