import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import {
    getDatabase,
    ref,
    query,
    orderByChild,
    equalTo,
    get,
    set
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";

import {app} from '../../js/firebase-config.js';

const customerName = document.getElementById('customerName');
const dropdownBox = document.getElementById('dropdownBox');

const userJSON = localStorage.getItem('google checker');
const userJSON2 = localStorage.getItem('user');
const userID = localStorage.getItem('userID');

if (userJSON2) {
    Swal.fire({
        icon: 'error',
        title: 'Access Denied!',
        text: 'You are not allowed to access the staff section.',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Go to Home Page',
        allowOutsideClick: false
    }).then((result) => {
        // Redirect the user to the home or index page
        if (result.isConfirmed) {
            window.location.href = "/"; // Change this to the desired home or index page
        }
    });
} else {
    window.location.href = "/staff/login";
}