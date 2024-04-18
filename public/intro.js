
// Get trip name and dates from the modal in intro.html

// const { default: axios } = require("axios");

// const inputs = document.querySelectorAll('input')
const loginButton = document.getElementById("login-button")
const invalidFeedback = document.querySelector('.invalid-feedback')
const loginForm = document.getElementById('login-form');
let loginUserName=document.getElementById('login-username')
let loginPassword = document.getElementById('login-password')
const loginModal = document.getElementById('loginModal');

let signupUserName=document.getElementById('signup-username')
let signupEmail=document.getElementById('signup-email')
let signupPassword=document.getElementById('signup-password')
const signUpButton = document.getElementById("signUp-button")

const submitAndRedirect = document.getElementById("submit-trip-info")
const tripName = document.getElementById("my-trip-name")
const tripDates = document.getElementById("dates-range")

let userId;
let username;

document.getElementById('planner').addEventListener('click', () => {
  loginUserName.value = ""
  loginPassword.value=""
})
const baseURL = `http://localhost:9801`

document.addEventListener('DOMContentLoaded', function () {
  loginForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Validate username
    if (loginUserName.value && loginPassword.value) {
      axios.get(`${baseURL}/login`, {
        params: {
          loginUserName: loginUserName.value,
          loginPassword: loginPassword.value
        }
      })
        .then((res) => {
          let userData = res.data
          if (userData.length) {
            // console.log("login id :",userData[0].user_id);
            userId = userData[0].user_id
            username=userData[0].username
            const plannerModal = new bootstrap.Modal(document.getElementById('plannerModal'));
            const loginModalInstance = bootstrap.Modal.getInstance(loginModal);
            loginModalInstance.hide();
            plannerModal.show();

          } else {
            document.getElementById('feedback').style.visibility = 'visible'
            loginUserName.value = ""
            loginPassword.value=""
            console.log("Not Found");
          }
        }).catch((err) => {
          console.log("Error in login");
        });
    } else {
      alert('Please enter a username and password');
    }
  });
  loginButton.addEventListener('click', function() {
    loginForm.dispatchEvent(new Event('submit'));
});
})


signUpButton.addEventListener('click', () => { 
  console.log({signupUserName,signupEmail,signupPassword});
  axios.post(`${baseURL}/signup`,{
    signupUserName:signupUserName.value,
    signupEmail:signupEmail.value,
    signupPassword:signupPassword.value
  })
  .then((res) => {
    console.log("signup ",res.data);
  }).catch((err) => {
    console.log("Error in sign up");
  });
})
  
  
submitAndRedirect.addEventListener('click', () => {
  console.log("inside submitAndRedirect");
  axios.post(`${baseURL}/planner`,{
    userId: userId,
    username:username,
    tripName:tripName.value,
    tripDates:tripDates.value
  })
  .then((res) => {
    // console.log("responce for submitAndRedirect :" , res.data);
    window.location.href = `index.html?username=${username}`
  }).catch((err) => {
    console.log("Error in sending data to index.html");
  });
  
})

