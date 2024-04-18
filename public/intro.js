
// Get trip name and dates from the modal in intro.html
// const inputs = document.querySelectorAll('input')
const loginButton = document.getElementById("login-button")
const signUpButton = document.getElementById("signUp-button")
const submitDates = document.getElementById("submit-trip-info")
const invalidFeedback = document.querySelector('.invalid-feedback')
  const loginForm = document.getElementById('login-form');


const baseURL = `http://localhost:9801`

document.addEventListener('DOMContentLoaded', function () {
  // const loginForm = document.getElementById('login-form');
  let loginUserName=document.getElementById('login-username')
  let loginPassword = document.getElementById('login-password')
  const loginModal = document.getElementById('loginModal');
  // const loginButton = document.getElementById('login-button');
  loginUserName.value = ""
  loginPassword.value=""

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
            console.log(res.data);
            const plannerModal = new bootstrap.Modal(document.getElementById('plannerModal'));
            // plannerModal.show();
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
      alert('Please enter a username or password');
    }
  });
  loginButton.addEventListener('click', function() {
    loginForm.dispatchEvent(new Event('submit'));
});
})






signUpButton.addEventListener('click', () => { 
  let signupUserName=document.getElementById('signup-username')
  let signupEmail=document.getElementById('signup-email')
  let signupPassword=document.getElementById('signup-password')
  console.log({signupUserName,signupEmail,signupPassword});
  axios.post(`${baseURL}/signup`,{
    signupUserName:signupUserName.value,
    signupEmail:signupEmail.value,
    signupPassword:signupPassword.value
  })
  .then((res) => {
    console.log(res.data);
  }).catch((err) => {
    console.log("Error in login");
  });

})
submitDates.addEventListener('click', () => {
  // input[0].id==='':sendUserData(inputValues)?
  // console.log(inputValues);
  // sendUserData(inputValues)
  window.location.href = `index.html` 
});


function sendUserData(userData) {
}