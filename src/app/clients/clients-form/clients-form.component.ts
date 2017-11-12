import { Component, OnInit, AfterViewInit } from '@angular/core';
import { countryArr } from '../../../assets/data/countries';
import { CountryService } from '../../country.service';
import { LocalStorageService } from '../../local-storage.service';
import { IClient } from '../../models/client';
import { ICountry } from '../../models/country';
import * as _ from 'lodash';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-clients-form',
  templateUrl: './clients-form.component.html',
  styleUrls: ['./clients-form.component.scss']
})
export class ClientsFormComponent implements OnInit {
  countries: ICountry[];
  currentClient: IClient;
  clients: IClient[];

  constructor(
    private countryService: CountryService,
    private lsService: LocalStorageService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.initCurrentClient();

    // for use in country picker dropdown
    this.loadCountries();
    
    // subscribe to service clients array
    this.syncLocalClients();
  }

  initCurrentClient () {
    this.currentClient = {
      country: null,
      currentLeader: '',
      annualSales: 0
    };
  }

  loadCountries() {
    this.countryService.getCountries().subscribe(
      (data) => {
        this.countries = data;
      }
    );
  }

  syncLocalClients() {
    this.lsService.clients.subscribe(data => this.clients = data);
  }

  //// ===================== Save Clients to Storage ===================================
  

  addClientsToStorage() {
    const clientCopy = this.prepCurrentClient();
    const pushedResponse = this.pushToLocalClients(clientCopy);

    // if it's not the same country, then update local storage
    if (pushedResponse) {
      this.lsService.setToLocalStorage(this.lsService.clientArrKey, this.clients);
    }
    this.clearFields();
  }

  prepCurrentClient() {
    const clientDeepCopy = _.cloneDeep(this.currentClient);
    return clientDeepCopy;
  }

  pushToLocalClients (clientCopy) {
    const arrIsEmpty = this.clients.length === 0;
    const hasCopies = this.validateNewClient();

    if (arrIsEmpty) {
      this.clients.push(clientCopy);
      return true;
    } else if (!arrIsEmpty && !hasCopies) {
      this.clients.push(clientCopy);
      return true;
    } else if (hasCopies) {
      this.showWarning('Client already exists!');
      return false;
    }
  }

  validateNewClient() {
    return this.clients.some((client) => {
      return client.country.code === this.currentClient.country.code;
    });
  }

  //// ===================== helpers ===================================
  
  clearFields() {
    this.currentClient.country = null;
    this.currentClient.currentLeader = '';
  }

  showWarning(message) {
    this.snackBar.open(message, null, {
      duration: 3000
    });
  }

}
