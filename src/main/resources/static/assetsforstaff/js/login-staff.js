// import * as database from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
// import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
// import {app} from '../../js/firebase-config.js';
//
// const findMatchingStaff = (snapshot, username, password) => {
//     for (const snap in snapshot.val()) {
//         const staffData = snapshot.val()[snap];
//         if (staffData.username === username && staffData.password === password) {
//             console.log("Authentication successful!");
//
//             // Create a User object with the user's data
//             const user = {
//                 userId: staffId,
//                 userName: staffData.username,
//                 userPassword: staffData.password,
//                 role: staffData.role,
//                 fullName: staffData.name,
//             };
//
//             // Convert user data to a JSON string
//             const userJSON = JSON.stringify(user);
//
//             // Store the user data in localStorage for use in the protected index page
//             localStorage.setItem("user", userJSON);
//
//             if(staffData.role === "admin"){
//                 redirectToAdminPage(staffData, snap);
//             }
//             else if (staffData.role === "employee") {
//                 redirectToEmployeePage(staffData, snap);
//             }
//             else if (staffData.role === "salesmanager"){
//                 redirectToSalesManagerPage(staffData, snap);
//             }
//             else if (staffData.role === "productmanager"){
//                 redirectToSalesManagerPage(staffData, snap);
//             }
//             return;
//         }
//     }
//     console.log("Invalid username or password");
// };
//
//
// window.checkCredentials = function () {
//     console.log("staff checkCredentials function called");
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;
//
//     const dbRef = database.getDatabase();
//     const staffRef = database.ref(dbRef, "Staff");
//
//     database.get(staffRef)
//         .then((snapshot) => {
//             if (snapshot.exists()) {
//                 findMatchingStaff(snapshot, username, password);
//             } else {
//                 console.log("No data available in the 'staff' node");
//             }
//         })
//         .catch((error) => {
//             console.error("Error code:", error.code);
//             console.error("Error message:", error.message);
//         });
// };