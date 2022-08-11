(function startApp() {
    showList();
})();


async function showList() {
    
    const apiSurvivor = new ApiSurvivor();
    apiSurvivor.list().then(data => {
        const bodyTable = document.getElementById("survivorList");
        bodyTable.innerHTML = "";
        console.log(data);

        data.forEach((element, index) => {
            bodyTable.innerHTML += templateRow(element, index+1);
        });

        if(data.length === 0) {
            const msg = "Não existem sobreviventes cadastros."
            bodyTable.innerHTML += templateEmpyRow(msg);
        }
    }).catch(error => {
        const msg = "Sistema indisponível.";
        createToastify(msg);
    });
}

function templateRow(survivor, row) {
    const infected = (survivor.is_infected) ? "Sim" : "Não";
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
    </tr>`

    return template;
}

function templateEmpyRow(msg) {
    const template = 
    `<tr>
        <td colspan="7">${msg}</td>
    <tr>`
    return template;
}