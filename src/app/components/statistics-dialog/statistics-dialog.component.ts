import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as d3 from 'd3';

interface IChartData {
  GuessAmount: string;
  Frequency: number;
}

type guessAmount = {[guessAmount: number]: number} 

const initialChartData: IChartData[] = [
  {GuessAmount: "1", Frequency: 0},
  {GuessAmount: "2", Frequency: 0},
  {GuessAmount: "3", Frequency: 0},
  {GuessAmount: "4", Frequency: 0},
  {GuessAmount: "5", Frequency: 0},
  {GuessAmount: "6", Frequency: 0},
];

@Component({
  selector: 'app-statistics-dialog',
  templateUrl: './statistics-dialog.component.html',
  styleUrls: ['./statistics-dialog.component.scss']
})
export class StatisticsDialogComponent implements OnInit {
  public winPercentage!: string;

  private chartData: IChartData[] = [];

  private svg: any;
  private chartMargin = 50;
  private chartWidth = 350;
  private chartHeight = 200;

  /** calculated using the largest guess frequency rounded to next number divisible by 10 */
  private maxYAxisPoint: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { 
      gamesPlayed: string, 
      gamesWon: string, 
      winStreak: string,
      maxStreak: string,
      guessAmountForWin: guessAmount
    }
  ) {}

  ngOnInit(): void {
    const { gamesWon, gamesPlayed, guessAmountForWin, winStreak, maxStreak } = this.data;

    let calc;
    if(Number(gamesPlayed) === 0) {
      calc = 0;
    } else {
      calc = Math.round((Number(gamesWon) / Number(gamesPlayed)) * 100);
    }

    this.winPercentage = calc.toString() + "%";

    this.setChartData(guessAmountForWin)

    this.createSvg();
    this.drawBars(this.chartData);
  }

  private setChartData(guessAmountForWin: guessAmount) {
    let maxVal = 0;
    this.chartData = initialChartData.map(data => {
      const guessAmount = Number(data.GuessAmount);
      const guessFrequency = guessAmountForWin[guessAmount];

      // find largest value for display of y-axis in the chart
      if(guessFrequency > maxVal) maxVal = guessFrequency;

      return {
        ...data,
        Frequency: guessFrequency ?? 0
      };
    })

    /** sets the last point on the chart's y axis */
    this.maxYAxisPoint = Math.trunc(maxVal / 10) * 10 + 10;
  
    if(this.maxYAxisPoint > 30) this.chartHeight = 300;
  }

  private createSvg(): void {
    this.svg = d3.select("#barchart")
      .append("svg")
      .attr("width", this.chartWidth + (this.chartMargin * 2))
      .attr("height", this.chartHeight + (this.chartMargin * 2))
      .append("g")
      .attr("transform", "translate(" + this.chartMargin + "," + this.chartMargin + ")");
  }

  private drawBars(data: any[]): void {
    // Create the X-axis band scale
    const x = d3.scaleBand()
      .range([0, this.chartWidth])
      .domain(data.map(d => d.GuessAmount))
      .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg.append("g")
      .attr("transform", "translate(0," + this.chartHeight + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
      .domain([0, this.maxYAxisPoint])
      .range([this.chartHeight, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
      .call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg.selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d: any) => x(d.GuessAmount))
      .attr("y", (d: any) => y(d.Frequency))
      .attr("width", x.bandwidth())
      .attr("height", (d: any) => this.chartHeight - y(d.Frequency))
      .attr("fill", "#3a3a3c");
  }
}
