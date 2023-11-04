const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    // Login successful, you can redirect the user or perform other actions here.
    console.log("Login successful!");
  } catch (error) {
    // Handle login errors, e.g., display an error message to the user.
    console.error("Login error:", error);
    const errorElement = document.getElementById("error");
    errorElement.innerText = "Invalid username and password.";
  }
});
