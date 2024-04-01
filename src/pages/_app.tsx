import { useEffect } from "react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/Presentation/Redux";
//import '@radix-ui/themes/styles.css';
import { initializeApp } from 'firebase/app';
import { getToken, getMessaging, onMessage } from 'firebase/messaging';

const firebaseKey = {
  apiKey: "AIzaSyBXQM2A0LabkYjaSGLaJhi1W3whgcCXSE4",
  authDomain: "capston-37752.firebaseapp.com",
  projectId: "capston-37752",
  storageBucket: "capston-37752.appspot.com",
  messagingSenderId: "10082583717",
  appId: "1:10082583717:web:fffe180e8268571e9f794c",
  measurementId: "G-HHLFPHMMHR"
};
const app = initializeApp(firebaseKey);

import "./global.css";

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(()=>{
    if (!("permission" in Notification)) {
      Notification.requestPermission();
    }
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/firebase-messaging-sw.js').then(function(registration){
        const messaging = getMessaging();

        getToken(
          messaging, 
          { vapidKey: 'BHnZZSGA3NSOKwPYOQlD75Y7czLDJQoRrfR0l0JMS8e5L8sB-dhZXb7sUeojCDKyjYouru53H2GDR1ea0mnSIws' }
        ).then((currentToken) => {
          if (currentToken) {
            console.log(currentToken);
          } else { 
            console.log('No registration token available. Request permission to generate one.');
          }
        }).catch((err) => {
          console.log(err);
        });

        onMessage(messaging, (payload) => {
          console.log(payload);
          let notificationOptions = {
            body: 'Some Notification information',
            icon: ''
          }
          let notif = new Notification('My New Notification', notificationOptions);

          notif.onclick = () => {
            console.log('Notification clicked');
          }
        });
      }).catch(console.log);
    }
  }, []);
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
