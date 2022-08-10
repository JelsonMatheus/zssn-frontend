(function startApp() {
    showList();
})();


async function showList() {
    
    const apiSurvivor = new ApiSurvivor();
    try {
        const data = await apiSurvivor.list();
        const bodyTable = document.getElementById("survivorList");
        bodyTable.innerHTML = "";

        data.forEach((element, index) => {
            bodyTable.innerHTML += templateRow(element, index+1);
        });

        if(!data) {
            const msg = "Não existem sobreviventes cadastros."
            bodyTable.innerHTML += templateEmpyRow(msg);
        }

    } catch(error) {
        const msg = "Sistema indisponível.";
        Toastify({text: msg, className:"toast-danger", duration: 3000}).showToast();
    }
}

function templateRow(survivor, row) {
    const infected = (survivor.is_infected) ? "Sim" : "Não";
    const template =
    `<tr>
        <td>${row}</td>
        <td>${survivor.name}</td>
        <td>${survivor.age}</td>
        <td>${survivor.gender}</td>
        <td>${survivor.latitude}°N ${survivor.longitude}°S</td>
        <td>${infected}</td>
        <td><i class="bi bi-pencil-square"></i></td>
    <tr>`

    return template;
}

function templateEmpyRow(msg) {
    const template = 
    `<tr>
        <td colspan="7">${msg}</td>
    <tr>`
    return template;
}