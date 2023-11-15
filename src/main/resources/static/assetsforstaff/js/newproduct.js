import * as database from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
// Get the Firebase database
// Add an event listener to the submit button



window.ClickAdd = function ClickAdd(){

    const input = document.getElementById('imageInput');


    const pName = document.getElementById('pName').value;
    const pBrand = document.getElementById('pBrand').value;
    const pType = document.getElementById('pType').value;
    const pPrice = document.getElementById('pPrice').value;
    const pQuantity = document.getElementById('pQuantity').value;
    const pDe = document.getElementById('pDe').value;
    const imageUrl = document.getElementById('imageUrl').value;
    const status = "enable";
    if (checkEmptyFields(pName, pBrand, pType, pPrice, pQuantity,pDe,imageUrl)) {
        return;
    }
    WriteDataToFirebase(pName, pBrand, pType, pPrice, pQuantity,pDe,imageUrl,status)
        .then(() => {
            AddSuccessAlert();

        })
};



const WriteDataToFirebase = function WriteDataToFirebase(pName, pBrand, pType, pPrice, pQuantity,pDe,imageUrl,status){

    if(pType === "Shoes")
    {
        const dbRef = database.getDatabase();
        const pRef = database.ref(dbRef, "Product/Shoes");
        return database.get(pRef)
            .then((snapshot) => {
                const pData = snapshot.val();
                const latestID = Object.keys(pData).reduce((maxID, key) => {
                    const match = key.match(/^S(\d+)$/);
                    if (match) {
                        const currentID = parseInt(match[1]);
                        if (currentID > maxID) {
                            maxID = currentID;
                        }
                    }
                    return maxID;
                }, 0);

                // Tạo ID mới
                const newID = `S${(latestID + 1).toString().padStart(2, "0")}`;

                const newP = {
                    name: String(pName),
                    brand: String(pBrand),
                    price: String(pPrice),
                    quantity: String(pQuantity),
                    description: String(pDe),
                    url: String(imageUrl),
                    status: String(status),
                };

                // Ghi dữ liệu người dùng vào cơ sở dữ liệu Firebase với ID mới
                database.set(database.ref(dbRef, 'Product/' + pType + '/' + newID), newP);
                return true;
            })
    }
    if(pType === "Clothes")
    {
        const dbRef = database.getDatabase();
        const pRef = database.ref(dbRef, "Product/Clothes");
        return database.get(pRef)
            .then((snapshot) => {
                const pData = snapshot.val();
                const latestID = Object.keys(pData).reduce((maxID, key) => {
                    const match = key.match(/^C(\d+)$/);
                    if (match) {
                        const currentID = parseInt(match[1]);
                        if (currentID > maxID) {
                            maxID = currentID;
                        }
                    }
                    return maxID;
                }, 0);

                // Tạo ID mới
                const newID = `C${(latestID + 1).toString().padStart(2, "0")}`;

                const newP = {
                    name: String(pName),
                    brand: String(pBrand),
                    price: String(pPrice),
                    quantity: String(pQuantity),
                    description: String(pDe),
                    url: String(imageUrl),
                    status: String(status),
                };

                // Ghi dữ liệu người dùng vào cơ sở dữ liệu Firebase với ID mới
                database.set(database.ref(dbRef, 'Product/' + pType + '/' + newID), newP);
                return true;
            })
    }
    if(pType === "Accessory")
    {
        const dbRef = database.getDatabase();
        const pRef = database.ref(dbRef, "Product/Accessory");
        return database.get(pRef)
            .then((snapshot) => {
                const pData = snapshot.val();
                const latestID = Object.keys(pData).reduce((maxID, key) => {
                    const match = key.match(/^A(\d+)$/);
                    if (match) {
                        const currentID = parseInt(match[1]);
                        if (currentID > maxID) {
                            maxID = currentID;
                        }
                    }
                    return maxID;
                }, 0);

                // Tạo ID mới
                const newID = `A${(latestID + 1).toString().padStart(2, "0")}`;

                const newP = {
                    name: String(pName),
                    brand: String(pBrand),
                    price: String(pPrice),
                    quantity: String(pQuantity),
                    description: String(pDe),
                    url: String(imageUrl),
                    status: String(status),
                };

                // Ghi dữ liệu người dùng vào cơ sở dữ liệu Firebase với ID mới
                database.set(database.ref(dbRef, 'Product/' + pType + '/' + newID), newP);
                return true;
            })
    }
    return true;
};
function isNumeric(input) {
    // Kiểm tra xem chuỗi chỉ chứa chữ số hay không
    return /^\d+$/.test(input);
}
const checkEmptyFields = function checkEmptyFields(pName, pBrand, pType, pPrice, pQuantity,pDe,imageUrl) {
    const emptyFields = [];

    if (!pName) {
        emptyFields.push("Product Name");
    }
    if (!pBrand) {
        emptyFields.push("Product Brand");
    }
    if (!pType) {
        emptyFields.push("Product Type");
    }
    if (!pPrice ) {
        emptyFields.push("Product Price");
    }
    if (!pQuantity) {
        emptyFields.push("Product Quantity");
    }
    if (!pDe) {
        emptyFields.push("Product Description");
    }
    if (!imageUrl) {
        emptyFields.push("Product Img");
    }

    if (emptyFields.length > 0) {
        // Có ít nhất một trường thông tin bị bỏ trống
        const message = `Vui lòng điền đầy đủ thông tin: ${emptyFields.join(", ")}`;
        alert(message);
        return true;
    }
    return false;
};


