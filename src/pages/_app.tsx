import { useEffect } from "react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/Presentation/Redux";
//import '@radix-ui/themes/styles.css';
import { initializeApp } from 'firebase/app';
import { getToken, getMessaging } from 'firebase/messaging';

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
    if ('serviceWorker' in navigator) {
      console.log("hi");
      navigator.serviceWorker.register('/sw.js')
      .then((registration)=>{
        if (!("permission" in Notification)) {
          Notification.requestPermission();
        }
    
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
      })
      .catch((err)=>{
        console.error(err);
      });
    }
  }, []);
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
