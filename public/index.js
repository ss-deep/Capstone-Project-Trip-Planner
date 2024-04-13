
//get trip name and dates from the modal
const datesRange = document.getElementById("dates").value
const submitDates = document.getElementById("submit-dates")
submitDates.addEventListener('click',()=>alert(datesRange))
console.log(typeof datesRange);






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

