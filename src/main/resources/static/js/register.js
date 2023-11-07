import * as database from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";


const WriteDataToFirebase = function WriteDataToFirebase(username, password, email, fullName, gender, phoneNumber){

    const dbRef = database.getDatabase();
    const customersRef = database.ref(dbRef, "Customer");

    database.get(customersRef)
        .then((snapshot) => {
          // snapshot.val() chứa tất cả dữ liệu hiện có
          const userData = snapshot.val();

          // Tìm người dùng mới có ID theo mẫu
          const latestID = Object.keys(userData).reduce((maxID, key) => {
            const match = key.match(/^CS(\d+)$/);
            if (match) {
              const currentID = parseInt(match[1]);
              if (currentID > maxID) {
                maxID = currentID;
              }
            }
            return maxID;
          }, 0);

          // Tạo ID mới
          const newID = `CS${(latestID + 1).toString().padStart(2, "0")}`;

          // Tạo dữ liệu người dùng
          const newUser = {
            username: String(username),
            password: String(password),
            email: String(email),
            name: String(fullName),
            gender: String(gender),
            phone_number: String(phoneNumber),
            // Các thông tin khác của người dùng
          };

          // Ghi dữ liệu người dùng vào cơ sở dữ liệu Firebase với ID mới
          return database.set(database.ref(dbRef, 'Customer/' + newID), newUser);
        })
        .catch((error) => {
          console.error("Error code:", error.code);
          console.error("Error message:", error.message);
        });
};

 window.ClickRegister = function ClickRegister(){
    console.log("checkCredentials function called");
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const fullName = document.getElementById('name').value;
    const gender = document.getElementById('gender').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    WriteDataToFirebase(username,password, email, fullName, gender, phoneNumber);

};