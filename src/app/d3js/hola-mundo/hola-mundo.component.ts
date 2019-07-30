import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-hola-mundo',
  templateUrl: './hola-mundo.component.html',
  styleUrls: ['./hola-mundo.component.scss']
})
export class HolaMundoComponent implements OnInit {

  @ViewChild('hola')
  private saludo: ElementRef;

  // no decalrar elementos D3 en el cosntructor
  constructor() { }

  ngOnInit() {
    const elemento = this.saludo.nativeElement;
    d3.select(elemento).attr('class', 'hola').append('p').attr('class', 'hola').text('Hola mundo desde D3.js');
  }

}
