// Import Rails
import Rails from '@rails/ujs'

// encapsule the logic in a function 
const deleteRestaurant = () => {
  // call the function if it's the right page
  const restaurantsIndex = document.getElementById("restaurants-index")
  if (restaurantsIndex) {
    // find all elements which ids start with 'restaurant-'
    const deleteBtns = document.querySelectorAll("[id^=delete-restaurant-]")

    const ajaxCall = (event) => {
      const currentBtn = event.currentTarget
      const id = currentBtn.id.slice(-1)
      
      // use Rails that we imported above
      Rails.ajax({
        url: `/restaurants/${id}`,
        type: "delete",
        // if we had data, we could add it like this
        // data: "",
        success: function(data) { 
          // remove button
          currentBtn.parentElement.remove() 
        },
        error: function(data) {alert('something went wrong!')}
      })
    }
    
    deleteBtns.forEach( (deleteBtn) => {
      deleteBtn.addEventListener('click', ajaxCall)
    })
  }
    
}

export { deleteRestaurant }