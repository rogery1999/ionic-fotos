import { Photo } from '@capacitor/camera';
import { Position } from '@capacitor/geolocation';

export interface IGeolocationPosition {
  ok:         boolean;
  error?:     any;
  position?:  Position;
}

export interface IPhoto {
  ok:     boolean;
  photo?: Photo;
  error?: any;
}
