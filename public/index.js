
//get trip name and dates from the modal which is in intro.html
const formData = document.querySelectorAll('input')
const submitDates = document.getElementById("submit-dates")
submitDates.addEventListener('click', () => {
    // formData.forEach(ele => console.log(ele.value))
    window.location.href="index.html"
})






//Implements drag and drop functionality for lists
const pendingTasks = document.getElementById('pending-tasks');
const completedTasks = document.getElementById('completed-tasks');
// alert('Hi')
Sortable.create(pendingTasks, {
  animation: 150,
  group: 'taskList'
});
Sortable.create(completedTasks, {
  animation: 150,
  group: 'taskList'
});

