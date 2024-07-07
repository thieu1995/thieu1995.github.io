
document.addEventListener('DOMContentLoaded', function() {
    // Now you can use jsonData variable

    const yearsList = [];
    const numOfPapers = [];

    let n_journals = 0;
    let n_conf = 0;
    let n_others = 0;

    let n_isi_q1 = 0;
    let n_isi_q2 = 0;
    let n_isi_q3 = 0;
    let n_scopus = 0;
    let n_unknown = 0;

    for (let i = jsonData.length - 1; i >= 0; i--) {
        let item = jsonData[i]
        yearsList.push(item.year);
        numOfPapers.push(item.data.length);

        for (let j = 0; j < item.data.length; j++) {
            if (item.data[j].magazine_type === "journal") {
                n_journals += 1
            } else if (item.data[j].magazine_type === "conference") {
                n_conf += 1
            } else {
                n_others += 1
            }

            if (item.data[j].paper_type === "ISI") {
                if (item.data[j].magazine_rank === "Q1") {
                    n_isi_q1 += 1
                } else if (item.data[j].magazine_rank === "Q2") {
                    n_isi_q2 += 1
                } else if (item.data[j].magazine_rank === "Q3") {
                    n_isi_q3 += 1
                } else {
                    n_unknown += 1;
                }
            } else if (item.data[j].paper_type === "Scopus") {
                n_scopus += 1
            } else {
                n_unknown += 1;
            }
        }
    }

    // Paper per year chart
    const ppyc = document.getElementById('paper_per_year_chart');
    new Chart(ppyc, {
        type: 'bar',
        data: {
            labels: yearsList,
            datasets: [{
                label: '# of Papers',
                data: numOfPapers,
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

    // Total journal and other paper chart
    const tjpc = document.getElementById('total_journal_and_other_chart');
    new Chart(tjpc, {
        type: 'pie',
        data: {
            labels: [
                'Journal',
                'Conference',
                'Others'
            ],
            datasets: [{
                label: '# of Papers',
                data: [n_journals, n_conf, n_others],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ],
                hoverOffset: 4
            }]
        }
    });

    // Total paper ranking chart
    const tprc = document.getElementById('total_paper_ranking_chart');
    new Chart(tprc, {
        type: 'pie',
        data: {
            labels: [
                'ISI-Q1',
                'ISI-Q2',
                'ISI-Q3',
                'Scopus',
                "Others"
            ],
            datasets: [{
                label: '# of Papers',
                data: [n_isi_q1, n_isi_q2, n_isi_q3, n_scopus, n_unknown],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(75, 192, 192)',
                    'rgb(255, 205, 86)',
                    'rgb(54, 162, 235)',
                    'rgb(201, 203, 207)'
                ],
                hoverOffset: 4
            }]
        }
    });




    // Use jsonData with your visualization library
    // Example: using D3.js or any other library
    // d3.json(jsonData).then(function(data) {
    //   // Visualization code here
    // });
});
