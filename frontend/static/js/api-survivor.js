class ApiSurvivor extends ApiBase {

    async list() {
        const endpoint = 'survivors/';
        return this.get(endpoint);
    }

    async create(data) {
        const endpoint = 'survivors/';
        return this.post(endpoint, data);
    }

    async update(data, pk) {
        const endpoint = `survivors/${pk}/`;
        return this.patch(endpoint, data);
    }

    async show(pk) {
        const endpoint = `survivors/${pk}/`;
        return this.get(endpoint);
    }

    async showInventory(pk) {
        const endpoint = `survivors/${pk}/inventory/`;
        return this.get(endpoint);
    }
}