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
    "endpoint": "https://fcm.googleapis.com/fcm/send/ext9zMikkq4:APA91bGwAYKwxQw1eZkVJfYOQq14ZyZud9XUCCAGa9xyQ2DbJ8G32SeWYOsGK6bRLI8g5VM5B7jre2qd9MQd4-w9JSb9TmxCjyAou0_e1ZpBEhVFtKy-Rft2Qdqr69woc9syGrbwk5Au",
    "keys": {
        "p256dh": "BLTG1haz5WSuJA+yDFNlBva5LiMGR7LbC8+2awzpHuf49jOnOokP3mIvmzWOcC6LuVnHkskB8W3yf1gylZ/kfzc=",
        "auth": "Dr9MAwc7Ojcj/hZW5RiJ2A=="
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