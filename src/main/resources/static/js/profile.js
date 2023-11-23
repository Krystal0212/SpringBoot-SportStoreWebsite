import { getDatabase, ref, onValue, get, update, remove } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";


let orderListVisible = false;

function displayOrders() {
    const userID = localStorage.getItem("userID");
    const dbRef = getDatabase();
    const ordersRef = ref(dbRef, 'Orders');

    onValue(ordersRef, (snapshot) => {
        const ordersContainer = document.getElementById('orderList');
        ordersContainer.innerHTML = '';

        snapshot.forEach((orderSnapshot) => {
            const orderData = orderSnapshot.val();

            if (orderData.customerID === userID) {
                const orderElement = createOrderElement(orderSnapshot.key, orderData);
                ordersContainer.appendChild(orderElement);
            }
        });
    });

    function createOrderElement(orderID, orderData) {
        const orderElement = document.createElement('div');
        orderElement.style.cssText = "width: 70vw !important;"
        orderElement.classList.add('order');

        const isPending = orderData.state === "pending";


        orderElement.innerHTML = `
        <h3 class="order-id">Order ID: ${orderID}</h3>
        <p class="order-address">Your address: ${orderData.address}</p>
        <p class="order-ship">Shipping opinion: ${orderData.shipmentMethod}</p>
        <p class="order-state ${orderData.state.toLowerCase()}">State: ${orderData.state}</p>
        <p class="order-total">Price: ${orderData.totalAmount} $</p>
        <p class="order-purchase">Date: ${orderData.purchaseDate}</p>
        <div class="order-items">
            <h4>Items:</h4>
            <ul>
                ${createItemsList(orderData.items)}
            </ul>
        </div>
        ${isPending ? `<button class="btn btn-order" id="cancelBtn_${orderID}"> Cancel </button>` : ''}
    `;
        const cancelBtn = orderElement.querySelector(`#cancelBtn_${orderID}`);
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => showCancelConfirmation(orderID));
        }

        return orderElement;
    }

    function cancelOrder(orderID) {
        return new Promise((resolve, reject) => {
            const dbRef = getDatabase();
            const ordersRef = ref(dbRef, 'Orders' + '/' + orderID);
            remove(ordersRef)
                .then(() => {
                    displayOrders();
                    resolve(); // Kết thúc thành công
                })
                .catch((error) => {
                    console.error('Error', error);
                    reject(error); // Kết thúc với lỗi
                })
        });
    }

    function showCancelConfirmation(orderID) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to cancel this order?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, cancel it!'
        }).then((result) => {
            if (result.isConfirmed) {
                cancelOrder(orderID);
            }
        });
    }

    function createItemsList(items) {
        let itemsListHTML = '';
        for (const itemID in items) {
            const item = items[itemID];
            itemsListHTML += `
             <div class="order-item">
                <img class="item-image" src="${item.url}" alt="Product Image">
                <div class="item-details">
                    <span class="item-name">${item.name}</span><br>
                    <span class="item-price">Price: ${item.price} $</span><br>
                    <span class="item-quantity">Quantity: ${item.quantity}</span>
                </div>
            </div>
        `;
        }
        return itemsListHTML;
    }
}



// Gọi hàm khi trang web tải xong
window.onload = function () {
    displayOrders();
};



window.toggleOrderList = function () {
    const orderList = document.getElementById('orderList');
    const orderListHello = document.getElementById('infoText2');
    const toggleOrderListBtn = document.getElementById('toggleOrderListBtn');

    if (orderListVisible) {
        // Ẩn danh sách đơn hàng và đổi tên nút
        orderList.style.display = 'none';
        orderListHello.style.display = 'none';
        toggleOrderListBtn.textContent = 'View Order';
    } else {
        // Hiển thị danh sách đơn hàng và đổi tên nút
        orderList.style.display = 'block';
        orderListHello.style.display = 'block';
        toggleOrderListBtn.textContent = 'Close';
    }

    // Đảo ngược trạng thái hiển thị
    orderListVisible = !orderListVisible;
}

window.showUserProfile = function () {
    const userData = JSON.parse(localStorage.getItem("user"));
    const userID = localStorage.getItem("userID")

    // Kiểm tra xem userData có tồn tại và có giá trị gender không
    if (userData) {

        // Duyệt qua nhánh Customer để tìm địa chỉ của userID
        const dbRef = getDatabase();
        const customerRef = ref(dbRef, 'Customer/' + userID);

        // Lấy địa chỉ từ nhánh Customer
        getAddressFromCustomer(customerRef)
            .then((result) => {
                const [address, phone_number] = result;
                // Cập nhật giá trị vào các phần tử HTML
                document.getElementById("fullName").innerText = userData.name || "";
                document.getElementById("eMail").innerText = userData.email || "";
                document.getElementById("fullName2").value = userData.name || "";
                document.getElementById("eMail2").value = userData.email || "";
                document.getElementById("phone").value = phone_number || "";
                document.getElementById("Street").value = address || "";
            })
            .catch((error) => {
                console.error("Error fetching address:", error);
            });
    }
}

function getAddressFromCustomer(customerRef) {
    return new Promise((resolve, reject) => {
        onValue(customerRef, (snapshot) => {
            const customerData = snapshot.val();
            if (customerData) {
                resolve([customerData.address, customerData.phone_number]);
            } else {
                reject("Customer data not found");
            }
        });
    });
}

window.updateProfile = function () {
    const fullName = document.getElementById("fullName2").value;
    const email = document.getElementById("eMail2").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("Street").value;

    const userID = localStorage.getItem("userID");

    if (!userID || !fullName || !email || !phone || !address) {
        Swal.fire({
            icon: 'error',
            title: 'Missing Information',
            text: 'Please fill in all fields before updating.',
        });
        return;
    }

    // Kiểm tra định dạng số điện thoại
    if (phone.length < 10) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Phone Number',
            text: 'Please enter a valid phone number with at least 10 digits.',
        });
        return;
    }

    // Kiểm tra định dạng email
    if (!isValidEmail(email)) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Email Address',
            text: 'Please enter a valid email address.',
        });
        return;
    }

    // Hiển thị thông báo xác nhận
    Swal.fire({
        title: 'Confirm Update',
        text: 'Are you sure you want to update your profile?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'Cancel',
    }).then((result) => {
        // Nếu người dùng nhấp vào nút "OK"
        if (result.isConfirmed) {
            // Khởi tạo Firebase
            const dbRef = getDatabase();

            // Cập nhật thông tin người dùng trong nhánh Customer
            const customerRef = ref(dbRef, 'Customer/' + userID);
            update(customerRef, {
                name: fullName,
                email: email,
                phone_number: phone,
                address: address
            })
                .then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Profile Updated',
                        text: 'Your profile has been successfully updated.',
                    });
                    console.log("User profile updated successfully");
                })
                .catch((error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'An error occurred while updating your profile. Please try again.',
                    });
                    console.error("Error updating user profile:", error);
                });
        }
    });
}

// Hàm kiểm tra định dạng email
function isValidEmail(email) {
    // Sử dụng regex để kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}