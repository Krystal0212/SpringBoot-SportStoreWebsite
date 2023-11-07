import * as database from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";

const checkPasswordStrength = function checkPasswordStrength(password) {
    // Kiểm tra mật khẩu có ít nhất 8 ký tự và chứa ít nhất 1 chữ in hoa
    const passwordPattern = /^(?=.*[A-Z]).{8,}$/;
    return passwordPattern.test(password);
};

const checkMatchingPasswords = function checkMatchingPasswords(password, passwordConfirm) {
    return password === passwordConfirm;
};

const checkPhoneNumberLength = function checkPhoneNumberLength(phoneNumber) {
    return phoneNumber.length >= 10 && phoneNumber.length < 13;
};

const checkUsernameLength = function checkUsernameLength(username) {
    return username.length >= 5;
};

const checkEmailAndUsername = function checkEmailAndUsername(email, username) {
  const dbRef = database.getDatabase();
  const customersRef = database.ref(dbRef, "Customer");
    //One time read data user get
    return database.get(customersRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                for(const snap in snapshot.val()){
                    const customerData = snapshot.val()[snap];
                    if (customerData.username === username) {
                        alert("Tên tài khoản đã được sử dụng");
                        return false;
                    }
                    else if(customerData.email === email){
                        alert("Email đã được sử dụng");
                        return false;
                    }
                }
                return true;
            } else {
                console.log("No data available in the 'Customer' node");
                return false;
            }
        })
        .catch((error) => {
            console.error("Error code:", error.code);
            console.error("Error message:", error.message);
            return false;
        });
};

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
    return true;
  }
  return false;
};
const WriteDataToFirebase = function WriteDataToFirebase(username, password, email, fullName, gender, phoneNumber){

    const dbRef = database.getDatabase();
    const customersRef = database.ref(dbRef, "Customer");

    return database.get(customersRef)
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
            database.set(database.ref(dbRef, 'Customer/' + newID), newUser);
          return true;
        })
        .catch((error) => {
          console.error("Error code:", error.code);
          console.error("Error message:", error.message);
          return false;
        });
};

 window.ClickRegister = function ClickRegister() {
     //thêm hàm để check có thông tin nào bị bỏ trống
     // hàm check xem email và username có tồn tại trong firebase chưa
     console.log("checkCredentials function called");
     const username = document.getElementById('username').value;
     const password = document.getElementById('password').value;
     const passwordConfirm = document.getElementById('passwordConfirm').value;
     const email = document.getElementById('email').value;
     const fullName = document.getElementById('name').value;
     const gender = document.getElementById('gender').value;
     const phoneNumber = document.getElementById('phoneNumber').value;
     if (checkEmptyFields(username, password, email, fullName, gender, phoneNumber)) {
         return;
     }

     if (!checkUsernameLength(username)) {
         alert("Tên tài khoản phải có ít nhất 5 kí tự.");
         return;
     }

     if (!checkPasswordStrength(password)) {
         alert("Mật khẩu phải có ít nhất 8 ký tự và chứa ít nhất 1 chữ in hoa.");
         return;
     }

     if (!checkMatchingPasswords(password, passwordConfirm)) {
         alert("Mật khẩu và xác nhận mật khẩu phải giống nhau.");
         return;
     }

     if (!checkPhoneNumberLength(phoneNumber)) {
         alert("Số điện thoại phải có ít nhất 10 số và bé hơn 13 số.");
         return;
     }

     checkEmailAndUsername(email, username)
         .then((result) => {
             if (result) {
                 WriteDataToFirebase(username, password, email, fullName, gender, phoneNumber)
                     .then(() => {
                         alert("Tạo tài khoản thành công, vui lòng đăng nhập để tiếp tục !");
                         window.location.href = "/login";
                     })
                     .catch((error) => {
                         console.error("Error writing user data: ", error);
                     });
             }
         });
 };