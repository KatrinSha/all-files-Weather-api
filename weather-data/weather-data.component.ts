import { Component, OnInit } from '@angular/core';
import { WeatherService } from "../weather.service";

@Component({
  selector: 'app-weather-data',
  templateUrl: './weather-data.component.html',
  styleUrls: ['./weather-data.component.scss'],
})
export class WeatherDataComponent implements OnInit {
  constructor(private weatherService: WeatherService) {}
  myImage: string = 'assets/images/';
  Data = new Date();

  weatherData = {
    temperatureCelsius: 0,
    atmosphericPressurehPa: 0,
    humidity: 0,
    windSpeed: 0,
    windDirection: 0,
    weatherIcon: 0,
    forCity: '',
  };

  ngOnInit() {
    this.weatherService.subject.subscribe((obj) => {
      this.weatherData = {
        forCity: obj.forCity,
        temperatureCelsius: obj.temperatureCelsius,
        atmosphericPressurehPa: obj.atmosphericPressurehPa,
        humidity: obj.humidity,
        windSpeed: obj.windSpeed,
        windDirection: obj.windDirection,
        weatherIcon: obj.weatherIcon,
      };
    });
  }
}
