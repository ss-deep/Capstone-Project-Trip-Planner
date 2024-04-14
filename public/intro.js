// Get trip name and dates from the modal in intro.html
const inputs = document.querySelectorAll('input')
const submitDates = document.getElementById("submit-dates")

submitDates.addEventListener('click', () => {
  const inputValues = {}
  inputs.forEach(input => {
    inputValues[input.id] = input.value
  })
  console.log(inputValues);
  window.location.href = `index.html?${new URLSearchParams(inputValues)}`;
});