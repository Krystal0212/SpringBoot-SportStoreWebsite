import { getDatabase, ref, onValue, get, update } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";


let orderListVisible = false;

function displayOrders() {
    // Lấy userID từ local storage hoặc nơi bạn lưu trữ thông tin người dùng
    const userID = localStorage.getItem("userID");

    // Khởi tạo Firebase
    const dbRef = getDatabase();
    const ordersRef = ref(dbRef, 'Orders');

    // Lắng nghe sự kiện "value" để đồng bộ dữ liệu khi có thay đổi
    onValue(ordersRef, (snapshot) => {
        // Làm sạch danh sách đơn đặt hàng trước khi cập nhật
        const ordersContainer = document.getElementById('orderList');
        ordersContainer.innerHTML = '';

        // Lặp qua các đơn đặt hàng và hiển thị trên trang
        snapshot.forEach((orderSnapshot) => {
            const orderData = orderSnapshot.val();

            // Kiểm tra xem đơn hàng có thuộc về userID không
                const orderElement = createOrderElement(orderSnapshot.key, orderData);
                ordersContainer.appendChild(orderElement);
        });
    });

    // Hàm tạo phần tử đơn đặt hàng từ dữ liệu
    function createOrderElement(orderID, orderData) {
        const orderElement = document.createElement('div');
        orderElement.style.cssText = "width: 50vw !important;"
        orderElement.classList.add('order');

        // Thêm thông tin đơn đặt hàng vào phần tử
        orderElement.innerHTML = `
        <h3 class="order-id">Order ID: ${orderID}</h3>
        <p class="order-address" >Your address: ${orderData.address}</p>
        <p class="order-ship">Shipping opinion: ${orderData.shipmentMethod}</p>
        <p class="order-state ${orderData.state.toLowerCase()}">State: ${orderData.state}</p>
        <p class="order-CustomerId">customerID: ${orderData.customerID}</p>
        <p class="order-total">Price: ${orderData.totalAmount} $</p>
        <p class="order-purchase">Date: ${orderData.purchaseDate}</p>
        <div class="order-items">
            <h4>Items:</h4>
            <ul>
                ${createItemsList(orderData.items)}
            </ul>
        </div>
        <!-- Thêm các trường thông tin khác tùy ý -->
    `;
        orderElement.addEventListener('click', () => {
            // Thực hiện chuyển đổi trạng thái và cập nhật lên Firebase
            toggleOrderState(orderID, orderData.state);

        });
        return orderElement;
    }

    function toggleOrderState(orderID, currentState) {
        const newState = currentState === 'pending' ? 'shipping' : 'pending';

        // Cập nhật trạng thái mới lên Firebase
        const dbRef = getDatabase();
        const ordersRef = ref(dbRef, 'Orders/' + orderID);
        update(ordersRef, { state: newState });

    }



// Hàm tạo danh sách các item từ dữ liệu
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

// Hàm trả về promise lấy địa chỉ từ nhánh Customer
function getAddressFromCustomer(customerRef) {
    return new Promise((resolve, reject) => {
        onValue(customerRef, (snapshot) => {
            const customerData = snapshot.val();
            if (customerData) {
                // Trả về địa chỉ từ nhánh Customer
                resolve([customerData.address, customerData.phone_number]);
            } else {
                reject("Customer data not found");
            }
        });
    });
}

// Hàm cập nhật thông tin người dùng
window.updateProfile = function () {
    const fullName = document.getElementById("fullName2").value;
    const email = document.getElementById("eMail2").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("Street").value;

    // Lấy userID từ local storage hoặc nơi bạn lưu trữ thông tin người dùng
    const userID = localStorage.getItem("userID");

    // Kiểm tra xem có dữ liệu cần cập nhật hay không
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

