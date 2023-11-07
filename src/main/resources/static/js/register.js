import * as database from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
const checkEmailAndUsername = function checkEmailAndUsername(email, username) {
  const dbRef = database.getDatabase();
  const usersRef = database.ref(dbRef, "Customer");

  // Kiểm tra email đã tồn tại trong Firebase
  return Promise.all([
    database.get(database.child(usersRef, 'email/' + email)),
    database.get(database.child(usersRef, 'username/' + username)),
  ])
    .then((snapshots) => {
      const emailSnapshot = snapshots[0];
      const usernameSnapshot = snapshots[1];

      if (emailSnapshot.exists() && usernameSnapshot.exists()) {
        // Cả email và username đã tồn tại
        alert("Email and Username already exist in Firebase"); // Thay bằng thông báo hiển thị tùy theo giao diện của bạn
        return false;
      } else if (emailSnapshot.exists()) {
        // Email đã tồn tại
        alert("Email already exists in Firebase"); // Thay bằng thông báo hiển thị tùy theo giao diện của bạn
        return false;
      } else if (usernameSnapshot.exists()) {
        // Username đã tồn tại
        alert("Username already exists in Firebase"); // Thay bằng thông báo hiển thị tùy theo giao diện của bạn
        return false;
      } else {
        // Cả email và username đều chưa tồn tại
        return true;
      }
    });
}

const checkEmptyFields = function checkEmptyFields(username, password, email, fullName, gender, phoneNumber) {
  const emptyFields = [];

  if (!username) {
    emptyFields.push("Username");
  }
  if (!password) {
    emptyFields.push("Password");
  }
  if (!email) {
    emptyFields.push("Email");
  }
  if (!fullName) {
    emptyFields.push("Full Name");
  }
  if (!gender) {
    emptyFields.push("Gender");
  }
  if (!phoneNumber) {
    emptyFields.push("Phone Number");
  }

  if (emptyFields.length > 0) {
    // Có ít nhất một trường thông tin bị bỏ trống
    const message = `Vui lòng điền đầy đủ thông tin: ${emptyFields.join(", ")}`;
    alert(message); // Thay bằng thông báo hiển thị tùy theo giao diện của bạn
    return false;
  }
  return true;
}
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
    //thêm hàm để check có thông tin nào bị bỏ trống
    // hàm check xem email và username có tồn tại trong firebase chưa
    console.log("checkCredentials function called");
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const fullName = document.getElementById('name').value;
    const gender = document.getElementById('gender').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    if(checkEmptyFields(username,password, email, fullName, gender, phoneNumber)){
        WriteDataToFirebase(username,password, email, fullName, gender, phoneNumber);
        window.location.href = "/login";
    }
};