// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-analytics.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA2h-wiSTqAAgaiDUfTW9a9Wo8SQMmtNE0",
    authDomain: "finalterm-sportstorewebsite.firebaseapp.com",
    databaseURL: "https://finalterm-sportstorewebsite-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "finalterm-sportstorewebsite",
    storageBucket: "finalterm-sportstorewebsite.appspot.com",
    messagingSenderId: "27703797006",
    appId: "1:27703797006:web:4d954fa9a2a570ef04235f",
    measurementId: "G-JRVDWHTEEJ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const shoesRef = database.ref('Product/Shoes');

const productTable = document.getElementById('productTable').getElementsByTagName('tbody')[0];






function setData()
{
    const dType = document.getElementById('dType').value;
    if(dType === "Shoes")
    {

    }
    if(dType === "Clothes")
    {

    }
    if(dType === "Accessory")
    {

    }
}