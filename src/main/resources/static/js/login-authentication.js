import * as database from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { app } from './firebase-config.js'

const auth = getAuth(app);
auth.languageCode = 'it';

const googleLoginButton = document.getElementById('google-login');
googleLoginButton.addEventListener('click', () => {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;

            const dbRef = database.getDatabase();
            const customersRef = database.ref(dbRef, 'Customer');

            // Tạo dữ liệu người dùng
            const newUser = {
                username: user.displayName,
                password: '',
                email: user.email,
                phone_number: '',
                name: '',
                gender: '',
                state: 'enable',
            };

            // Kiểm tra xem email đã tồn tại trong danh sách người dùng chưa
            database.get(customersRef)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        let userExists = false;
                        snapshot.forEach((childSnapshot) => {
                            const userData = childSnapshot.val();
                            if (userData.email === user.email) {
                                userExists = true;
                                // Có người dùng tồn tại với cùng email, bạn có thể thực hiện cập nhật dữ liệu ở đây
                                // Ví dụ: database.update(...)
                                database.set(database.ref(dbRef, 'Customer/' + childSnapshot.key), newUser);
                                redirectToIndexPageForGoogle(childSnapshot.val(), childSnapshot.key);
                            }
                        });

                        if (!userExists) {
                            // Nếu không có người dùng tồn tại với email này, tạo người dùng mới
                            //kiem tra ID lon nhat hien tai
                            database.get(customersRef)
                                .then((snapshot) => {
                                    // snapshot.val() chứa tất cả dữ liệu hiện có
                                    const userData = snapshot.val();

                                    // Tìm người dùng mới có ID theo mẫu
                                    const latestID = Object.keys(userData).reduce((maxID, key) => {
                                        const match = key.match(/^CS(\d+)$/);
                                        if (match) {
                                            const currentID = parseInt(match[1]);
                                            if (currentID > maxID) {
                                                maxID = currentID;
                                            }
                                        }
                                        return maxID;
                                    }, 0);

                                    // Tạo ID mới
                                    const newID = `CS${(latestID + 1).toString().padStart(2, "0")}`;

                                    // Ghi dữ liệu người dùng vào cơ sở dữ liệu Firebase với ID mới
                                    database.set(database.ref(dbRef, 'Customer/' + newID), newUser);
                                    redirectToIndexPageForGoogle(newUser, newID);


                                })
                                .catch((error) => {
                                    console.error("Error code:", error.code);
                                    console.error("Error message:", error.message);
                                });
                        }
                    }
                })
                .catch((error) => {
                    console.error("Error code:", error.code);
                    console.error("Error message:", error.message);
                });
        })
        .catch((error) => {
            console.error("Lỗi khi đăng nhập bằng Google:", error);
        });

});
// Function to find the customer with matching username and password
//const findMatchingCustomer = (snapshot, username, password) => {
//    for (const snap in snapshot.val()) {
//        const customerData = snapshot.val()[snap];
//        if (customerData.username === username && customerData.password === password) {
//            console.log("Authentication successful!");
//            redirectToIndexPageForUser(customerData,snap);
//            return;
//        }
//    }
//    console.log("Invalid username or password");
//};

const redirectToIndexPageForGoogle = (customerData,customerId) => {
    // Create a User object with the user's data
    const user = {
        userId: customerId,
        //Tại vì có cả user google dùng
        userName: customerData.username,
        userPassword: customerData.password,
        email: customerData.email,
        gender: customerData.gender,
        phoneNumber: customerData.phone_number,
        fullName: customerData.name,
        state: customerData.state,
        isGoogleUser: true,
    };

    // Convert user data to a JSON string
    const userJSON = JSON.stringify(user);

    // Store the user data in localStorage for use in the protected index page
    localStorage.setItem("user", userJSON);

    // Redirect to the protected index page
    loginSuccessAlert();

};

const redirectToIndexPageForUser = (customerData,customerId) => {
    // Create a User object with the user's data
    const user = {
        userId: customerId,
        //Tại vì có cả user google dùng
        userName: customerData.name,
        userPassword: customerData.password,
        email: customerData.email,
        gender: customerData.gender,
        phoneNumber: customerData.phone_number,
        fullName: customerData.name,
        state: customerData.state,
        isGoogleUser: false,
    };

    // Convert user data to a JSON string
    const userJSON = JSON.stringify(user);

    // Store the user data in localStorage for use in the protected index page
    localStorage.setItem("user", userJSON);

    // Redirect to the protected index page
    loginSuccessAlert();

};

async function loginSuccessAlert() {
    await Swal.fire({
        icon: 'success',
        title: 'Thành công!',
        text: 'Đăng nhập thành công!',
    });

    const formData = new FormData();

    const userJSON = localStorage.getItem('user');
    const userObject = JSON.parse(userJSON);

    formData.append('userName', userObject.userName);
    formData.append('email', userObject.email);
    formData.append('isGoogleUser', userObject.isGoogleUser);

    window.location.href = "/home"; // Update the URL as needed
}
//
//window.checkCredentials = function() {
//    console.log("checkCredentials function called");
//    const username = document.getElementById('username').value;
//    const password = document.getElementById('password').value;
//
//    const dbRef = database.getDatabase();
//    const customersRef = database.ref(dbRef, "Customer");
//
//    database.get(customersRef)
//        .then((snapshot) => {
//            if (snapshot.exists()) {
//                findMatchingCustomer(snapshot, username, password);
//            } else {
//                console.log("No data available in the 'Customer' node");
//            }
//        })
//        .catch((error) => {
//            console.error("Error code:", error.code);
//            console.error("Error message:", error.message);
//        });
//};