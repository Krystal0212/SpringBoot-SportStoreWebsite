import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import {app} from './firebase-config.js'

const logoutButton = document.getElementById('logOut');

const auth = getAuth(app);
// Kiểm tra xem người dùng đã đăng nhập hay chưa
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Nếu người dùng đang đăng nhập, user sẽ có giá trị
        // lấy user hiện tại
        const loginIcon = document.getElementById('loginIcon');
        // Ẩn nút đăng nhập bằng cách đặt thuộc tính style.display thành 'none'
        loginIcon.style.display = 'none';
        // Hiện nút đăng xuất nếu log in thành công
        logoutButton.style.display = 'block';
        const userJSON = localStorage.getItem('user');
        // Xuat thong bao neu log in thanh cong
        if (userJSON) {
            const userObject = JSON.parse(userJSON);

            document.getElementById('customerName').textContent = `Welcome, ${userObject.userName}`;
        }
    }
    else{
        const customerName = document.getElementById('customerName')
        customerName.style.display = 'none';

        logoutButton.style.display = 'none';
    }
});

logoutButton.addEventListener('click', () => {
    // xu ly user google
    if(auth){
        signOut(auth)
            .then(() => {
                // Đăng xuất thành công
                logOutSuccessAlert();
            })
            .catch((error) => {
                // Xảy ra lỗi khi đăng xuất
                console.error('Lỗi khi đăng xuất:', error);
            });
    }
    else{
        // xu ly cho user khong phai google
    }
});

async function logOutSuccessAlert() {
    await Swal.fire({
        icon: 'success',
        title: 'Thành công!',
        text: 'Đăng xuất thành công!',
    });
    window.location.href = "/home";
}