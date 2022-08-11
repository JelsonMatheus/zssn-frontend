(function startApp() {
    showSurvivor();

    document.getElementById('survivorForm').addEventListener('submit', function(event) {
        event.preventDefault();
        updateLocation();
    });

})();

function showSurvivor() {
    const api = new ApiSurvivor();
    const pk = document.getElementById('pk').value;

    api.show(pk).then(data => {
        for(const [key, value] of Object.entries(data)) {
            input = document.getElementsByName(key);

            if(input.length > 0)
                input[0].value = value;
        }
        showInventory(pk);

    }).catch(error => {
        showNotFound();
    });
}

function showInventory(pk) {
    const api = new ApiSurvivor();
    const elem = document.getElementById('errosInventory');
    elem.style.display = 'none';

    api.showInventory(pk).then(data => {
        for(const [key, value] of Object.entries(data)) {
            input = document.getElementsByName('inventory.'+key);
            if(input.length > 0)
                input[0].value = value;
        }
    }).catch(error => {
        const status = error.response.status;
        let msg = "Não foi possível acessar os itens.";

        if(status === 403) {
            msg += " Sobrevivente está infectado!";
        }

        elem.innerText = msg;
        elem.style.display = 'block';
    });
}

function updateLocation() {
    const latitude = document.getElementById('latitude');
    const longitude = document.getElementById('longitude');
    const pk = document.getElementById('pk').value;
    
    const data = {
        latitude: latitude.value,
        longitude: longitude.value
    }

    const api = new ApiSurvivor();
    api.update(data, pk).then(() => {
        const msg = "Dados salvos com sucesso!"
        createToastify(msg, "succes");
    }).catch(error => {
        console.log(error);
        const msg = "Não foi possível realizar a operação."
        createToastify(msg, "error");
    });
}

function showNotFound() {
    document.getElementById('survivorForm').style.display = 'none';
    document.getElementById('contentNotFound').style.display = 'block';
}