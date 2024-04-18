// Get trip name and dates from the modal in intro.html
// const inputs = document.querySelectorAll('input')
const submitDates = document.getElementById("submit-trip-info")
const loginButton = document.getElementById("login-button")
const signUpButton = document.getElementById("signUp-button")
const baseURL = `http://localhost:9801`

// console.log(typeof inputs);
// const inputValues = {}
  // inputs.forEach(input => {
  //   if (input.value) {
  //     inputValues[input.id] = input.value
  //   }
  // })




submitDates.addEventListener('click', () => {
  // input[0].id==='':sendUserData(inputValues)?
  // console.log(inputValues);
  // sendUserData(inputValues)
  window.location.href = `index.html`  //${new URLSearchParams(inputValues)}`;
});




loginButton.addEventListener('click', () => { 
  // console.log(inputs[1].value);

  let loginUserName=document.getElementById('login-username').value
  let loginPassword=document.getElementById('login-password').value
  console.log({userName:loginUserName,password:loginPassword});
  // console.log(user);
  axios.get(`${baseURL}/login`,{
    params: {
      loginUserName: loginUserName,
      loginPassword: loginPassword
  }
  })
  .then((res) => {
    console.log(res.data);
  }).catch((err) => {
    console.log("Error in login");
  });

})




signUpButton.addEventListener('click', () => { 
  axios.get(`${baseURL}/signup`, inputs)
  .then((res) => {
    console.log(res.data);
  }).catch((err) => {
    console.log("Error in sign up");
  });

})

function sendUserData(userData) {
}