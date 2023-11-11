

function showMessage(){
    // Get the Firestore database

    var db = firebase.database();

    // Create a reference to the `users` collection
    var productRef = db.ref("Product");

    // Create a user object to store the form data
    var product = {
      ProductID: document.getElementById("pID").value,
      ProductName: document.getElementById("pName").value,
      ProductBrand: document.getElementById("pBrand").value,
      ProductType: document.getElementById("pType").value,
      ProductPrice: document.getElementById("pPrice").value,
      ProductQuantity: document.getElementById("pQuantity").value
    };

    // Save the user object to the database
    productRef.push(product);
}