import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import RequestTypes from './api-rest.constants';
import { environment } from '../../../environments/environment';

const host = environment.host;

@Injectable({
  providedIn: 'root'
})
export default class ApiRestService {

  constructor(
    private http: HttpClient
  ) {}

  public request<T>(requestType: RequestTypes ,endPoint: string, body?: any, options?: any): Observable<T> {
    let response: Observable<T>;
    if(body && options){
      // post, put and patch
      response = this.http[RequestTypes[requestType]]<T>( this.getUrl(endPoint), body, options);
    } else if(body) {
      // post, put and patch if options is empty
      response = this.http[RequestTypes[requestType]]<T>( this.getUrl(endPoint), body);
    } else if(options) {
      // get, delete, head and options
      response = this.http[RequestTypes[requestType]]<T>( this.getUrl(endPoint), options);
    } else {
      response = this.http[RequestTypes[requestType]]<T>( this.getUrl(endPoint));
    }
    return response;
  }

  private getUrl(endPoint: string){
    return `${host}/${endPoint}`;
  }
}
