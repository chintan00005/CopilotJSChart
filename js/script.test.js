const { JSDOM } = require('jsdom');
const dom = new JSDOM();
global.document = dom.window.document;
global.window = dom.window;

// Mock Chart object
global.Chart = jest.fn();

document.body.innerHTML = `
    <input id="january-income" value="500">
    <input id="january-expense" value="300">
    <input id="february-income" value="600">
    <input id="february-expense" value="400">
    <button class="btn btn-primary">Download</button>
    <canvas id="myChart"></canvas>
`;

const { updateChartData } = require('./script');


describe('updateChartData', () => {
    test('updates chart data correctly', () => {
        // Mock chart instance
        const myChart = {
            data: {
                datasets: [{ data: [] }, { data: [] }]
            },
            update: jest.fn()
        };

        // Mock Chart constructor to return the mock chart instance
        global.Chart.mockImplementation(() => myChart);

        // Call updateChartData function
        updateChartData(myChart);

        // Check if chart data was updated correctly
        expect(myChart.data.datasets[0].data).toEqual(['500', '600']);
        expect(myChart.data.datasets[1].data).toEqual(['300', '400']);

        // Check if chart was updated
        expect(myChart.update).toHaveBeenCalled();
    });
});