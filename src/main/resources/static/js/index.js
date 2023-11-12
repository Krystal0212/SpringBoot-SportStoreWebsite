import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import {app} from './firebase-config.js'

const customerName = document.getElementById('customerName');
const dropdownBox = document.getElementById('dropdownBox');

const userJSON = localStorage.getItem('google checker');
const userJSON2 = localStorage.getItem('user');

const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", function() {
    const logoutButton = document.getElementById('logOut');
    // Các thao tác với logoutButton
    // Click logout
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // If the user is signed in, user will have a value
            // Get the current user
            const loginIcon = document.getElementById('loginIcon');

            //Nut login
            // loginIcon.style.cssText="display:none !important;";

            // dropdownBox.style.cssText="display:block !important;";

            // Display a message if login is successful
            // const welcomeElement = document.createElement('div');
            // welcomeElement.textContent = 'Welcome,';
            //
            // const usernameElement = document.createElement('div');
            // usernameElement.textContent = userObject.userName;
            // usernameElement.id = 'accountShownName';

            // customerName.appendChild(welcomeElement);
            // customerName.appendChild(usernameElement);

            //set ten
            // customerName.textContent = userObject.userName;

            //Pass userObject.userName and userObject.isGoogleUser

            // Click logout
            logoutButton.addEventListener('click', () => {
                // Handle the Google user
                if (auth) {
                    signOut(auth)
                        .then(() => {
                            //hande cho user gg
                            localStorage.removeItem("google checker")
                            localStorage.removeItem("user")
                        })
                        .catch((error) => {
                            console.error('Error when signing out:', error);
                        });
                } else {
                    //bla
                }
            });
        } else {
            logoutButton.addEventListener('click', () => {
                //handle user thuong
                localStorage.removeItem("google checker")
                localStorage.removeItem("user")
            });
        }
    });
});



// if (userJSON || userJSON2) {
//     document.addEventListener('DOMContentLoaded', function () {
//         const userObject = JSON.parse(userJSON);
//
//         if (userObject.isGoogleUser) {
//             const auth = getAuth(app);
//             // Check if the user is signed in
//             onAuthStateChanged(auth, (user) => {
//                 if (user) {
//                     // If the user is signed in, user will have a value
//                     // Get the current user
//                     const loginIcon = document.getElementById('loginIcon');
//
//                     //Nut login
//                     // loginIcon.style.cssText="display:none !important;";
//
//                     // dropdownBox.style.cssText="display:block !important;";
//
//                     // Display a message if login is successful
//                     // const welcomeElement = document.createElement('div');
//                     // welcomeElement.textContent = 'Welcome,';
//                     //
//                     // const usernameElement = document.createElement('div');
//                     // usernameElement.textContent = userObject.userName;
//                     // usernameElement.id = 'accountShownName';
//
//                     // customerName.appendChild(welcomeElement);
//                     // customerName.appendChild(usernameElement);
//
//                     //set ten
//                     // customerName.textContent = userObject.userName;
//
//                     //Pass userObject.userName and userObject.isGoogleUser
//
//                     // Click logout
//                     logoutButton.addEventListener('click', () => {
//                         // Handle the Google user
//                         if (auth) {
//                             signOut(auth)
//                                 .then(() => {
//                                     //hande cho user gg
//                                     localStorage.removeItem("google checker")
//                                     localStorage.removeItem("user")
//                                 })
//                                 .catch((error) => {
//                                     console.error('Error when signing out:', error);
//                                 });
//                         } else {
//                             //handle cho user typing
//                             localStorage.removeItem("google checker")
//                             localStorage.removeItem("user")
//                         }
//                     });
//                 } else {
//                     // dropdownBox.style.cssText="display:none !important;";
//                 }
//             });
//
//         } else {
//             // Process when user logs in with normal account
//             // Example: hide or show corresponding components
//             logoutButton.style.display = 'block';
//             // Set name
//             const welcomeElement = document.createElement('div');
//             welcomeElement.textContent = 'Welcome';
//
//             const usernameElement = document.createElement('div');
//             usernameElement.textContent = userObject.userName;
//             usernameElement.id = 'accountShownName';
//
//             // Append the elements to the customerName element
//             customerName.appendChild(welcomeElement);
//             customerName.appendChild(usernameElement);
//
//             // const formData = new FormData();
//             //
//             // const userJSON = localStorage.getItem('user');
//             // const userObject = JSON.parse(userJSON);
//
//             // formData.append('userName', userObject.userName);
//             // formData.append('email', userObject.email);
//             // formData.append('isGoogleUser', userObject.isGoogleUser);
//             //
//             // //window.location.href = "/home"; // Update the URL as needed
//             // fetch('/google-login', {
//             //     method: 'POST',
//             //     body: formData,
//             // })
//             //     .then(response => response.json())
//             //     .then(data => {
//             //         // Handle the response here
//             // });
//
//             // Click log out
//             logoutButton.addEventListener('click', () => {
//                 // Log out normal user state
//                 logOutSuccessAlert()
//
//                 customerName.style.display = 'none';
//                 logoutButton.style.display = 'none';
//             });
//         }
//     });
// }else {
//     // document.getElementById('loginIcon').style.cssText="display: block !important;";
//     // document.getElementById('loginIcon').style.cssText="align: center !important;";
// }


async function logOutSuccessAlert() {
    await Swal.fire({
        icon: 'success',
        title: 'Thông báo',
        text: 'Đăng xuất thành công!',
    });
}

