import * as database from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
// Get the Firebase database
// Add an event listener to the submit button

const WriteDataToFirebase = function WriteDataToFirebase(username, password, email, fullName, gender, phoneNumber){

    const dbRef = database.getDatabase();
    const pRef = database.ref(dbRef, "Product");

    return database.get(pRef)
        .then((snapshot) => {
          // snapshot.val() chứa tất cả dữ liệu hiện có
          const pData = snapshot.val();

          // Tìm người dùng mới có ID theo mẫu
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

          // Tạo dữ liệu người dùng
          const newUser = {
            pName: String(pName),
            pBrand: String(pBrand),
            pPrice: String(pPrice),
            pQuantity: String(pQuantity),
            state: 'enable',
            // Các thông tin khác của người dùng
          };

          // Ghi dữ liệu người dùng vào cơ sở dữ liệu Firebase với ID mới
          if(pType === "Shoes")
          {
          database.set(database.ref(dbRef, 'Product/' + 'Shoes/' + newID), newProduct);
          }
          if(pType === "Shirt")
                    {
                    database.set(database.ref(dbRef, 'Product/' + 'Shirt/' + newID), newProduct);
                    }

          return true;
        })
};
window.addPButton = function addPButton() {
     const pName = document.getElementById('pName').value;
     const pBrand = document.getElementById('pBrand').value;
     const pType = document.getElementById('pType').value;
     const pPrice = document.getElementById('pPrice').value;
     const pQuantity = document.getElementById('pQuantity').value;
     };
