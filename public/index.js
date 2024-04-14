
// const { default: axios } = require('axios')
const urlParams = new URLSearchParams(window.location.search);
const tripName = urlParams.get('trip-name');
const startDate = urlParams.get('dates-range');
let cityData;

const baseURL = `http://localhost:9801`

//Displays conten on trip details box
document.getElementById('trip-name').value = tripName
document.getElementById('selected-dates-range').innerHTML = startDate
const placesDiv=document.getElementById('places-to-visit')

//Implements drag and drop functionality for lists
const dragDrop = document.getElementById('drag-drop');
// const completedTasks = document.getElementById('attraction-drag-drop');
Sortable.create(dragDrop, {
  animation: 150,
  group: 'taskList'
});
// Sortable.create(completedTasks, {
//   animation: 150,
//   group: 'taskList'
// });

//---------------------Autocomplete Api section----------------------

/* 
	The addressAutocomplete takes as parameters:
  - a container element (div)
  - callback to notify about address selection
  - geocoder options:
  	 - placeholder - placeholder text for an input element
     - type - location type
*/
function addressAutocomplete(containerElement, callback, options) {
  // create input element
  let inputElement = document.createElement("input");
  inputElement.setAttribute("type", "text");
  inputElement.setAttribute("placeholder", options.placeholder);
  containerElement.appendChild(inputElement);

  // add input field clear button
  let clearButton = document.createElement("div");
  clearButton.classList.add("clear-button");
  addIcon(clearButton);
  clearButton.addEventListener("click", (e) => {
    e.stopPropagation();
    inputElement.value = '';
    callback(null);
    clearButton.classList.remove("visible");
    closeDropDownList();
  });
  containerElement.appendChild(clearButton);

  /* Current autocomplete items data (GeoJSON.Feature) */
  let currentItems;

  /* Active request promise reject function. To be able to cancel the promise when a new request comes */
  let currentPromiseReject;

  /* Focused item in the autocomplete list. This variable is used to navigate with buttons */
  let focusedItemIndex;

  /* Execute a function when someone writes in the text field: */
  inputElement.addEventListener("input", function(e) {
    let currentValue = this.value;

    /* Close any already open dropdown list */
    closeDropDownList();

    // Cancel previous request promise
    if (currentPromiseReject) {
      currentPromiseReject({
        canceled: true
      });
    }

    if (!currentValue) {
      clearButton.classList.remove("visible");
      return false;
    }

    // Show clearButton when there is a text
    clearButton.classList.add("visible");

    /* Create a new promise and send geocoding request */
    let promise = new Promise((resolve, reject) => {
      currentPromiseReject = reject;

      let apiKey = "2edeea4d1a3e45f19e07523fdc852c2b";
      let url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(currentValue)}&limit=5&apiKey=${apiKey}`;
      
      if (options.type) {
      	url += `&type=${options.type}`;
      }

      fetch(url)
        .then(response => {
          // check if the call was successful
          if (response.ok) {
            response.json().then(data => resolve(data));
          } else {
            response.json().then(data => reject(data));
          }
        });
    });

    promise.then((data) => {
      currentItems = data.features;

      /*create a DIV element that will contain the items (values):*/
      let autocompleteItemsElement = document.createElement("div");
      autocompleteItemsElement.setAttribute("class", "autocomplete-items");
      containerElement.appendChild(autocompleteItemsElement);

      /* For each item in the results */
      data.features.forEach((feature, index) => {
        /* Create a DIV element for each element: */
        let itemElement = document.createElement("DIV");
        /* Set formatted address as item value */
        itemElement.innerHTML = feature.properties.formatted;

        /* Set the value for the autocomplete text field and notify: */
        itemElement.addEventListener("click", function(e) {
          inputElement.value = currentItems[index].properties.formatted;
          callback(currentItems[index]);

          /* Close the list of autocompleted values: */
          closeDropDownList();
        });

        autocompleteItemsElement.appendChild(itemElement);
      });
    }, (err) => {
      if (!err.canceled) {
        console.log(err);
      }
    });
  });

  /* Add support for keyboard navigation */
  inputElement.addEventListener("keydown", function(e) {
    let autocompleteItemsElement = containerElement.querySelector(".autocomplete-items");
    if (autocompleteItemsElement) {
      let itemElements = autocompleteItemsElement.getElementsByTagName("div");
      if (e.code === 'ArrowDown') {
        e.preventDefault();
        /*If the arrow DOWN key is pressed, increase the focusedItemIndex variable:*/
        focusedItemIndex = focusedItemIndex !== itemElements.length - 1 ? focusedItemIndex + 1 : 0;
        /*and and make the current item more visible:*/
        setActive(itemElements, focusedItemIndex);
      } else if (e.code === 'ArrowUp') {
        e.preventDefault();

        /*If the arrow UP key is pressed, decrease the focusedItemIndex variable:*/
        focusedItemIndex = focusedItemIndex !== 0 ? focusedItemIndex - 1 : focusedItemIndex = (itemElements.length - 1);
        /*and and make the current item more visible:*/
        setActive(itemElements, focusedItemIndex);
      } else if (e.code === 'Enter') {
        /* If the ENTER key is pressed and value as selected, close the list*/
        e.preventDefault();
        if (focusedItemIndex > -1) {
          closeDropDownList();
        }
      }
    } else {
      if (e.code === 'ArrowDown') {
        /* Open dropdown list again */
        // let event = document.createEvent('Event');
          // event.initEvent('input', true, true);
          const event = new Event('input', {
            bubbles: true,
            cancelable: true
          });
        inputElement.dispatchEvent(event);
      }
    }
  });

  function setActive(items, index) {
    if (!items || !items.length) return false;

    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove("autocomplete-active");
    }

    /* Add class "autocomplete-active" to the active element*/
    items[index].classList.add("autocomplete-active");

    // Change input value and notify
      inputElement.value = currentItems[index].properties.formatted;

    callback(currentItems[index]);
  }

  function closeDropDownList() {
    let autocompleteItemsElement = containerElement.querySelector(".autocomplete-items");
    if (autocompleteItemsElement) {
      containerElement.removeChild(autocompleteItemsElement);
    }

    focusedItemIndex = -1;
  }

  function addIcon(buttonElement) {
    let svgElement = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    svgElement.setAttribute('viewBox', "0 0 24 24");
    svgElement.setAttribute('height', "24");

    let iconElement = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    iconElement.setAttribute("d", "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z");
    iconElement.setAttribute('fill', 'currentColor');
    svgElement.appendChild(iconElement);
    buttonElement.appendChild(svgElement);
  }
  
    /* Close the autocomplete dropdown when the document is clicked. 
  	Skip, when a user clicks on the input field */
  document.addEventListener("click", function(e) {
    if (e.target !== inputElement) {
      closeDropDownList();
    } else if (!containerElement.querySelector(".autocomplete-items")) {
      // open dropdown list again
        // let event = document.createEvent('Event');
        const event = new Event('input', {
            bubbles: true,
            cancelable: true
          });
    //   event.initEvent('input', true, true);
      inputElement.dispatchEvent(event);
    }
  });

}

// addressAutocomplete(document.getElementById("autocomplete-container"), (data) => {
//   console.log("Selected option: ");
//   console.log(data);
// }, {
// 	placeholder: "Enter an address here"
// });
addressAutocomplete(document.getElementById("autocomplete-container-city"), (data) => {
    console.log("Selected city: ");
    cityData = data
    // console.log(cityData);
    getDataList(cityData)
    // console.log(data);
  }, {
    placeholder: "Enter a city name here",
    type: "city"
});
  
// ------------------Get attractions list and display it-------------

function getDataList(city) {
  axios.post(`${baseURL}/attractions`,city)
    .then((res) => {
          let attractionsList = res.data.features
      // console.log("reeeeeessspone",attractionsList['features'][0]['properties']['name']);
      attractionsList.forEach(place => {
        let placeHtml = createCard(place)
        placesDiv.innerHTML += placeHtml
      
      })
          
    })
}
function displyaDataCards() {
    
}

function createCard(attraction) {
  return `
  <div class="source-card" draggable="true">
    <div class="main-information">
      <h5 class="f-s-18 m-b-8">${attraction['properties']['name']}</h5>
      <div class="row orange-text m-b-2 ">
      <span class="hours">Opening Hrs : ${attraction['properties']['opening_hours']}</span></div>
      <div class="description gray mt-2" title="">                                
        <p>Website : ${attraction['properties']['website']}</p>
        <p>Address : ${attraction['properties']['formatted']}</p>
      </div>
  </div>
</div>`
}
