# GOAL

This is a demo to show-case how to implement some `AJAX` using a `JSON` response from the controller and some `Javascript` code, which updates the DOM element.

It was created from this [boilerplate](https://github.com/andrerferrer/rails-js-erb-demo#goal).

[You can also check my other demos](https://github.com/andrerferrer/dedemos/blob/master/README.md#ded%C3%A9mos).

## What needs to be done?

### Create an input

In the [view]():

```erb
<%= text_field :restaurant, 
               :name, 
               id: "edit-form-restaurant-#{restaurant.id}",
               placeholder: "Rename #{restaurant.name}", 
               class: 'hidden edit-input' %>
```

### Make an AJAX request from this input

In your [javascript]():

```js
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
      // Make a PUT request to the correct path
      url: `/restaurants/${id}`,
      type: "put",
      // With this data
      data: formData,
      contentType: 'application/json',
      success: function(data) {
        // receive a json as a response and refresh the DOM with it
        refreshWithUpdated(data)

        // blur the input after pressing enter
        currentInput.blur()
      },
      error: function(data) { alert('something went wrong!') }
    })
  }
}
```

And we're good to go 🤓

Good Luck and Have Fun!