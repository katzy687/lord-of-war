import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { ICountry } from './models/country';

@Injectable()
export class CountryService {

  constructor(private http: HttpClient) { }

  getCountries() {
    return this.http.get<ICountry[]>('./assets/data/countries.json');
  }


}

