class ApiSurvivor extends ApiBase {

    async list() {
        const endpoint = 'survivors/';
        return await this.get(endpoint);
    }

    async create(data) {
        const endpoint = 'survivors/';
        return await this.post(endpoint, data);
    }

    async update(data, pk) {
        const endpoint = `survivors/${pk}/`;
        return await this.patch(endpoint, data);
    }

    async show(pk) {
        const endpoint = `survivors/${pk}/`;
        return await this.get(endpoint);
    }

    async showInventory(pk) {
        const endpoint = `survivors/${pk}/inventory/`;
        return await this.get(endpoint);
    }
}