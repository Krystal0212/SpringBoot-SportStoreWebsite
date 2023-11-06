import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";

// Function to find the customer with matching username and password
const findMatchingCustomer = (snapshot, username, password) => {
    for (const customerId in snapshot.val()) {
        const customerData = snapshot.val()[customerId];
        if (customerData.username === username && customerData.password === password) {
            console.log("Authentication successful!");
            redirectToIndexPage(customerData,customerId);
            return;
        }
    }
    console.log("Invalid username or password");
};

const redirectToIndexPage = (customerData,customerId) => {
    // Create a User object with the user's data
    const user = {
        userId: customerId,
        userName: customerData.username,
        userPassword: customerData.password,
        email: customerData.email,
        gender: customerData.gender,
        phoneNumber: customerData.phone_number,
        fullName: customerData.name
    };

    // Convert user data to a JSON string
    const userJSON = JSON.stringify(user);

    // Store the user data in localStorage for use in the protected index page
    localStorage.setItem("user", userJSON);

    // Redirect to the protected index page
    window.location.href = "/home"; // Update the URL as needed
};

window.checkCredentials = function() {
    console.log("checkCredentials function called");
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const dbRef = ref(getDatabase());
    const customersRef = child(dbRef, "Customer");

    get(customersRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                findMatchingCustomer(snapshot, username, password);
            } else {
                console.log("No data available in the 'Customer' node");
            }
        })
        .catch((error) => {
            console.error("Error code:", error.code);
            console.error("Error message:", error.message);
        });
};