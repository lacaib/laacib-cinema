import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getFirestore
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
getAuth,
GoogleAuthProvider,
signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {

apiKey: "AIzaSyBHXDHJq6iX_wUi3B9Ggbs_YMyIPCw6fpU",

authDomain: "laacib-cinema.firebaseapp.com",

projectId: "laacib-cinema",

storageBucket: "laacib-cinema.firebasestorage.app",

messagingSenderId: "504616052691",

appId: "1:504616052691:web:1d432f3fa51a88f8217126"

};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export {
db,
auth,
provider,
signInWithPopup
};