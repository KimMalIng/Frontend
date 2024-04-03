importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

const firebaseKey = {
  apiKey: "AIzaSyBXQM2A0LabkYjaSGLaJhi1W3whgcCXSE4",
  authDomain: "capston-37752.firebaseapp.com",
  projectId: "capston-37752",
  storageBucket: "capston-37752.appspot.com",
  messagingSenderId: "10082583717",
  appId: "1:10082583717:web:fffe180e8268571e9f794c",
  measurementId: "G-HHLFPHMMHR"
};

firebase.initializeApp(firebaseKey);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo.png'
  };
  self.registration.showNotification(notificationTitle,
    notificationOptions);
});