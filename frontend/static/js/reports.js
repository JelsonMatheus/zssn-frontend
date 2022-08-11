(function startApp() {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawCharts);
})();

async function drawCharts() {
    infectedChart();
    avgChart();
}

async function infectedChart() {
    const api = new ApiSurvivor()
    const infected = await api.reportInfected();
    const uninfected = await api.reportUninfected();
    const lostpoints = await api.reportLostPoints();

    document.getElementById('uninfectedValue').innerText = uninfected.uninfected;
    document.getElementById('infectedValue').innerText = infected.infected;
    document.getElementById('lostPointValue').innerText = lostpoints.lost_points;

    const draw = () => {
        const data = new google.visualization.DataTable();
        data.addColumn('string', 'Element');
        data.addColumn('number', 'Percentage');
        data.addRows([
            ['Não Infectados', uninfected.percentage],
            ['Infectados', infected.percentage],
        ]);

        const chart = new google.visualization.PieChart(document.getElementById('infectedChart'));
        const options = {
            legend: 'none',
            title: 'Porcentagem de infectados e não infectados.',
            titleTextStyle: {fontSize: 14}
        };

        chart.draw(data, options);
    }

    draw();
    window.addEventListener('resize', draw);
}

async function avgChart() {
    const api = new ApiSurvivor()
    const resourceAvg = await api.reportAvgResources();

    const draw = () => {
        const data = new google.visualization.arrayToDataTable([
            ['Element', 'Média', { role: 'style' }],
            ['Água', resourceAvg.avg_water, ' #76d7c4 '],
            ['Alimentação', resourceAvg.avg_food, '#f0b27a'],
            ['Medicação', resourceAvg.avg_medication, '#85929e'],
            ['Munição', resourceAvg.avg_ammunition, '#ec7063 '],
        ]);
        const chart = new google.visualization.ColumnChart(document.getElementById('avgChart'));
        const options = {
            bar: {groupWidth: "80%"},
            legend: 'none',
            title: 'Média de recursos por sobreviventes não infectados',
            titleTextStyle: {fontSize: 14}
        };

        chart.draw(data, options);
    }
    
    draw();
    window.addEventListener('resize', draw);
}