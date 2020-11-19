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
    "endpoint": "https://fcm.googleapis.com/fcm/send/dw4EJqwqb_o:APA91bFhJp6FmRL4NgYrME35qpCMmzswQ9ukN6NDZd5vywbS-fA9W52vuHgJ_EBo9ETE1o5il9yv4z7NSYiGPf8ifWAS3A2OEa4ZC7Z3urh91Ugn-M0OQwGTK_IcDXXAa_fNpoIf-mY2",
    "keys": {
        "p256dh": "BNOmnIkt/c10Wj8Pkh645nwFYqfvVJhvuWg6qxJuGDT8rmXFPHqDdcC7wokg0LA5uoj0R7wLzPp0K5Yp3qJgBpM=",
        "auth": "jJMn2WJr7dYLvnGXXqun0w=="
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