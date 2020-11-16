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
    "endpoint": "https://fcm.googleapis.com/fcm/send/dGhAJY6FPu8:APA91bH4k3mRyRUFxC0rsqMuwfMhEi7cnV7L1C2FQIXhrpBLcjyukkUPQLzsvAOdW2o1LIWZaOS-rsqzIVQVbRk8MpODttwJgoRak-D48uD-dMTLJeCfv80OlJ-_-mJwBpBK7X0kLaGy",
    "keys": {
        "p256dh": "BE9wpWePRUUagMAhPou4+jj9qIduDCOG3xs467mcWz9xqF4VCuv2zsKaOVJG1qll28fv7NQG8b6zfgnbDCQpw98=",
        "auth": "KjdYM1IHylBxjcESSkG+Ng=="
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