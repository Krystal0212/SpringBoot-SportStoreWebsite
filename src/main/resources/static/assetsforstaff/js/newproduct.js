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
    const pSize = document.getElementById('pSize').value;
    const pColor = document.getElementById('pColor').value;
    const imageUrl = document.getElementById('imageUrl').value;
    const status = "enable";
    if (checkEmptyFields(pName, pBrand, pType, pPrice, pQuantity,pDe, pSize, pColor,imageUrl)) {
        return;
    }
    WriteDataToFirebase(pName, pBrand, pType, pPrice, pQuantity,pDe, pSize, pColor,imageUrl,status)
        .then(() => {
            AddSuccessAlert();
        })
};



const WriteDataToFirebase = function WriteDataToFirebase(pName, pBrand, pType, pPrice, pQuantity,pDe, pSize, pColor,imageUrl,status){

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
                    size:String(pSize),
                    color:String(pColor),
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
                    size:String(pSize),
                    color:String(pColor),
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
                    size:String(pSize),
                    color:String(pColor),
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
const checkEmptyFields = function checkEmptyFields(pName, pBrand, pType, pPrice, pQuantity,pDe, pSize, pColor,imageUrl) {
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
    if (!pSize) {
        emptyFields.push("Product Size");
    }
    if (!pColor) {
        emptyFields.push("Product Color");
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
