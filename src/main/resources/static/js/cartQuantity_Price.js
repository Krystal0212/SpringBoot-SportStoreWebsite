import { getDatabase, ref, query, orderByChild, equalTo, get, update } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";

window.updateFirebaseQuantity = function (itemName, newQuantity, itemPrice) {
    return new Promise((resolve, reject) => {
        // Lấy userID từ local storage hoặc từ nơi bạn lưu trữ thông tin user
        const userID = localStorage.getItem("userID");

        // Khởi tạo đối tượng Firebase Realtime Database
        const db = getDatabase();

        // Tạo đường dẫn đến giỏ hàng của khách hàng trong Firebase
        const customerCartRef = ref(db, 'CustomerCart/' + userID);

        // Đọc dữ liệu từ Firebase
        get(customerCartRef).then((snapshot) => {
            if (snapshot.exists()) {
                // Nếu giỏ hàng tồn tại
                const customerCart = snapshot.val();

                // Duyệt qua từng loại item trong giỏ hàng
                for (const itemType in customerCart) {
                    const itemTypeRef = ref(db, 'CustomerCart/' + userID + '/' + itemType);

                    // Duyệt qua từng item trong loại item đó
                    for (const itemID in customerCart[itemType]) {
                        const item = customerCart[itemType][itemID];

                        // Kiểm tra xem item có trùng với itemName không
                        if (item.name === itemName) {
                            // Cập nhật số lượng và giá trị mới
                            item.quantity = newQuantity;
                            item.price = itemPrice * newQuantity;

                            // Tạo đường dẫn đến item cần cập nhật trong Firebase
                            const itemRef = ref(db, 'CustomerCart/' + userID + '/' + itemType + '/' + itemID);

                            // Cập nhật dữ liệu mới vào Firebase
                            update(itemRef, {
                                quantity: String(item.quantity),
                                price: String(item.price)
                            }).then(() => {
                                console.log('Quantity and price updated on Firebase successfully!');
                                resolve(); // Đánh dấu Promise thành công
                            }).catch((error) => {
                                console.error('Error updating quantity and price on Firebase:', error);
                                reject(error); // Đánh dấu Promise thất bại
                            });

                            // Sau khi cập nhật xong, bạn có thể thoát khỏi vòng lặp
                            break;
                        }
                    }
                }
            } else {
                console.log('Customer cart does not exist in Firebase.');
                resolve(); // Đánh dấu Promise thành công khi giỏ hàng không tồn tại
            }
        }).catch((error) => {
            console.error('Error reading customer cart from Firebase:', error);
            reject(error); // Đánh dấu Promise thất bại nếu có lỗi đọc dữ liệu từ Firebase
        });
    });
}

window.checkFirebaseCode = function (discountCode, currentTotalAmount  ,initialTotalAmount) {
    // Lấy reference đến node chứa thông tin mã giảm giá trong Firebase
    const db = getDatabase();
    const discountCodeRef = ref(db, 'Giftcode');

    // Đọc dữ liệu từ Firebase
    get(discountCodeRef).then((snapshot) => {
        if (snapshot.exists()) {
            // Nếu dữ liệu tồn tại
            const giftCodes = snapshot.val();

            // Kiểm tra xem mã giảm giá có tồn tại trong danh sách không
            if (giftCodes.hasOwnProperty(discountCode)) {
                // Áp dụng giảm giá
                applyDiscount(giftCodes[discountCode], currentTotalAmount  ,initialTotalAmount);
            } else {
                // Nếu không có mã giảm giá, đảm bảo rằng giá trị giảm giá được đặt lại
                applyDiscount(0, currentTotalAmount  ,initialTotalAmount);
            }
        } else {
            console.log('Giftcode data does not exist in Firebase.');
            applyDiscount(0);
        }
    }).catch((error) => {
        console.error('Error checking gift code from Firebase:', error);
    });
}

// Hàm áp dụng giảm giá
function applyDiscount(discountPercentage, currentTotalAmount  ,initialTotalAmount) {
    var shippingOption = parseFloat(document.getElementById("shippingOption").value);
    if(shippingOption === 5){
        currentTotalAmount = initialTotalAmount * (1 - discountPercentage / 100);
    } else {
        initialTotalAmount = initialTotalAmount - 5 + shippingOption;
        currentTotalAmount = initialTotalAmount * (1 - discountPercentage / 100);
    }
    // Tính toán giá trị mới sau khi áp dụng giảm giá

    var discountPercentageInfo = document.getElementById("discountPercentageInfo");
    discountPercentageInfo.innerHTML = 'Discount Percentage: <span class="red-text">' + discountPercentage + '%</span>';


    // Hiển thị số lượng giảm giá trên trang
    var discountInfo = document.getElementById("discountInfo");

    if (discountPercentage > 0) {
        // Nếu có giảm giá, hiển thị thông tin giảm giá
        discountInfo.innerHTML = 'Discount: <span class="red-text">€ ' + (initialTotalAmount - currentTotalAmount).toFixed(2) + '</span>';
    } else {
        // Nếu không có giảm giá, ẩn thông tin giảm giá
        discountInfo.textContent = '';
    }

    // Cập nhật giá trị totalAmount trên trang
    document.getElementById("totalAmount").textContent = '€ ' + currentTotalAmount.toFixed(2);

    // Cập nhật giá trị totalAmount trong code của bạn (ví dụ: Firebase)
    // Thực hiện các bước cập nhật dữ liệu trên server nếu cần
}