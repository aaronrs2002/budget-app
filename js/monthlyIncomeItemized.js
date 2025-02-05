/*import React, { Component, ReactDOM } from "react";
import axios from "axios";
import ApexCharts from 'apexcharts';
import ReactApexChart from 'react-apexcharts';

class MonthIncomeItemized extends React.Component {



    constructor(props) {
        super(props);*/

let globalListA;
let globalListB;
let findHeight = 100;

const width = window.innerWidth;
let legendWidth = 500;

if (width < 768) {
    findHeight = 250;
    legendWidth = 435;
} else {
    findHeight = 100;

}


let currentChartData = {
    series: [],
    chart: {
        type: 'donut',
        total: 0, dataLabels: {
            enabled: false,
        },


        chart: {
            width: '100%',
        },
        legend: {
            show: true,
            showForSingleSeries: false,
            showForNullSeries: true,
            showForZeroSeries: true,
            position: 'bottom',
            horizontalAlign: 'left',
            floating: false,
            formatter: undefined,
            inverseOrder: false,
            width: legendWidth,
            height: findHeight,
            tooltipHoverFormatter: undefined,
            customLegendItems: [],
            offsetX: 15,
            offsetY: 0,
            labels: {
                colors: undefined,
                useSeriesColors: false
            },
            markers: {
                width: 12,
                height: 12,
                strokeWidth: 0,
                strokeColor: '#fff',
                fillColors: undefined,
                radius: 12,
                customHTML: undefined,
                onClick: undefined,
                offsetX: 0,
                offsetY: 0
            },
            itemMargin: {
                horizontal: 2,
                vertical: 0
            },
            onItemClick: {
                toggleDataSeries: true
            },
            onItemHover: {
                highlightDataSeries: true
            },
        },
        labels: [],
        plotOptions: {
            bar: {
                dataLabels: {
                    position: 'bottom'
                }
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 300,
                    horizontalAlign: 'left',
                    offsetX: 0,
                    offsetY: 0,

                },
                legend: {
                    width: 300,
                    position: 'bottom',
                    horizontalAlign: 'left',
                    offsetX: 0,
                    offsetY: 0,
                }
            }
        }],
        plotOptions: {
            pie: {
                customScale: 1,
                labels: false
            }
        }

    }
};
/*  this.updatePie = this.updatePie.bind(this);
 
}*/


updatePie = (listA, listB) => {

    globalListA = listA;
    globalListB = listB;

    let listAHTML = "";
    let listBHTML = "";
    let listATotal = 0;
    let listBTotal = 0;

    // console.log("listA[0].labels.length: " + listA[0].labels.length + " (typeof listA[0].labels): " + (typeof listA[0].labels))
    try {
        for (let i = 0; i < globalListA[0].labels.length; i++) {
            listAHTML = listAHTML + `<button onClick="transferFrom('listA', ${i})" class="list-group-item list-group-item-action">${globalListA[0].labels[i]}: $${globalListA[0].amounts[i]}</button>`;

            let newRevenue = globalListA[0].amounts[i] * 100;

            listATotal = listATotal * 100;
            listATotal = (newRevenue + listATotal) / 100;


        }
        document.getElementById("listATotal").innerHTML = listATotal.toFixed(2);


    } catch (error) {
        console.log("Nothing in listA: " + error)
    }

    try {
        for (let i = 0; i < globalListB[0].labels.length; i++) {
            listBHTML = listBHTML + `<button onClick="transferFrom('listB', ${i})" class="list-group-item list-group-item-action">${globalListB[0].labels[i]}: $${globalListB[0].amounts[i]}</button>`;

            let newExpense = globalListB[0].amounts[i] * 100;
            listBTotal = listBTotal * 100;
            listBTotal = (newExpense + listBTotal) / 100;

        }
        document.getElementById("listBTotal").innerHTML = listBTotal.toFixed(2);

    } catch (error) {

        console.log("Nothing in listB: " + error)
    }


    document.getElementById("listATarget").innerHTML = listAHTML;
    document.getElementById("listBTarget").innerHTML = listBHTML;



    // this.setState({
    // currentChartData.total = tempTotal,
    currentChartData.series = [listATotal, listBTotal]
    currentChartData.options = {
        labels: ["ListA", "listB"]
    }




    document.querySelector("#chart").innerHTML = "<div class='loader'></div>";
    setTimeout(() => {
        //  console.log("JSON.stringify(currentChartData): " + JSON.stringify(currentChartData));
        document.querySelector("#chart").innerHTML = "";
        var chart = new ApexCharts(document.querySelector("#chart"), currentChartData);
        chart.render();
    }, 1000);
    // });
}



const transferFrom = (aToB, whichNum) => {

    let tempA = [{ "amounts": [], "labels": [] }];
    let tempB = [{ "amounts": [], "labels": [] }];

    if (aToB === "listA") {

        for (let i = 0; i < globalListA[0].labels.length; i++) {

            if (i !== whichNum) {
                tempA[0].labels.push(globalListA[0].labels[i]);
                tempA[0].amounts.push(globalListA[0].amounts[i]);

            } else {
                tempB[0].labels = [...globalListB[0].labels, globalListA[0].labels[i]];
                tempB[0].amounts = [...globalListB[0].amounts, globalListA[0].amounts[i]];

            }
        }



    }
    if (aToB === "listB") {

        for (let i = 0; i < globalListB[0].labels.length; i++) {
            if (i !== whichNum) {
                tempB[0].labels.push(globalListB[0].labels[i]);
                tempB[0].amounts.push(globalListB[0].amounts[i]);
            } else {
                tempA[0].labels = [...globalListA[0].labels, globalListB[0].labels[i]];
                tempA[0].amounts = [...globalListA[0].amounts, globalListB[0].amounts[i]];
            }
        }




    }
    document.getElementById("listATarget").innerHTML = "";
    document.getElementById("listBTarget").innerHTML = "";

    updatePie(tempA, tempB);
}







/*
 componentDidUpdate(prevProps, prevState) {
     if (currentChartData.options.labels !== this.props.labels && this.props.amounts !== currentChartData.series) {

         this.updatePie();
     }
 }

render() {

     return (
         <div id="chart">
             <ReactApexChart options={currentChartData.options} series={this.props.amounts} type="donut" width={600} />
             {currentChartData.total !== 0 ? <label className="capitalize mx-5">{this.props.inOut} total: ${currentChartData.total}</label> : null}
         </div>
     );
 }
}*/



//export default MonthIncomeItemized;
