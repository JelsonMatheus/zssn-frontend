(function startApp() {
    document.getElementById("survivorForm").addEventListener('submit', function(event) {
        event.preventDefault();
        salveSurvivor();
    });
})();


async function salveSurvivor() {
    api = new ApiSurvivor();
    data = createSurvivorData();
    try {
        const obj = await api.create(data);
        location.href = `../${obj.pk}/edit/`;
        
    } catch(error) {
        const msg = "Não foi possível realizar a operação."
        createToastify(msg, 'error');
    }
}

function createSurvivorData() {
    const form = document.getElementById("survivorForm");
    const dataFrom = new FormData(form);
    const obj = {inventory:{}}

    for (let [key, value] of dataFrom) {
        if (value === "") continue;

        if(key.includes('.')){
            const [key1, key2] = key.split('.')
            obj[key1][key2] = value;
        } else {
            obj[key] = value
        }
    }

    return obj;
}