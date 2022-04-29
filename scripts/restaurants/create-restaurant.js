(function() {
    const dataTable = document.querySelector('#data-table');
    const dataForm = document.querySelector('#data-form');

    function createRestaurantFromFormObj(dataObject) {
        const restaurant = new restaurant(dataObject.restaurant, dataObject.foodType, dataObject.food, dataObject.price);
        return review;
    }

    function create() {

        const formData = new FormData(dataForm);
        const formDataObject = Object.fromEntries(formData.entries());

        setStatus('PREPARING POST REQUEST');

        fetch('https://localhost:8080/restaurant', {
            method: 'POST', 
            body: JSON.stringify(createRestaurantFromFormObj(formDataObject)),
            headers: {
                'Content-type': 'application/json' 
            }
        }).then(response => {
            setStatus('RECEIVED RESPONSE');

            if (response.ok) return response.json();
            else throw new Error('something went wrong with the request');
        })
          .then(restaurant => {
            setStatus('RENDERING TABLE');
            
            renderRestaurantTable([Restaurant], dataTable);
            setStatus('RESPONSE RENDERED INTO TABLE');
        })
          .catch(error => {
            setStatus('ERROR ENCOUNTERED');
            handleError(error);
        });
    }

    function handleFormSubmission(event) {
        
        event.preventDefault(); 
        create();
    }

    dataForm.addEventListener('submit', handleFormSubmission);

})();