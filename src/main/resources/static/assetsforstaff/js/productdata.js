import * as database from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";

function setData()
{
    const dType = document.getElementById('dType').value;
    if(dType === "Shoes")
    {
        document.addEventListener('DOMContentLoaded', function() {
            // Tham chiếu đến nút chứa dữ liệu trong Firebase Realtime Database
            var dataRef = firebase.database().ref('Product/Shoes');

            // Đọc dữ liệu từ Firebase và hiển thị trong bảng HTML
            dataRef.once('value')
                .then(function(snapshot) {
                    var tableBody = document.getElementById('table-body');
                    snapshot.forEach(function(childSnapshot) {
                        var data = childSnapshot.val();
                        var row = tableBody.insertRow();
                        row.insertCell(0).innerText = data.name || '';
                        row.insertCell(1).innerText = data.brand || '';
                        row.insertCell(2).innerText = data.price || '';
                        row.insertCell(3).innerText = data.quantity || '';
                        row.insertCell(4).innerText = data.description || '';
                    });
                })
                .catch(function(error) {
                    console.error('Error reading data:', error);
                });
        });
    }
    if(dType === "Clothes")
    {

    }
    if(dType === "Accessory")
    {

    }
}