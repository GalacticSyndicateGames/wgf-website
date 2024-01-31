import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const base = "/wgf-website";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyAL_j7IRyX-XjhFKx2yrUTolvE0RhywoIs",
  authDomain: "galactic-command.firebaseapp.com",
  projectId: "galactic-command",
  storageBucket: "galactic-command.appspot.com",
  messagingSenderId: "1074993634157",
  appId: "1:1074993634157:web:3f3542ae6baaa234c55864",
  measurementId: "G-VZH99B0Y9W",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export function login() {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      forwardTo("/");
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

export function logout() {
  console.log("logging out");
  signOut(auth)
    .then((result) => {
      console.log("success", result);
    })
    .catch((error) => {
      console.log("error", error);
    });
}

export function forwardTo(path) {
  const finalPath = base + path;
  const statement = window.location.pathname !== finalPath;
  if (statement) {
    console.log("forwarding to", finalPath);
    window.location.replace(finalPath);
  }
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    forwardTo("/");
    // ...
  } else {
    forwardTo("/login");
    // User is signed out
    // ...
  }
});
