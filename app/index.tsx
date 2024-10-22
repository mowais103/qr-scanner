import { Redirect } from "expo-router";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCvon6pWn5ZlFAVmRs7ufiIFlwUxJO00i8",
  authDomain: "qr-scanner-d525b.firebaseapp.com",
  projectId: "qr-scanner-d525b",
  storageBucket: "qr-scanner-d525b.appspot.com",
  messagingSenderId: "1050631235282",
  appId: "1:1050631235282:android:e47fb97c1eba9f5c392f0b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const Index = () => {
  return <Redirect href="/LogIn" />;
};
export default Index;
