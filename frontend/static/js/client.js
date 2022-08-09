class Client{

    constructor() {
        this.base_url = "https://zssn-api.herokuapp.com/api/v1/";
        this.headers = {
            'Content-Type': "application/json"
        }
        this.spinner = new bootstrap.Modal(document.getElementById("spinner"));
    }

    async get(url) {
        const unit = {
            method: 'GET',
            headers: this.headers,
            mode: 'cors'
        }
        const path = this.base_url + url;
        this.spinner.show();

        return fetch(path, unit)
            .then(response => response.json())
            .then(responseJson => {
                this.spinner.hide();
                return responseJson
            });
    }
}