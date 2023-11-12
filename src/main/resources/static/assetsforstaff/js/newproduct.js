import * as database from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
// Get the Firebase database
// Add an event listener to the submit button

     const pName = document.getElementById('pName').value;
     const pBrand = document.getElementById('pBrand').value;
     const pType = document.getElementById('pType').value;
     const pPrice = document.getElementById('pPrice').value;
     const pQuantity = document.getElementById('pQuantity').value;
     const bnt = document.getElementById('addPButton').value;


    Function add1(){
    const pName = document.getElementById('pName').value;
         const pBrand = document.getElementById('pBrand').value;
         const pType = document.getElementById('pType').value;
         const pPrice = document.getElementById('pPrice').value;
         const pQuantity = document.getElementById('pQuantity').value;
         const bnt = document.getElementById('addPButton').value;
        WriteDataToFirebase(pName, pBrand, pType, pPrice, pQuantity)
        .then(() => {alert("Thêm sản phẩm thành công!");
        window.location.href = "/staff-main";
        })
    }
    bnt.addEventListener('click',add1);

    const WriteDataToFirebase = function WriteDataToFirebase(pName, pBrand, pType, pPrice, pQuantity){

        const dbRef = database.getDatabase();
        const pRef = database.ref(dbRef, "Product");

        return database.get(pRef)
            .then((snapshot) => {
              const pData = snapshot.val();

              const latestID = Object.keys(pData).reduce((maxID, key) => {
                const match = key.match(/^PD(\d+)$/);
                if (match) {
                  const currentID = parseInt(match[1]);
                  if (currentID > maxID) {
                    maxID = currentID;
                  }
                }
                return maxID;
              }, 0);

              // Tạo ID mới
              const newID = `PD${(latestID + 1).toString().padStart(2, "0")}`;

              // Tạo dữ liệu người dùng
              const newP = {
                pName: String(pName),
                pBrand: String(pBrand),
                pType: String(pType),
                pPrice: String(pPrice),
                pQuantity: String(pQuantity),
              };

              // Ghi dữ liệu người dùng vào cơ sở dữ liệu Firebase với ID mới
                database.set(database.ref(dbRef, 'Product/' + newID), newP);
              return true;
            })
    };