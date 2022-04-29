(function() {
    const formInputs = document.querySelectorAll(".container input");
    const id = document.querySelector("#id");
    const dataForm = document.querySelector("#data-form");
    const dataTable = document.querySelector("#data-table");

    function createRestaurantFromFormObj(dataObject) {
        const restaurant = new Restaurant(
            dataObject.restaurant,
            dataObject.foodType,
            dataObject.food,
            dataObject.price,
        );
        return restaurant;
    }

    function updateRestaurant() {
        const formData = new FormData(dataForm);
        const formDataObject = Object.fromEntries(formData.entries());

        setStatus("PREPARING UPDATE REQUEST");

        fetch(`http://localhost:8080/restaurant/${id.value}`, {
                method: "PUT", 
                body: JSON.stringify(createRestaurantFromFormObj(formDataObject)),
                headers: {
                    "Content-type": "application/json", 
                },
            })
            .then((response) => {
                setStatus("RECEIVED RESPONSE");
                if (response.ok) return response.json();
                else throw new Error("Uh oh, something went wrong...");
            })
            .then((restaurant) => {
                setStatus("RENDERING TABLE");
                renderRestaurantTable([restaurant], dataTable);
                setStatus("RESPONSE RENDERED INTO TABLE");
            })
            .catch((error) => {
                setStatus("ERROR ENCOUNTERED");
                handleError(error);
            });
    }

    function readById() {
        setStatus("PREPARING GET REQUEST");

        return fetch(`http://localhost:8080/restaurant/${id.value}`, {
                method: "GET",
            })
            .then((response) => {
                setStatus("RECEIVED RESPONSE");
                if (response.ok) return response.json();
                else throw new Error("Uh oh, something went wrong...");
            })
            .then((restaurant) => {
                return restaurant;
            })
            .catch((error) => {
                setStatus("ERROR ENCOUNTERED");
                handleError(error);
            });
    }

    id.addEventListener("change", function(event) {
        readById(id.value).then((restaurant) => {

            formInputs[1].value = restaurant.restaurant;
            formInputs[2].value = restaurant.foodType;
            formInputs[3].value = restaurant.food;
            formInputs[4].value = restaurant.price;
        });
    });

    function handleFormSubmission(event) {
        event.preventDefault();
        updateRestaurant();
    }

    dataForm.addEventListener("submit", handleFormSubmission);
})();