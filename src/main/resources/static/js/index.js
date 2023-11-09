import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import {app} from './firebase-config.js'

const logoutButton = document.getElementById('logOut');
const loginIcon = document.getElementById('loginIcon');
const customerName = document.getElementById('customerName')
const userJSON = localStorage.getItem('user');

const showLoggedInState = (userName) => {
    loginIcon.style.cssText = "display: none !important;";
    logoutButton.style.display = 'block';
    customerName.textContent = `Welcome, ${userName}`;
};

if (userJSON) {
    const userObject = JSON.parse(userJSON);

    if (userObject.isGoogleUser) {
        // Xử lý khi người dùng đăng nhập bằng Firebase Authentication
        // Ví dụ: ẩn hoặc hiển thị các thành phần tương ứng
        const auth = getAuth(app);
        // Kiểm tra xem người dùng đã đăng nhập hay chưa
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // Nếu người dùng đang đăng nhập, user sẽ có giá trị
                // lấy user hiện tại
                showLoggedInState(userObject.userName);
                // Ấn dang xuat
                logoutButton.addEventListener('click', () => {
                    // xu ly user google
                    signOut(auth)
                        .then(() => {
                            // Đăng xuất thành công
                            logOutSuccessAlert();
                        })
                        .catch((error) => {
                            // Xảy ra lỗi khi đăng xuất
                            console.error('Lỗi khi đăng xuất:', error);
                        });
                });
            }
            else{
                // dang xuat state google
                loginIcon.style.cssText = "display: block !important;";
                customerName.style.display = 'none';
                logoutButton.style.display = 'none';
            }
        });

    } else {
        // Xử lý khi người dùng đăng nhập bằng tài khoản thông thường
        // Ví dụ: ẩn hoặc hiển thị các thành phần tương ứng
        showLoggedInState(userObject.userName);
        // Ấn đăng xuất
        logoutButton.addEventListener('click', () => {
            // dang xuat state user thường
            logOutSuccessAlert()
            loginIcon.style.cssText = "display: none !important;";
            customerName.style.display = 'none';
            logoutButton.style.display = 'none';
        });
    }
}


async function logOutSuccessAlert() {
    await Swal.fire({
        icon: 'success',
        title: 'Thành công!',
        text: 'Đăng xuất thành công!',
    });
    localStorage.removeItem("user");
    window.location.href = "/home";
}

