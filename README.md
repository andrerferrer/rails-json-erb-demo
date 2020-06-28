# GOAL

This is a demo to show-case how to implement some `AJAX` using `Javascript` and a `js.erb` view, which updates the DOM element.

It was created from this [boilerplate](https://github.com/andrerferrer/rails-ajax-demo).

[You can also check my other demos](https://github.com/andrerferrer/dedemos/blob/master/README.md#ded%C3%A9mos).

## What needs to be done?

### Create a form

In the [view]():

```erb
<%= text_field :restaurant, 
               :name, 
               id: "edit-form-restaurant-#{restaurant.id}",
               placeholder: "Rename #{restaurant.name}", 
               class: 'hidden edit-input' %>
```

### Make an AJAX request with this form

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
      url: `/restaurants/${id}`,
      type: "put",
      // if we had data, we could add it like this
      data: formData,
      contentType: 'application/json',
      success: function(data) {
        // console.log(data) 
        
        // blur the input after pressing enter
        currentInput.blur()
      },
      error: function(data) { alert('something went wrong!') }
    })
  }
}
```

### Handle it in the Mantra 🕉

Create the route (add `:update`):

```ruby
  resources :restaurants, only: %i[index show new create destroy update] do
  # etc
```

Add the [controller]():

```ruby
  def update
    set_restaurant
    @old_name = @restaurant.name
    @restaurant.update name: params[:rename]
  end
```

### Finish it with a Javascript view, updating the DOM

In the [view]() we will update the DOM:

```js
document.getElementById('<%= @old_name %>')
        .innerHTML = `
          <%= j(render 'restaurants/partials/restaurant_data', 
                       restaurant: @restaurant ) %>
        `
```

And we're good to go 🤓

Good Luck and Have Fun!