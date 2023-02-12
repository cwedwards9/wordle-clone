import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as d3 from 'd3';

@Component({
  selector: 'app-statistics-dialog',
  templateUrl: './statistics-dialog.component.html',
  styleUrls: ['./statistics-dialog.component.scss']
})
export class StatisticsDialogComponent implements OnInit {
  public winPercentage!: string;

  private chartData = [
    {"Amount": "1", "Frequency": "0"},
    {"Amount": "2", "Frequency": "2"},
    {"Amount": "3", "Frequency": "1"},
    {"Amount": "4", "Frequency": "7"},
    {"Amount": "5", "Frequency": "5"},
    {"Amount": "6", "Frequency": "6"},
  ];

  private svg: any;
  private margin = 50;
  private width = 350;
  private height = 200;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { 
      gamesPlayed: string, 
      gamesWon: string, 
      winStreak: string, 
      guessAmountForWin: Object 
    }
  ) {}

  ngOnInit(): void {
    console.log(this.data)
    const calc = Math.round((Number(this.data.gamesWon) / Number(this.data.gamesPlayed)) * 100);

    this.winPercentage = calc.toString() + "%";

    this.createSvg();
    this.drawBars(this.chartData);
  }

  private createSvg(): void {
    this.svg = d3.select("#barchart")
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawBars(data: any[]): void {
    // Create the X-axis band scale
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.Amount))
      .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
      .domain([0, 20])
      .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
      .call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg.selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d: any) => x(d.Amount))
      .attr("y", (d: any) => y(d.Frequency))
      .attr("width", x.bandwidth())
      .attr("height", (d: any) => this.height - y(d.Frequency))
      .attr("fill", "#3a3a3c");
  }
}
