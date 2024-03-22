
import { initializeApp } from "firebase/app";
import    {getFirestore} from '@firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyCH2ehy8slCCjWRm6AsH4KnzROQxFqiyn8",
    authDomain: "docs-app-25f56.firebaseapp.com",
projectId: "docs-app-25f56",
storageBucket: "docs-app-25f56.appspot.com",
messagingSenderId: "183439599384",
appId: "1:183439599384:web:ea64a04c7f36e0a046206d",
measurementId: "G-LCHFYF6TCS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firestore=getFirestore(app);




