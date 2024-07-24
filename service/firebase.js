import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'BPFWEc-DC-YT4GV8027RzQHfDOPE6hrTrugnrMwMZdRmqn2EOMmfzcAOnnwBcnLM8KmlfsTrDw0tXnj541wZSIU',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'gintec-778ed',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
