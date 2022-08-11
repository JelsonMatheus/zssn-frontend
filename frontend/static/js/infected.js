(function startApp() {
    loadSurvivors();

    document.getElementById('survivorForm')
        .addEventListener('submit', function(event) {
            event.preventDefault();
            save();
    })

})();

function save() {
    const api = new ApiSurvivor();
    const informant = document.getElementById('informant').value;
    const infected = document.getElementById('infected').value;

    const data = {informant: informant, infected: infected}

    if(informant == infected) {
        const msg = "O informante não pode ser igual ao infectado!";
        createToastify(msg, 'error');
        return;
    }

    api.reportContamination(data).then(() => {
        const msg = "Dados salvos com sucesso!";
        createToastify(msg, 'succes');
    }).catch(error => {
        createToastify(error.message, 'error');
    });

}



function loadSurvivors() {
    const api = new ApiSurvivor();
    const informant = document.getElementById('informant');
    const infected = document.getElementById('infected');

    informant.innerHTML = "";
    infected.innerHTML = "";

    api.list().then(data => {
        data.forEach(elem => {
            informant.innerHTML += createOptionsSelect(elem);
            infected.innerHTML += createOptionsSelect(elem);
        });
    });
}

function createOptionsSelect(survivor) {
    return `<option value=${survivor.pk}>${survivor.name}</option>`;
}