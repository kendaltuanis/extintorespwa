import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ext-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  users = [
    {nombre:"Elian Soto Benavides",empresa:"Mundo Mágico",producto:'1-Ext 10lbs 10,000<br> 2-Rp Ext 2.2lbs 12,000',telefono:"24740780-88987083"},
    {nombre:"Josué Villalobos Soto",empresa:"Musmamni",producto:'1-Ext 10lbs 10,000<br> 2-Rp Ext 2.2lbs 12,000',telefono:"24740780"},
    {nombre:"Carlos Umaña Castro",empresa:"Extreme Tech",producto:'1-Ext 10lbs 10,000<br> 2-Rp Ext 2.2lbs 12,000',telefono:"24740780"},
    {nombre:"Efren Fernandez Saborio",empresa:"UTN",producto:'1-Ext 10lbs 10,000<br> 2-Rp Ext 2.2lbs 12,000',telefono:"24740780"}
  ];
    

  constructor() { }

  ngOnInit() {
  }

}
