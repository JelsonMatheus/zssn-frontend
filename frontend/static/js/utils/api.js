class ApiBase {

    constructor() {
        this.base_url = "https://zssn-api.herokuapp.com/api/v1/";
        this.headers = {
            'Content-Type': "application/json"
        }
        this.spinner = new bootstrap.Modal(document.getElementById("spinner"));
    }

    async get(url, params) {
        const unit = {
            method: 'GET',
            headers: this.headers,
            mode: 'cors'
        }
        return this.request(url, unit, params);
    }

    async post(url, data) {
        const init = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: this.headers,
            mode: 'cors'
        }
        return this.request(url, init);
    }

    async patch(url, data) {
        const init = {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: this.headers,
            mode: 'cors'
        }
        return this.request(url, init);
    }

    async request(url, init, params=null) {
        const path = this.base_url + url +this.getParams(params);
        this.spinner.show();

        return fetch(path, init)
            .then(response => this.handleErrors(response))
            .then(responseJson => responseJson)
            .finally(() => this.spinner.hide());
    }

    handleErrors(response) {
        if (!response.ok) {
            const error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
        return response.json();
    }

    getParams(params=null) {
        return (params) ? ("?" + new URLSearchParams(params)) : "";
    }
}