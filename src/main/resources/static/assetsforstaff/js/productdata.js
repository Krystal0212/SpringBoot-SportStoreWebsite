import { getDatabase, ref, query, orderByChild, equalTo, update, onValue } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js';


window.updateItemByName = function (pNameF) {
    const pNameC = document.getElementById('pNameC').value;
    const pBrandC = document.getElementById('pBrandC').value;
    const pPriceC = document.getElementById('pPriceC').value;
    const pQuantityC = document.getElementById('pQuantityC').value;
    const pDeC = document.getElementById('pDeC').value;
    const pstatusC = document.getElementById('pstatusC').value;
    const newData = ({
        name: String(pNameC),
        brand: String(pBrandC),
        price: String(pPriceC),
        quantity: String(pQuantityC),
        description: String(pDeC),
        status: String(pstatusC),
    });
    console.log("pNameF:", pNameF);
    console.log("newData:", newData);
    if (!pBrandC || !pPriceC || !pQuantityC || !pDeC || !pstatusC || !pNameC) {
        Swal.fire({
            icon: 'error',
            title: 'Missing Information',
            text: 'Please fill in all fields before updating.',
        });
    }
    else
    {
        updateItemByName(pNameF, newData);
    }
}

// Hàm tìm và cập nhật dữ liệu cho item có name là itemName
function updateItemByName(pNameF, newData) {
    const dbRef = getDatabase();
    const productRef1 = ref(dbRef, 'Product/Accessory');
    const productRef2 = ref(dbRef, 'Product/Clothes');
    const productRef3 = ref(dbRef, 'Product/Shoes');
    const productRefMain = ref(dbRef, 'Product');

    // Tìm kiếm itemID dựa trên tên (itemName) trong từng cấp
    const accessoryQuery = query(productRef1, orderByChild('name'),equalTo(pNameF));
    const clothesQuery = query(productRef2, orderByChild('name'),equalTo(pNameF));
    const shoesQuery = query(productRef3, orderByChild('name'),equalTo(pNameF));

    // Lắng nghe sự kiện "value" để tìm kiếm
    onValue(accessoryQuery, (snapshot) => updateItem(snapshot));
    onValue(clothesQuery, (snapshot) => updateItem(snapshot));
    onValue(shoesQuery, (snapshot) => updateItem(snapshot));

    // Hàm cập nhật dữ liệu cho itemID
    function updateItem(snapshot) {
        if (snapshot.exists()) {
            // Lấy key của itemID
            const itemKey = Object.keys(snapshot.val())[0];
            const itemTypeKey = snapshot.key;

            // Cập nhật dữ liệu cho itemID
            const itemRef = ref(dbRef, 'Product/' + itemTypeKey+ '/' + itemKey);

            update(itemRef, newData);

            console.log("Updated data for item ");
            location.reload();
        } else {
            console.log("Item with name not found");
        }
    }
}







