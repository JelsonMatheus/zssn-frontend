class ApiSurvivor extends ApiBase {

    async list() {
        const endpoint = 'survivors/';
        return await this.get(endpoint);
    }

    async create(data) {
        const endpoint = 'survivors/';
        return await this.post(endpoint, data);
    }
}