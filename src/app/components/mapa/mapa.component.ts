import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export default class MapaComponent implements OnInit {

  @ViewChild('mapa', { static: true }) mapa: ElementRef;
  @Input() coords: string;
  latitude: number;
  longitude: number;

  constructor() { }

  ngOnInit() {
    const newCoords = this.coords.replace(' ', '').split(',');
    this.latitude = parseFloat(newCoords[0]);
    this.longitude = parseFloat(newCoords[1]);
    const map = new mapboxgl.Map({
      container: this.mapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.longitude, this.latitude],
      zoom: 15
    });
    new mapboxgl.Marker().setLngLat([this.longitude, this.latitude]).addTo(map);
    map.boxZoom.disable();
    map.doubleClickZoom.disable();
    map.keyboard.disable();
    map.touchPitch.disable();
    map.touchZoomRotate.disable();
    map.dragPan.disable();
    map.dragRotate.disable();
  }
}
