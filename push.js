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
    "endpoint": "https://fcm.googleapis.com/fcm/send/dQFALIeyGBE:APA91bFoa6G4yB63Sv5AbioXDMMYnvSPX8xv0sZx9tVaktzdENJprODtFLIVZl5nScD-lMOFaa366ssSh3L2wiPyZNzjGHElANWGxSzPMoWo8nYvRgTOpG0_HW1uZgWH_QIYGZxsuAT4",
    "keys": {
        "p256dh": "BPyIn3fhDFt4Vaam3xpSuNW4ar6FC/qg3zDaiPY3HnF6uOgiAVm0ZarqwKrT1e8e34bnf1iURyp1mNQ1tl2nOwI=",
        "auth": "5hVa+lb00OJmNqAML73/Kw=="
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