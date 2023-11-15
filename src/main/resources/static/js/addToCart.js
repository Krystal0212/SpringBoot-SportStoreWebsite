import { getDatabase, ref, query, orderByChild, equalTo, get, set } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";

window.addToCart = function (itemName, userName, productType) {
    const dbRef = getDatabase();
    const customersRef = ref(dbRef, "Customer");
    const itemsRef = ref(dbRef, "Product/" + productType);

    const userQuery = query(customersRef, orderByChild("username"), equalTo(userName));
    const itemQuery = query(itemsRef, orderByChild("name"), equalTo(itemName));

    let userKey, itemKey;
    let itemPrice, itemBrand, itemURL;

    // Sử dụng Promise.all để chờ cả hai get xong
    //thực hiện get userkey và itemkey
    Promise.all([get(userQuery), get(itemQuery)])
        .then(([userSnapshot, itemSnapshot]) => {
            if (userSnapshot.exists()) {
                userSnapshot.forEach((childSnapshot) => {
                    userKey = childSnapshot.key;
                    const user = childSnapshot.val();
                    console.log(user);
                    console.log(userKey);
                });
            }
            if (itemSnapshot.exists()) {
                itemSnapshot.forEach((childSnapshot) => {
                    itemKey = childSnapshot.key;
                    const item = childSnapshot.val();
                    //lay price cua item duoc click
                    itemPrice = item.price;
                    itemBrand = item.brand;
                    itemURL = item.url;
                    console.log(item);
                    console.log(itemKey);
                });
            }

            //kiem tra xem item đó có trong cart của user này chưa dựa vào 2 cái get key trên
            const userCartRef = ref(dbRef, "CustomerCart/" + userKey + "/" + productType + "/" + itemKey);
            // Sử dụng get để kiểm tra xem node có tồn tại hay không
            get(userCartRef)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        // Node đã tồn tại, hiển thị thông báo
                        Swal.fire({
                            title: 'Item already in cart',
                            text: 'This item is already in your cart. Check your cart to change the quantity.',
                            icon: 'info',
                            confirmButtonText: 'OK'
                        });
                    } else {
                        // Node chưa tồn tại,thêm nó vào giỏ hàng ở đây
                        const addedProduct = {
                            price: itemPrice,
                            brand: itemBrand,
                            name: itemName,
                            url: itemURL,
                            quantity: String(1),
                        }

                        const userCartRef = ref(dbRef, "CustomerCart/" + userKey + "/" + productType + "/" + itemKey);
                        set(userCartRef, addedProduct);
                        // thong bao thanh cong
                        Swal.fire({
                            title: 'Item added to cart',
                            text: 'The item has been added to your cart.',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        });
                    }
                })
                .catch((error) => {
                    console.error("Lỗi khi kiểm tra dữ liệu: ", error);
                });
        })
        .catch((error) => {
            console.error("Lỗi khi lấy dữ liệu: ", error);
        });
};