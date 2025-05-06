// Candidates Per Month Chart
const months = monthlyData.map(item => item[0]);
const monthCounts = monthlyData.map(item => item[1]);

new Chart(document.getElementById('candidatesPerMonthChart'), {
    type: 'bar',
    data: {
        labels: months,
        datasets: [{
            label: 'Candidates',
            data: monthCounts,
            backgroundColor: '#3498db'
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: { beginAtZero: true }
        }
    }
});

// Candidates by Department Chart
const deptLabels = departmentData.map(item => item[0]);
const deptCounts = departmentData.map(item => item[1]);

new Chart(document.getElementById('candidatesByDepartmentChart'), {
    type: 'pie',
    data: {
        labels: deptLabels,
        datasets: [{
            data: deptCounts,
            backgroundColor: ['#1abc9c', '#f39c12', '#9b59b6', '#e74c3c', '#2ecc71']
        }]
    },
    options: { responsive: true }
});

// Interview Success Rate Chart
const interviewLabels = interviewData.map(item => item[0]);
const interviewCounts = interviewData.map(item => item[2]);

new Chart(document.getElementById('interviewSuccessRateChart'), {
    type: 'bar',
    data: {
        labels: interviewLabels,
        datasets: [{
            label: 'Success Rate',
            data: interviewCounts,
            backgroundColor: ['#2ecc71', '#e74c3c']
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: { beginAtZero: true }
        }
    }
});

// Teaching Experience Pie Chart
const teachingLabels = teachingData.map(item => item[0] ? 'Yes' : 'No');
const teachingCounts = teachingData.map(item => item[1]);

new Chart(document.getElementById('teachingExperienceChart'), {
    type: 'pie',
    data: {
        labels: teachingLabels,
        datasets: [{
            data: teachingCounts,
            backgroundColor: ['#3498db', '#95a5a6']
        }]
    },
    options: { responsive: true }
});

const languages = languageData.map(item => item[0]);
    const counts = languageData.map(item => item[1]);
    new Chart(document.getElementById('languagesPopularityChart'), {
        type: 'line',
        data: {
            labels: languages,
            datasets: [{
                label: 'Languages Popularity',
                data: counts,
                backgroundColor: '#3498db',
                borderColor: '#2980b9',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
