// Get the download button
var downloadButton = document.querySelector('.btn.btn-primary');

// Add click event listener to download button
downloadButton.addEventListener('click', function() {
    // Convert chart to data URL
    var url = myChart.toBase64Image();

    // Create a link element
    var link = document.createElement('a');
    link.href = url;

    // Set the download attribute of the link
    link.download = 'chart.png';

    // Trigger the download by programmatically clicking the link
    link.click();
});
var ctx = document.getElementById('myChart').getContext('2d');
var labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Get all income and expense input elements
var incomeInputs = document.querySelectorAll('input[id$="-income"]');
var expenseInputs = document.querySelectorAll('input[id$="-expense"]');

// Function to update chart data
function updateChartData(chart) {
    incomeData = Array.from(incomeInputs).map(input => input.value);
    expenseData = Array.from(expenseInputs).map(input => input.value);

    chart.data.datasets[0].data = incomeData;
    chart.data.datasets[1].data = expenseData;

    chart.update();
}

// Add event listeners to all income and expense inputs
incomeInputs.forEach(input => input.addEventListener('input', () => updateChartData(myChart)));
expenseInputs.forEach(input => input.addEventListener('input', () => updateChartData(myChart)));

var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: 'Income',
            data: incomeInputs,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }, {
            label: 'Expense',
            data: expenseInputs,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

module.exports = { updateChartData };