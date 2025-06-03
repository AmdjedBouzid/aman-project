import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
//@ts-ignore
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDIMsXmL8lFEvem7lBbY1eT4foVxbnMvTo",
  authDomain: "statistics-abe90.firebaseapp.com",
  projectId: "statistics-abe90",
  storageBucket: "statistics-abe90.firebasestorage.app",
  messagingSenderId: "109843148916",
  appId: "1:109843148916:web:cffbf1d8f2079b030de121",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);
export const storage = getStorage(app);
