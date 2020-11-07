import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  baseUrl = "http://api.openweathermap.org/data/2.5/weather?";

  constructor(private http: HttpClient) { }

  /*==============Get Weather Data===========*/
  getWeatherData(cityName): Observable<any> {
    return this.http.get<any>(this.baseUrl, {
      responseType: 'json',
      headers: new HttpHeaders()
        .set('Accept', 'application/json'),
      params: new HttpParams()
        .set('q', cityName)
        .set('appid', '094aa776d64c50d5b9e9043edd4ffd00')
    });
  }

}
