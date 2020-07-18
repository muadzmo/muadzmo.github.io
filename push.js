var webPush = require('web-push');
     
const vapidKeys = {
   "publicKey": "BGg8iDQpMFGEOF4WxT6a1xlZMMBbGW1Cic2HUJ-vTvERlEehG3jzZX-4nnLeo7o86z_CX_FCTF18U3Q8W0jbt8U",
   "privateKey": "CrG24JZf95YlFhDNezqJfRZz5ilSyB2WD-8RqXPBywo"
};
 
 
webPush.setVapidDetails(
   'mailto:muadzmohamad13@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/ey_EljcjPKU:APA91bF2beaN9IaMgVW9yUBUOTUpdkKyDCVIFbf2y1cH40ZDhz2Tf8z7pI9zgX2oehWozhu6imKcBtOjAhK6jZMDBMKkc9wmSUv-45Rdz4QxdDnXfe1MKHscajEecXw-sjw1e0F_uy_l",
   "keys": {
       "p256dh": "BHa13mFaDsYOaMRooTsqI2+AZYeETKaJfvBIbisDJ641cAvEoWlkHn+sy71r79hPpHjx/B8wMJkW3IrAa7LBn48=",
       "auth": "s5TVmzVpsgrBR9MuzG+DXw=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '484856945109',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);