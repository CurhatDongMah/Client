import firebase from 'firebase';
class FirebaseSvc {
  constructor() {
    if (!firebase.apps.length) { //avoid re-initializing
      firebase.initializeApp({
        apiKey: "AIzaSyAeSAs5Zkr_7ShKMci42_XdXpqDZ4AUcGc",
        authDomain: "testingfirebasechat-a13f4.firebaseapp.com",
        projectId: "testingfirebasechat-a13f4",
        storageBucket: "testingfirebasechat-a13f4.appspot.com",
        messagingSenderId: "965004748981",
        appId: "1:965004748981:web:280513ca73f81acca6f6fc"
      });
     }
  }

  
}
const firebaseSvc = new FirebaseSvc();
export default firebaseSvc;