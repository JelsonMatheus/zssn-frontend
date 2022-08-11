class ApiSurvivor extends ApiBase {

    async list(params=null) {
        const endpoint = 'survivors/';
        return this.get(endpoint, params);
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

    async reportContamination(data) {
        const endpoint = 'report-contamination/';
        return this.post(endpoint, data);
    }

    async trade(data) {
        const endpoint = 'trades/';
        return this.post(endpoint, data);
    }

    async reportInfected() {
        const endpoint = 'reports/infected/';
        return this.get(endpoint);
    }

    async reportUninfected() {
        const endpoint = 'reports/uninfected/';
        return this.get(endpoint);
    }

    async reportAvgResources() {
        const endpoint = 'reports/avg-resources/';
        return this.get(endpoint);
    }

    async reportLostPoints() {
        const endpoint = 'reports/lost-points/';
        return this.get(endpoint);
    }
}