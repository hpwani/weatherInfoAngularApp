import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  weatherForm: FormGroup;
  weatherData: any;

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.weatherForm = this.fb.group({
      cityName: [{ value: '', disabled: false }, Validators.compose(
        [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]
      )]
    });
  }

  searchWeather(cityName) {
    this.getWeatherData(cityName.cityName);
  }

  getWeatherData(cityName) {
    this.sharedService.getWeatherData(cityName).subscribe(data => {
      this.weatherData = data;
      this.weatherForm.reset();
      this.toastr.success('Weather Data Getting Successfully!', 'Success');
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        // Client side or network error occurred.
        this.toastr.error(err.error.message, 'Error');
      } else {
        // Backend error 404, 500, etc
        this.toastr.error(err.statusText, 'Error');
      }
    });
  }


}
