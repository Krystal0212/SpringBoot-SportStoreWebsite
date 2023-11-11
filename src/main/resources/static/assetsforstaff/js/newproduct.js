import * as database from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
// Get the Firebase database
// Add an event listener to the submit button

const WriteDataToFirebase = function WriteDataToFirebase(pName, pBrand, pType, pPrice, pQuantity){

    const dbRef = database.getDatabase();
    const pRef = database.ref(dbRef, "Product");
    return database.get(pRef)
        .then((snapshot) => {
        if(pType === "Shoes")
        {
                   const pRefShoes = database.ref(pRef, "Shoes");
                   return database.get(pRefShoes)
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

                                     // Tạo dữ liệu người dùng
                                     const newProduct = {
                                       pName: String(pName),
                                       pBrand: String(pBrand),
                                       pPrice: String(pPrice),
                                       pQuantity: String(pQuantity),
                                       state: 'enable',
                                     };
                                     // Ghi dữ liệu người dùng vào cơ sở dữ liệu Firebase với ID mới
                                     database.set(database.ref(dbRef, 'Product/' + 'Shoes/' + newID), newProduct);
                                     return true;
                   })

        }
        })
};
window.addPButton = function addPButton() {
     const pName = document.getElementById('pName').value;
     const pBrand = document.getElementById('pBrand').value;
     const pType = document.getElementById('pType').value;
     const pPrice = document.getElementById('pPrice').value;
     const pQuantity = document.getElementById('pQuantity').value;
     WriteDataToFirebase(pName, pBrand, pType, pPrice, pQuantity)
     };
