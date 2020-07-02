import Rails from '@rails/ujs'

const toggleHiddenOnElements = (event) => {

  // select the parent element and toggle hidden on all the children elements
  const parentElement = event.currentTarget.parentElement
  Array.from(parentElement.children).forEach((childElement) => {
    childElement.classList.toggle('hidden')
  })

  // focus on input if it's no longer hidden
  const currentInput = parentElement.querySelector(".edit-input")
  if (!currentInput.classList.contains('hidden')) currentInput.focus()
}

const refreshWithUpdated = (json) => {
  document.getElementById(json.oldName)
        .innerHTML = json.html
}

const updateRestaurantName = (event) => {
  // only works if the pressed key was the ENTER key
  if (event.key == "Enter") {
    const currentInput = event.currentTarget

    // identify the restaurant id from the currentInput's (DOM Element) id
    const id = currentInput.id.slice(-1)

    // create some data to be sent
    var formData = new FormData();
    formData.append("rename", currentInput.value);

    // make the AJAX request
    Rails.ajax({
      url: `/restaurants/${id}`,
      type: "put",
      data: formData,
      contentType: 'application/json',
      success: function(data) {
        console.log(data)
        refreshWithUpdated(data)

        // blur the input after pressing enter
        currentInput.blur()
      },
      error: function(data) { alert('something went wrong!') }
    })
  }
}

const editRestaurantName = () => {
  // check if we are on the restaurants index page
  const restaurantsIndex = document.getElementById("restaurants-index")
  // if so, we'll run the code
  if (restaurantsIndex) {

    // first, we select all edit btns and inputs
    const editBtns = document.querySelectorAll('.edit-btn')
    const editInputs = document.querySelectorAll('.edit-input')

    // for each edit btn we add a click event to hide the btn and show the input
    editBtns.forEach( (editBtn) => {
      editBtn.addEventListener('click', toggleHiddenOnElements)
    })

    // for each edit input we add a click event to hide the input and show the btn
    editInputs.forEach((editInput) => {
      
      editInput.addEventListener('blur', toggleHiddenOnElements)

      // we'll also add an event listener to check if the user press enter, 
      // if so, we update the name in the DB
      editInput.addEventListener('keypress', updateRestaurantName)
    })

  }
}

export { editRestaurantName }