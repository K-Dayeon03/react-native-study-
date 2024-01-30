// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
//https://test-app-426d0-default-rtdb.firebaseio.com/
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app";

// 사용할 파이어베이스 서비스 주석을 해제합니다
//import "firebase/compat/auth";
import "firebase/compat/database";
//import "firebase/compat/firestore";
//import "firebase/compat/functions";
import "firebase/compat/storage";

// Initialize Firebase
//파이어베이스 사이트에서 봤던 연결정보를 여기에 가져옵니다
const firebaseConfig = {
  apiKey: "AIzaSyA6ltJNn-JDpd7JfjkTBcORSSGiD3jpXCA",
  authDomain: "bap-cou.firebaseapp.com",
  databaseURL: "https://bap-cou-default-rtdb.firebaseio.com",
  projectId: "bap-cou",
  storageBucket: "bap-cou.appspot.com",
  messagingSenderId: "680469030334",
  appId: "1:680469030334:web:f1f1035b5601e1f66405ef",
  measurementId: "G-6S3QTDYLB9"
};
//사용 방법입니다.
//파이어베이스 연결에 혹시 오류가 있을 경우를 대비한 코드로 알아두면 됩니다.
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const firebase_db = firebase.database()

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);