/*import React, { Component, ReactDOM } from "react";
import axios from "axios";
import ApexCharts from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
*/
class MonthIncomeItemized extends React.Component {



    constructor(props) {
        super(props);
        let findHeight = 100;

        const width = window.innerWidth;
        let legendWidth = 500;

        if (width < 768) {
            findHeight = 250;
            legendWidth = 435;
        } else {
            findHeight = 100;

        }


        this.state = {
            series: [],
            total: 0, dataLabels: {
                enabled: false,
            },
            options: {

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
            },
        };
        this.updatePie = this.updatePie.bind(this);

    }


    updatePie = () => {






        let tempTotal = 0;
        let amounts = this.props.amounts
        for (let i = 0; i < amounts.length; i++) {
            tempTotal = tempTotal + amounts[i];
        }
        this.setState({
            total: tempTotal,
            series: amounts,
            options: {
                labels: this.props.labels,
            }
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.options.labels !== this.props.labels && this.props.amounts !== this.state.series) {

            this.updatePie();
        }
    }

    render() {

        return (
            <div id="chart">
                <ReactApexChart options={this.state.options} series={this.props.amounts} type="donut" width={600} />
                {this.state.total !== 0 ? <label className="capitalize mx-5">{this.props.inOut} total: ${this.state.total}</label> : null}
            </div>
        );
    }
}



export default MonthIncomeItemized;
