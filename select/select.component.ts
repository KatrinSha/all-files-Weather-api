import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs';


@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  selectedCountry!: any;
  selectedState!: any;
  selectedCity!: any;

  country: any[] = [];
  state: any[] = [];
  city: any[] = [];

  countryName = '';
  stateName = '';

  isLoadingCountry = true;
  isLoadingState = true;
  isLoadingCity = true;

  APIKey:string = '5e72b8e3-974b-4a07-a251-7fd73bbd3e90';

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
  constructor(private http: HttpClient) { }

  ngOnInit() {
    const domain = 'https://api.airvisual.com';
    const endPoint = '/v2/countries';
    const APIParams = {
      key: this.APIKey,
    };
    const url = `${domain}${endPoint}`;
    this.http.get(url, { params: APIParams }).pipe(map((response: any) => response.data)).subscribe((list: any) => {
      this.country = list.map((el: any) => el.country); this.isLoadingCountry = false;
    });

    
    const domainLocal = 'https://api.airvisual.com';
    const endPointLocal = '/v2/nearest_city';
    const APIParamsLocal = {
      lon: '27.572680',
      lat: '53.907364',
      key: this.APIKey,
    };

    const urlLocal = `${domainLocal}${endPointLocal}`;

    this.http.get(urlLocal, { params: APIParamsLocal })
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

  weatherCountry($event: any) {
    const domain = 'https://api.airvisual.com';
    const endPoint = '/v2/states';
    this.countryName = $event;
    const APIParams = {
      country: this.countryName,
      key: this.APIKey,
    };
    console.log(this.countryName)
    const url = `${domain}${endPoint}`;

    this.http.get(url, { params: APIParams }).pipe(map((response: any) => response.data)).subscribe((list: any) => {
      this.state = list.map((el: any) => el.state); this.selectedState = []; this.selectedCity = []
        ;
    });
  }

  weatherState($event: any) {
    const domain = 'https://api.airvisual.com';
    const endPoint = '/v2/cities';

    this.stateName = $event;
    const APIParams = {
      country: this.countryName,
      state: this.stateName,
      key: this.APIKey,
    };
    const url = `${domain}${endPoint}`;
    console.log(this.stateName)
    this.http.get(url, { params: APIParams }).pipe(map((response: any) => response.data)).subscribe((list: any) => {
      this.city = list.map((el: any) => el.city); this.selectedCity = []
    });
  }

  weatherCity($event: any) {
    const domain = 'https://api.airvisual.com';
    const endPoint = '/v2/city';
    const citySelected = $event;
    const APIParams = {
      city: citySelected,
      state: this.stateName,
      country: this.countryName,
      key: this.APIKey,
    };

    const url = `${domain}${endPoint}`;
    console.log(citySelected)
    this.http.get(url, { params: APIParams }).subscribe((response: any) => {
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
    })
  }

}
