import * as database from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
// Get the Firebase database
// Add an event listener to the submit button


window.ClickAdd = function ClickAdd(){
     const pName = document.getElementById('pName').value;
     const pBrand = document.getElementById('pBrand').value;
     const pType = document.getElementById('pType').value;
     const pPrice = document.getElementById('pPrice').value;
     const pQuantity = document.getElementById('pQuantity').value;
        const pDe = document.getElementById('pDe').value;
        const pUrl = document.getElementById('imageUrl').value;
     WriteDataToFirebase(pName, pBrand, pType, pPrice, pQuantity,pDe,pUrl)
                          .then(() => {
                              alert("Thêm thành công!");
                          })
 };



    const WriteDataToFirebase = function WriteDataToFirebase(pName, pBrand, pType, pPrice, pQuantity,pDe,pUrl){

    if(pType === "Shoes")
    {
    const dbRef = database.getDatabase();
    const pRef = database.ref(dbRef, "Product");return database.get(pRef)
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
                url: String(pUrl),
            };

            // Ghi dữ liệu người dùng vào cơ sở dữ liệu Firebase với ID mới
            database.set(database.ref(dbRef, 'Product/' + pType + '/' + newID), newP);
            return true;
        })
    }
    if(pType === "Clothes")
        {
        const dbRef = database.getDatabase();
                                    const pRef = database.ref(dbRef, "Product");
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
                                    url: String(pUrl),
                                  };

                                  // Ghi dữ liệu người dùng vào cơ sở dữ liệu Firebase với ID mới
                                    database.set(database.ref(dbRef, 'Product/' + pType + '/' + newID), newP);
                                  return true;
                                })
        }
        if(pType === "Accessory")
                {
                const dbRef = database.getDatabase();
                                            const pRef = database.ref(dbRef, "Product");
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
                                            url: String(pUrl),
                                          };

                                          // Ghi dữ liệu người dùng vào cơ sở dữ liệu Firebase với ID mới
                                            database.set(database.ref(dbRef, 'Product/' + pType + '/' + newID), newP);
                                          return true;
                                        })
                }
    return true;
    };