async function AddSuccessAlert() {
    await Swal.fire({
        icon: 'success',
        title: 'Thông báo',
        text: 'Thêm hàng thành công!',
    });
    location.reload();
}
// async function EditSuccessAlert() {
//     await Swal.fire({
//         icon: 'success',
//         title: 'Thông báo',
//         text: 'Thay đổi thành công!',
//     });
// }
// window.ChangeProduct = function ChangeProduct(){
//     const pNameC = document.getElementById('pNameC').value;
//     const dbRef = database.getDatabase();
//     const pRef = database.ref(dbRef, 'Product/');
//
//     getP(pRef,pNameC).then((result) => {
//         if(result === true)
//         {
//             EditSuccessAlert();
//         }
//     })
//         .catch((error) => {
//             console.error(error.message);
//         });
// }
//
// function getP(ProductRef, pNameC) {
//     return new Promise((resolve, reject) => {
//         database.onValue(ProductRef, (snapshot) => {
//             const pData = snapshot.val();
//             for (const itemtype in pData) {
//                 for (const itemid in pData[itemtype]) {
//                     const item = pData[itemtype][itemid];
//                     console.log(item.name);
//                     if (item.name === pNameC) {
//                         const pBrandC = document.getElementById('pBrandC').value;
//                         const pPriceC = document.getElementById('pNameC').value;
//                         const pQuantityC = document.getElementById('pQuantityC').value;
//                         const pDeC = document.getElementById('pDeC').value;
//                         const pstatusC = document.getElementById('pstatusC').value;
//
//                         if (!pBrandC || !pPriceC || !pQuantityC || !pDeC || !pstatusC || !pNameC) {
//                             Swal.fire({
//                                 icon: 'error',
//                                 title: 'Missing Information',
//                                 text: 'Please fill in all fields before updating.',
//                             });
//                             reject("Please Fill");
//                         }
//
//                         // Tạo đường dẫn của nút cần cập nhật
//                         const productRef = database.ref(`/Product/${itemtype}/${itemid}`);
//
//                         // Cập nhật dữ liệu của nút
//                         productRef.set({
//                             name: String(pNameC),
//                             brand: String(pBrandC),
//                             price: String(pPriceC),
//                             quantity: String(pQuantityC),
//                             description: String(pDeC),
//                             status: String(pstatusC),
//                         });
//
//                         resolve(true);
//                     } else {
//                         reject("Fail");
//                     }
//                 }
//             }
//         });
//     });
// }






window.updateItemByName = function () {
    const pNameC = document.getElementById('pNameC').value;
    const pBrandC = document.getElementById('pBrandC').value;
    const pPriceC = document.getElementById('pPriceC').value;
    const pQuantityC = document.getElementById('pQuantityC').value;
    const pDeC = document.getElementById('pDeC').value;
    const pstatusC = document.getElementById('pstatusC').value;
    if (!pBrandC || !pPriceC || !pQuantityC || !pDeC || !pstatusC || !pNameC) {
        Swal.fire({
            icon: 'error',
            title: 'Missing Information',
            text: 'Please fill in all fields before updating.',
        });
    }
    else{
        const dbRef = database.getDatabase();
        const productRef = database.ref(dbRef, 'Product');
        const newData = ({
            name: String(pNameC),
            brand: String(pBrandC),
            price: String(pPriceC),
            quantity: String(pQuantityC),
            description: String(pDeC),
            status: String(pstatusC),
        });
        // Tìm kiếm itemID dựa trên tên (itemName) trong từng cấp
        const accessoryQuery = database.query(database.ref(productRef, 'Accessory').orderByChild('name').equalTo(pNameC));
        const clothesQuery = database.query(database.ref(productRef, 'Clothes').orderByChild('name').equalTo(pNameC));
        const shoesQuery = database.query(database.ref(productRef, 'Shoes').orderByChild('name').equalTo(pNameC));

        // Lắng nghe sự kiện "value" để tìm kiếm
        onValue(accessoryQuery, (snapshot) => updateItem(snapshot));
        onValue(clothesQuery, (snapshot) => updateItem(snapshot));
        onValue(shoesQuery, (snapshot) => updateItem(snapshot));

        // Hàm cập nhật dữ liệu cho itemID
        function UpdateData(snapshot) {
            if (snapshot.exists()) {
                // Lấy key của itemID
                const itemKey = Object.keys(snapshot.val())[0];

                // Cập nhật dữ liệu cho itemID
                const itemRef = ref(productRef, snapshot.ref.parent.key + '/' + itemKey);
                update(itemRef, newData);

                console.log("Updated data for item with name ${itemName}");
            } else {
                console.log("Item with name ${itemName} not found");
            }
        }
    }

}






