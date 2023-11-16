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
                        Swal.fire({
                            icon: 'error',
                            title: 'Attention!',
                            text: 'Username has been used',
                        });
                        return false;
                    }
                    else if(customerData.email === email){
                        Swal.fire({
                            icon: 'error',
                            title: 'Attention!',
                            text: 'Email has been used',
                        });
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
    const message = `Please fill out these information: ${emptyFields.join(", ")}`;
      Swal.fire({
          icon: 'error',
          title: 'Missing Information',
          text: message,
      });
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
            state: 'enable',
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
         Swal.fire({
             icon: 'error',
             title: 'Missing Information',
             text: 'Username must has atleast 5 digits',
         });
         return;
     }

     if (!checkPasswordStrength(password)) {
         Swal.fire({
             icon: 'error',
             title: 'Missing Information',
             text: 'Password must has 8 digits and atleast 1 uppcase digits',
         });
         return;
     }

     if (!checkMatchingPasswords(password, passwordConfirm)) {
         Swal.fire({
             icon: 'error',
             title: 'Missing Information',
             text: 'Password does not match',
         });
         return;
     }

     if (!checkPhoneNumberLength(phoneNumber)) {
         Swal.fire({
             icon: 'error',
             title: 'Missing Information',
             text: 'Phone number must has atleast 10 numbers and less than 13 numbers',
         });
         return;
     }

     checkEmailAndUsername(email, username)
         .then((result) => {
             if (result) {
                 WriteDataToFirebase(username, password, email, fullName, gender, phoneNumber)
                     .then(() => {
                         Swal.fire({
                             icon: 'success',
                             title: 'Hi there!',
                             text: 'Register successfully, please sign in to continue!',
                         });
                         window.location.href = "/login";
                     })
                     .catch((error) => {
                         console.error("Error writing user data: ", error);
                     });
             }
         });
 };