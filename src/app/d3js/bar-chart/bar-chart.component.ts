import { element } from 'protractor';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  @ViewChild('barChart')
  private barChart: ElementRef;

  @ViewChild('barChart2')
  private barChart2: ElementRef;

  @ViewChild('barChartSVG')
  private barChartSVG: ElementRef;

  private data: Array<number>;
  private data2: Array<number>;

  constructor() {
    this.data = [5, 10, 15, 20, 25, 50];
    this.data2 = [1, 2, 3, 5, 8, 11, 13, 21, 34, 55, 89, 144];
  }

  ngOnInit() {
    this.svgBarChart(this.barChartSVG.nativeElement, this.data2);
    this.cargarJSON('assets/data/barchart.json');
  }

  private svgBarChart(selection: any, data: Array<any>) {
    const w = 500;
    const h = 300;
    const rectanguloX = (d: any, i: any) => i * 25 + 30;
    const rectanguloH = (d: any) => d;
    const rectanguloY = (d: any) => h - d;
    const textoX = (d: any, i: any) => i * 25 + 40;
    const textoY = (d: any) => h - d - 3;
    const svg = d3.select(selection).append('svg').style('width', w).style('height', h).style('border', '1px solid #aaa');

    svg.selectAll('rect').data(data).enter()
      .append('rect').attr('x', rectanguloX).attr('y', rectanguloY).attr('width', 20).attr('height', rectanguloH)
      .style('fill', 'SteelBlue');
    svg.selectAll('text').data(data).enter().append('text').text(rectanguloH).attr('x', textoX).attr('y', textoY)
    .style('font-size', '10px').style('text-anchor', 'middle');
  }

  private cargarJSON( path: string) {
    const leer = (data: any) => console.log(data);
    d3.json(path).then(leer);
  }

  private barcharSimple(selection: any) {
    const x = d3.scaleLinear().domain([0, d3.max(this.data)]).range([0, d3.max(this.data)]);
    const width = (d: any) => `${x(d)}px`;
    const nombre = (d: any) => d;
    d3.select(selection).selectAll('div').data(this.data).enter().append('div').attr('class', 'bar').style('width', width).text(nombre);
  }

  private svgCirculos(selection: any) {
    const svg = d3.select(selection).append('svg');
    svg.style('width', '300px').style('height', '300px').style('border', '1px solid #aaa');

    this.data2.sort((a, b) => b - a);
    const circulos = svg.selectAll('circle').data(this.data2).enter().append('circle');
    circulos.attr('cx', (d, i) => (i * 10) + 25).attr('cy', 300 / 2).attr('r', (d: any) => d);
    circulos.style('fill', 'blue').style('stroke', 'orange').style('stroke-width', '5px');
  }

}
