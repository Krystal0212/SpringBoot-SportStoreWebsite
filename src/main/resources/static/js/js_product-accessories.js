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
            const loginIcon = document.getElementById('loginIcon');

            logoutButton.addEventListener('click', () => {
                // Handle the Google user
                if (auth) {
                    signOut(auth)
                        .then(() => {
                            //hande cho user gg
                            Swal.fire({
                                title: 'Are you sure?',
                                text: 'You will be logged out!',
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Yes, log me out!'
                            }).then((result) => {
                                // Nếu người dùng nhấn OK (confirm)
                                if (result.isConfirmed) {
                                    // Chuyển đến trang logout khi người dùng đồng ý
                                    localStorage.removeItem("google checker")
                                    localStorage.removeItem("user")
                                    localStorage.removeItem("userID")
                                    window.location.href = "/accessories";
                                }
                            });

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
                Swal.fire({
                    title: 'Are you sure?',
                    text: 'You will be logged out!',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, log me out!'
                }).then((result) => {
                    // Nếu người dùng nhấn OK (confirm)
                    if (result.isConfirmed) {
                        // Chuyển đến trang logout khi người dùng đồng ý
                        localStorage.removeItem("google checker")
                        localStorage.removeItem("user")
                        localStorage.removeItem("userID")

                        window.location.href = "/accessories";
                    }
                });
            });
        }
    });
});


async function logOutSuccessAlert() {
    await Swal.fire({
        icon: 'success',
        title: 'Thông báo',
        text: 'Đăng xuất thành công!',
    });
}