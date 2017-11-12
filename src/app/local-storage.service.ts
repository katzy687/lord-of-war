import { Injectable } from '@angular/core';
import { IClient } from './models/client';
import { IOrder } from './models/order';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LocalStorageService {
  clientArrKey = 'clientArr';
  orderArrKey = 'orderArr';
  clients = new BehaviorSubject<IClient[]>(this.getFromLocalStorage(this.clientArrKey));
  orders = new BehaviorSubject<IOrder[]>(this.getFromLocalStorage(this.orderArrKey));

  constructor() { }

  //// ===================== observable functionality ===================================
  // behavior subject does not even need next call to update
  // will leave functions around in case they become useful

  // to update the subject
  setServiceClients(lsKey) {
    this.changeClients(this.getFromLocalStorage(lsKey));
  }

  changeClients (value) {
    this.clients.next(value);
  }

  //// ===================== core local storage functions===================================
  
  setToLocalStorage(keyName: string, itemToStore: any) {
    // clear out key first to avoid duplicates
    localStorage.removeItem(keyName);

    // then stringify and store
    const stringifiedItem = JSON.stringify(itemToStore, null, 2);
    localStorage.setItem(keyName, stringifiedItem);
  }

  getFromLocalStorage(keyName: string) {
    if (keyName in localStorage) {
      const parsedJSON = JSON.parse(localStorage.getItem(keyName));
      return parsedJSON;
    } else {
      return [];
    }
  }

  
}
