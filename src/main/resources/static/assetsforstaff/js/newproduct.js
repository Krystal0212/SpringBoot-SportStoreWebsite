
// Get the Firebase database
var db = firebase.database();

// Create a reference to the `users` collection
var productRef = db.ref("Product");

// Add an event listener to the submit button
document.querySelector("input[type='submit']").addEventListener("click", function() {
  // Get the form data
  var pId = document.querySelector("input[name='pID']").value;
  var pName = document.querySelector("input[name='pName']").value;
  var pBrand = document.querySelector("input[name='pBrand']").value;
  var pType = document.querySelector("input[name='pType']").value;
  var pPrice = document.querySelector("input[name='pPrice']").value;
  var pQuantity = document.querySelector("input[name='pQuantity']").value;

  // Create a user object to store the form data
  var product = {
    pId: pId,
    pName: pName,
    pBrand: pBrand,
    pType: pType,
    pPrice: pPrice,
   pQuantity: pQuantity
  };

  // Save the user object to the database
  productRef.push(product);

});