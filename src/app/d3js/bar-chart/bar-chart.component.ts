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
    // this.svgBarChart(this.barChartSVG.nativeElement, this.data2);
    this.cargarJSON('assets/data/datosPastel.json', this.barChart.nativeElement, this.svgPastel,
    { h: window.innerHeight, w: window.innerWidth});
  }

  onResize(event) {
    this.cargarJSON('assets/data/datosPastel.json', this.barChart.nativeElement, this.svgPastel,
    { h: event.target.innerHeight, w: event.target.innerWidth});
  }

  private svgPastel(selection: any, data: Array<any>, sizeWindow: { h: any, w: any }) {
    d3.select('svg').remove();
    const width = sizeWindow.w - 20;
    const height = 400;
    const radius = Math.min(width, height) / 2;
    const color = d3.scaleOrdinal()
      .range(['LimeGreen', 'RoyalBlue', 'SlateBlue', 'BlueViolet', 'OrangeRed', 'Yellow', 'Brown', 'DarkOrchid']);
    const arc = d3.arc().outerRadius(radius - 10).innerRadius(50);
    const pie = d3.pie().value( (d: any) => d.dato);
    const svg = d3.select(selection).append('svg').attr('width', width).attr('height',  height).style('border', '1px solid #aaa')
    .append('g').attr('transform', `translate(${width / 2}, ${height / 2})`);
    const g = svg.selectAll('.arc').data(pie(data)).enter().append('g').attr('class', 'arc');

    g.append<SVGPathElement>('path').attr('d', arc).style('fill', (d: any) => color(d.data.nombre));
    g.append('text').text((d: any) => `${d.data.nombre} (${d.data.dato})`)
    .attr('transform', (d: any) => {
      const a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
      const r = a > 90 ? a - 180 : a;
      return `translate(${arc.centroid(d)}), rotate(${r})`;
    }).style('text-anchor', 'middle');

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

  // tslint:disable-next-line: ban-types
  private cargarJSON(path: string, selection: any, grafica: Function, sizeWindow: { h: any, w: any }) {
    const leer = (data: any) => grafica(selection, data, sizeWindow);
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
