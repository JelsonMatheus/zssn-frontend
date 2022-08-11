(function startApp() {
    const sellerDiv = document.getElementById('seller');
    const buyerDiv = document.getElementById('buyer');
    
    loadSurvivors();

    document.getElementById('survivorForm').addEventListener('submit', function(event) {
        event.preventDefault();
        save();
    });

    document.getElementById('survivorSeller').addEventListener('change', function(event) {
        loadInventory('seller');
    });
    document.getElementById('survivorBuyer').addEventListener('change', function(event) {
        loadInventory('buyer');
    });

    sellerDiv.querySelectorAll('input').forEach(elem =>{
        elem.addEventListener('change', function(event) {
            updatePointsLabel('seller');
        });
    });
    buyerDiv.querySelectorAll('input').forEach(elem =>{
        elem.addEventListener('change', function(event) {
            updatePointsLabel('buyer');
        });
    });

})();


function save() {
    const data = {
        survivor_seller: document.getElementById('survivorSeller').value,
        survivor_buyer: document.getElementById('survivorBuyer').value,
        sends: createInventory('seller'),
        pickup: createInventory('buyer')
    }

    const api = new ApiSurvivor();

    if(validate(data)) {
        api.trade(data).then(() => {

            loadInventory('seller');
            loadInventory('buyer');

            const msg = "Dados salvos com sucesso!";
            createToastify(msg, "succes");

        }).catch(error =>{
            console.log(error);
            const msg = "Não foi possível realizar a operação."
            createToastify(msg, error);
        });
    }
}


function validate(data) {
    let error = null;
    const sumSends = sumItemsValues(data.sends);
    const sumPickup = sumItemsValues(data.pickup);

    if(data.survivor_seller == data.survivor_buyer) {
        error =  "O vendedor e comparador não podem ser iguais.";
    }
    else if(isAllEmptyItems(data.sends)) {
        error = "O vendedor deve oferecer algum item!";
    }
    else if(isAllEmptyItems(data.pickup)) {
        error = "O comprador deve oferecer algum item!";
    }
    else if(sumPickup != sumSends) {
        error = "A soma dos itens de troca não são iguais!";
    }

    if(error == null) {
        return true;
    }

    createToastify(error, 'error');
    return false;
}

function sumItemsValues(items){
    const values = getItemsValues();

    return Object.entries(items).reduce((acc, [key, value]) => {
        return acc + (values[key] * value)
    }, 0);
}

function loadSurvivors() {
    const api = new ApiSurvivor();
    const survivorSeller = document.getElementById('survivorSeller');
    const survivorBuyer = document.getElementById('survivorBuyer');

    survivorSeller.innerHTML = "";
    survivorBuyer.innerHTML = "";
    const params = {'is_infected': false}

    api.list(params).then(data => {
        data.forEach(elem => {
            survivorSeller.innerHTML += createOptionsSelect(elem);
            survivorBuyer.innerHTML += createOptionsSelect(elem);
        });
    });
}

function createOptionsSelect(survivor) {
    return `<option value=${survivor.pk}>${survivor.name}</option>`;
}

function loadInventory(type) {
    const pk = document.getElementsByName('survivor_'+type)[0].value;

    const api = new ApiSurvivor();
    const elem = document.getElementById('error-'+type);

    api.showInventory(pk).then(data => {
        Object.entries(data).forEach(([key, value]) => {
            input = document.getElementsByName(type+'.'+key);
            if(input.length > 0) {
                input[0].max = value;
                input[0].value = "";
            }
        });
    }).catch(error => {
        const msg = "Não foi possível acessar os itens.";
        elem.innerText = msg;
        elem.style.display = 'block';
    });
}

function createInventory(type){
    const inventory = {
        water: document.getElementsByName(type+'.water')[0].value,
        food: document.getElementsByName(type+'.food')[0].value,
        medication: document.getElementsByName(type+'.medication')[0].value,
        ammunition: document.getElementsByName(type+'.ammunition')[0].value,
    }

    return filterEmptyValue(inventory);
}


function updatePointsLabel(type) {
    const values = getItemsValues();
    
    total = Object.keys(values).reduce((acc, key) => {
        let unit = document.getElementsByName(type+'.'+key)[0].value;
        unit = (unit) ? unit : 0;
        return acc + (unit * values[key]);
    }, 0);

    document.getElementById('ponto-'+type).innerText = total;
}

function getItemsValues() {
    return {water: 4, food: 3, medication: 2, ammunition:1};
}