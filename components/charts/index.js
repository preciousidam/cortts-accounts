import React, {useEffect} from 'react';
import Chart from 'chart.js';

export function BarChart({data}){

    let myChart = null;

    const instatiateChart = _ => {
        const ctx = document.getElementById('barChart').getContext('2d');

         myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                datasets: [{
                    label: 'No of transactions',
                    barThickness: 20,
                    categoryPercentage: 0.5,
                    barPercentage: 0.5,
                    data: data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 1.0)',
                        'rgba(54, 162, 235, 1.0)',
                        'rgba(255, 206, 86, 1.0)',
                        'rgba(75, 192, 192, 1.0)',
                        'rgba(153, 102, 255, 1.0)',
                        'rgba(255, 159, 64, 1.0)',
                        'rgba(54, 162, 235, 1.0)',
                        'rgba(255, 206, 86, 1.0)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        gridLines: {
                            drawBorder: false,
                            //display: false,
                        },
                    }],
                    xAxes: [{
                        gridLines: {
                            display: false,
                        }
                    }]
                },
                responsive: true,
                maintainAspectRatio: false,
            }
        });
    }

    useEffect(
        () => {
            instatiateChart()
        },[]
    );

    return (
        <canvas id="barChart" aria-label="Chart Of Account" role="img"></canvas>
    );
}


export function PieChart({data}){

    let myChart = null;

    const instatiateChart = _ => {
        const ctx = document.getElementById('pieChart').getContext('2d');

         myChart = new Chart(ctx, {
            type: 'doughnut',
            circumference: 5 * Math.PI,
            data: {
                labels: ['Cre', 'Deb', 'Imp', ],
                datasets: [{
                    data: data,
                    backgroundColor: [
                        'rgba(37, 211, 102, 1.0)',
                        'rgba(54, 162, 235, 1.0)',
                        'rgba(255, 206, 86, 1.0)',
                        'rgba(255, 99, 132, 1.0)',
                        'rgba(75, 192, 192, 1.0)',
                        'rgba(153, 102, 255, 1.0)',
                        'rgba(255, 159, 64, 1.0)',
                        'rgba(54, 162, 235, 1.0)',
                        'rgba(255, 206, 86, 1.0)',
                    ],
                    borderColor: [
                        'rgba(37, 211, 102, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                
                responsive: true,
                maintainAspectRatio: false,
            }
        });
    }

    useEffect(
        () => {
            instatiateChart()
        },[]
    );

    return (
        <canvas id="pieChart" aria-label="Chart Of Account" role="img"></canvas>
    );
}