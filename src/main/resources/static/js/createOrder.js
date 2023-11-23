import { getDatabase, ref, query, remove, push, get, update } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";

// Kiểm tra xem địa chỉ đã tồn tại trong hồ sơ của người dùng hay chưa
window.checkAddressAndProceed = function () {
    const userID = localStorage.getItem("userID");
    const db = getDatabase();
    const customerRef = ref(db, 'Customer/' + userID);

    // Sử dụng promise để đảm bảo đồng bộ
    return new Promise((resolve, reject) => {
        get(customerRef).then((snapshot) => {
            if (snapshot.exists()) {
                const customerData = snapshot.val();
                if (!customerData.hasOwnProperty('address')) {
                    // Nếu chưa có địa chỉ, hiển thị giao diện nhập địa chỉ
                    showAddressInput().then(() => {
                        // Nếu đã có địa chỉ, tiếp tục quy trình mua hàng
                        resolve();
                    }).catch((error) => {
                        reject(error);
                    });
                } else {
                    // Nếu đã có địa chỉ, tiếp tục quy trình mua hàng
                    resolve();
                }
            } else {
                reject('Customer data does not exist.');
            }
        }).catch((error) => {
            reject(error);
        });
    });
}

// Hiển thị giao diện nhập địa chỉ
function showAddressInput() {
    // Hiển thị mô-đun nhập địa chỉ hoặc giao diện nhập địa chỉ
    // Cung cấp các trường để người dùng nhập địa chỉ
    // Sử dụng promise để đảm bảo đồng bộ
    return new Promise((resolve, reject) => {
        // Sử dụng SweetAlert2 để hiển thị popup nhập địa chỉ
        Swal.fire({
            title: 'Enter your address',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Save',
            cancelButtonText: 'Cancel',
            showLoaderOnConfirm: true,
            preConfirm: (address) => {
                // Lưu địa chỉ vào hồ sơ của người dùng sau khi nhập xong
                const userID = localStorage.getItem("userID");
                const db = getDatabase();
                const customerRef = ref(db, 'Customer/' + userID);

                update(customerRef, {
                    address: address
                }).then(() => {
                    console.log('Address updated in Firebase successfully!');
                    resolve(); // Đóng popup
                }).catch((error) => {
                    console.error('Error updating address in Firebase:', error);
                    reject(error);
                });
            },
            allowOutsideClick: () => !Swal.isLoading()
        });
    });
}

// Tạo Order và sao chép thông tin từ giỏ hàng
function createOrder() {
    return new Promise((resolve, reject) => {
        const userID = localStorage.getItem("userID");
        const db = getDatabase();
        const customerCartRef = ref(db, 'CustomerCart/' + userID);

        // Đọc dữ liệu từ Firebase
        get(customerCartRef).then((snapshot) => {
            if (snapshot.exists()) {
                // Nếu giỏ hàng tồn tại
                const customerCart = snapshot.val();

                // Lấy giá trị totalAmount từ trang HTML
                const totalAmount = parseFloat(document.getElementById("totalAmount").textContent.replace('€', '').trim());
                var selectElement = document.getElementById("shippingOption");
                var selectedOption = selectElement.options[selectElement.selectedIndex];

                var shipmentMethod = selectedOption.text;

                // Kiểm tra và lấy địa chỉ từ nhánh Customer
                getAddressForUserID(userID).then((address) => {
                    // Tạo mới một đơn hàng
                    const order = {
                        customerID: userID,
                        address: address, // Sử dụng địa chỉ từ nhánh Customer
                        state: "pending", // Mặc định là chưa duyệt
                        totalAmount: totalAmount,
                        shipmentMethod: shipmentMethod,
                        paymentMethod: "by Cash",
                        purchaseDate: new Date().toLocaleString(),
                        items: {} // Danh sách sản phẩm trong đơn hàng
                    };

                    // Duyệt qua giỏ hàng để thêm sản phẩm vào đơn hàng
                    for (const itemType in customerCart) {
                        for (const itemID in customerCart[itemType]) {
                            const item = customerCart[itemType][itemID];

                            // Thêm sản phẩm vào đơn hàng
                            order.items[itemID] = {
                                brand: item.brand,
                                name: item.name,
                                price: item.price,
                                quantity: item.quantity,
                                url: item.url
                            };
                        }
                    }

                    // Lưu đơn hàng vào Firebase
                    saveOrderToFirebase(order).then(() => {
                        resolve();
                    }).catch((error) => {
                        reject(error);
                    });
                }).catch((error) => {
                    reject(error);
                });
            } else {
                console.log('Customer cart does not exist in Firebase.');
                reject('Customer cart does not exist in Firebase.');
            }
        }).catch((error) => {
            console.error('Error reading customer cart from Firebase:', error);
            reject(error);
        });
    });
}

function saveOrderToFirebase(order) {
    return new Promise((resolve, reject) => {
        // Lưu đơn hàng vào nhánh Orders của Firebase
        const db = getDatabase();
        const ordersRef = ref(db, 'Orders');

        push(ordersRef, order).then(() => {
            console.log('Order created successfully!');
            // Sau khi tạo đơn hàng, bạn có thể xóa giỏ hàng nếu cần
            clearCustomerCart().then(() => {
                resolve();
            }).catch((error) => {
                reject(error);
            });
        }).catch((error) => {
            console.error('Error creating order:', error);
            reject(error);
        });
    });
}

function clearCustomerCart() {
    return new Promise((resolve, reject) => {
        // Xóa giỏ hàng của khách hàng sau khi đã tạo đơn hàng
        const userID = localStorage.getItem("userID");
        const db = getDatabase();
        const customerCartRef = ref(db, 'CustomerCart/' + userID);

        remove(customerCartRef).then(() => {
            console.log('Customer cart cleared successfully!');
            resolve();
        }).catch((error) => {
            console.error('Error clearing customer cart:', error);
            reject(error);
        });
    });
}

function getAddressForUserID(userID) {
    return new Promise((resolve, reject) => {
        const db = getDatabase();
        const customerRef = ref(db, 'Customer/' + userID);

        get(customerRef).then((snapshot) => {
            if (snapshot.exists()) {
                const customerData = snapshot.val();
                if (customerData.hasOwnProperty('address')) {
                    resolve(customerData.address);
                } else {
                    reject('Address not found for the specified userID.');
                }
            } else {
                reject('Customer data does not exist.');
            }
        }).catch((error) => {
            reject(error);
        });
    });
}

// Bắt đầu quy trình mua hàng
window.startShoppingProcess = function () {
    checkAddressAndProceed().then(() => {
        // Đã kiểm tra địa chỉ và tiếp tục quy trình
        createOrder().then(() => {
            // Đã tạo Order và sao chép thông tin từ giỏ hàng
            // Xóa giỏ hàng của người dùng cũng xong
            Swal.fire({
                title: 'Thanks you for choosing us',
                text: 'Check your profile to see your orders',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Người dùng nhấp vào nút OK
                    location.reload();
                }
            });
        }).catch((error) => {
            console.error('Error creating order and copying cart:', error);
        });
    }).catch((error) => {
        console.error('Error checking address and proceeding:', error);
    });
}
