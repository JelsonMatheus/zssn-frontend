class Survivor {

    constructor() {
        this.client = new Client();
    }

    async listSurvivors() {
        const data = await this.client.get("survivors/");
        const bodyTable = document.getElementById("survivorList");
        bodyTable.innerHTML = "";

        data.forEach((element, index) => {
            bodyTable.innerHTML += this.templateRow(element, index+1);
        });
    }

    templateRow(survivor, row) {
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
}

new Survivor().listSurvivors();