function Restaurant(restaurant, foodType, food, price, id = null) {
    this.restaurant = restaurant;
    this.foodType = this.foodType;
    this.food = this.food;
    this.price = this.price;
    this.id = id;
    this.toString = function() {
        let output = `${restaurant}\n${foodType}\n${food}\n${price}`
        return output;
    }
}

const restaurantHeaders = ['id', 'restaurant', 'foodType', 'food', 'price'];

function renderRestaurantTable(restaurants, containerElement) {
    const tableManager = new TableManager();
    const table = tableManager.createTable(restaurantHeaders, restaurants);
    containerElement.replaceChildren(table);
}