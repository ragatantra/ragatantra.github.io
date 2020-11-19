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
    "endpoint": "https://fcm.googleapis.com/fcm/send/ekBTP0NQmDY:APA91bHCkSipDS9nL8sWy_ZGrZ1N5zy-kSq47G3346AqEsiyFb9aa_hrc9nJHqVGIzlqt7xHdjQN8sfipXBhfjQIW_wNxUceGYaH0_faUcwC_GSTXPM2c8q8-7mLpcvItlYCGsERqkHe",
    "keys": {
        "p256dh": "BEqqZHr9/l0T3NY/NyUetnUGTL/0rZer3fC5cRNqqkLaYBcugbEcluHy+cLeJNveT9jhfrhcu72wEjlGX7t8AqA=",
        "auth": "lsxEelpGrImSPw6zV2jtKw=="
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