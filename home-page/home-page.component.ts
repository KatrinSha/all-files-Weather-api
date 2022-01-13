import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, filter } from 'rxjs';
import { WeatherService } from "../weather.service";



@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  
  city = [];
  weatherData = {
    temperatureCelsius: 0,
    atmosphericPressurehPa: 0,
    humidity: 0,
    windSpeed: 0,
    windDirection: 0,
    weatherIcon: 0,
    forCity: '',
  }

  myImage: string = 'assets/images/';
  Data = new Date();
  Day = this.Data.getDate();
  Month = this.Data.getMonth();
  time = `${this.Day}.${this.Month + 1}`

  constructor(private http: HttpClient,private weatherService: WeatherService) { }

 
chooseCity() {
    this.weatherService.weatherFor(event);
  }

  onClick() {
    const domain = 'https://api.airvisual.com';
    const endPoint = '/v2/cities';
    const APIKey = '5e72b8e3-974b-4a07-a251-7fd73bbd3e90';
    const APIParams = {
      state: 'California',
      country: 'USA',
      key: APIKey,
    };

    const url = `${domain}${endPoint}`;


    this.http.get(url, { params: APIParams }).pipe(map((response: any) => response.data)).subscribe((list: any) => {
      this.city = list.map((el: any) => el.city);
    });
}



  ngOnInit() {
    const domain = 'https://api.airvisual.com';
    const endPoint = '/v2/nearest_city';
    const APIKey = '5e72b8e3-974b-4a07-a251-7fd73bbd3e90';
    const APIParams = {
      lon: '27.572680',
      lat: '53.907364',
      key: APIKey,
    };

    const url = `${domain}${endPoint}`;


    this.http.get(url, { params: APIParams })
      .subscribe((response: any) => {
        const { data: { current: { weather: { tp, pr, hu, ws, wd, ic } }, city } } = response;
        this.weatherData = {
          temperatureCelsius: tp,
          atmosphericPressurehPa: pr,
          humidity: hu,
          windSpeed: ws,
          windDirection: wd,
          weatherIcon: ic,
          forCity: city,
        }
      });
    }

}
