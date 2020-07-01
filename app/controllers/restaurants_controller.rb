class RestaurantsController < ApplicationController
  def index
    @restaurants = Restaurant.all
  end

  def show
    set_restaurant
    @review = Review.new
  end

  def new
    @restaurant = Restaurant.new
  end

  def create
    @restaurant = Restaurant.new strong_params
    @restaurant.save ? redirect_to(@restaurant) : render(:new)
  end

  def update
    set_restaurant
    @old_name = @restaurant.name
    @restaurant.update name: params[:rename]
    # This was supposed to work, but the JBUILDER gem breaks this
    # This is the workaround
    # render plain: { html: render_to_string('restaurants/partials/restaurant_data', restaurant: @restaurant) }.to_json, content_type: 'application/json'
    html = render_to_string('restaurants/partials/_restaurant_data', 
                             locals: { restaurant: @restaurant },
                             layout: false)
    puts htmlActionView::MissingTemplate
    render json: { html: html }
  end

  def destroy
    set_restaurant
    @restaurant.destroy
  end

  private

  def set_restaurant
    @restaurant = Restaurant.find(params[:id])
  end

  def strong_params
    params.require(:restaurant).permit(Restaurant::STRONG_PARAMS)
  end
end
