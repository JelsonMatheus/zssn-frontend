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
        createToastify(msg);
    }
}

function templateRow(survivor, row) {
    const infected = (survivor.is_infected) ? "Sim" : "Não";
    console.table(survivor);
    const id = survivor.pk;
    const template =
    `<tr>
        <td>${row}</td>
        <td>${survivor.name}</td>
        <td>${survivor.age}</td>
        <td>${survivor.gender}</td>
        <td>${survivor.latitude}°N ${survivor.longitude}°S</td>
        <td>${infected}</td>
        <td>
            <a href="${id}/edit/" class="text-decoration-none">
                <i class="bi bi-pencil-square"></i>
            </a>
        </td>
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