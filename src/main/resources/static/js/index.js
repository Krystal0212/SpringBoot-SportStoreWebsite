import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import {app} from './firebase-config.js'

const logoutButton = document.getElementById('logOut');
const customerName = document.getElementById('customerName');

const userJSON = localStorage.getItem('user');

if (userJSON) {
    document.addEventListener('DOMContentLoaded', function () {
        const userObject = JSON.parse(userJSON);

        if (userObject.isGoogleUser) {
            const auth = getAuth(app);

            // Check if the user is signed in
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    // If the user is signed in, user will have a value
                    // Get the current user
                    const loginIcon = document.getElementById('loginIcon');

                    // Hide the login button by setting the style.display property to 'none'
                    loginIcon.style.display = 'none';

                    // Show the logout button if login is successful
                    logoutButton.style.display = 'block';

                    // Display a message if login is successful
                    const welcomeElement = document.createElement('div');
                    welcomeElement.textContent = 'Welcome,';

                    const usernameElement = document.createElement('div');
                    usernameElement.textContent = userObject.userName;
                    usernameElement.id = 'accountShownName';

                    //Pass userObject.userName and userObject.isGoogleUser

                    // Click logout
                    logoutButton.addEventListener('click', () => {
                        // Handle the Google user
                        if (auth) {
                            signOut(auth)
                                .then(() => {
                                    logOutSuccessAlert();
                                })
                                .catch((error) => {
                                    console.error('Error when signing out:', error);
                                });
                        } else {
                            // bla
                        }
                    });
                } else {
                    customerName.style.display = 'none';
                    logoutButton.style.display = 'none';
                }
            });

        } else {
            // Process when user logs in with normal account
            // Example: hide or show corresponding components
            logoutButton.style.display = 'block';
            // Set name
            const welcomeElement = document.createElement('div');
            welcomeElement.textContent = 'Welcome';

            const usernameElement = document.createElement('div');
            usernameElement.textContent = userObject.userName;
            usernameElement.id = 'accountShownName';

            // Append the elements to the customerName element
            customerName.appendChild(welcomeElement);
            customerName.appendChild(usernameElement);

            // Click log out
            logoutButton.addEventListener('click', () => {
                // Log out normal user state
                logOutSuccessAlert()

                customerName.style.display = 'none';
                logoutButton.style.display = 'none';
            });
        }
    });
}


async function logOutSuccessAlert() {
    await Swal.fire({
        icon: 'success',
        title: 'Thành công!',
        text: 'Đăng xuất thành công!',
    });
    localStorage.removeItem("user")
    window.location.href = "/home";
}