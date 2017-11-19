import { Component, OnInit } from '@angular/core';
import { IOrder } from '../../models/order';
import { IClient } from '../../models/client';
import { LocalStorageService } from '../../local-storage.service';
import { OrderCalcService } from '../order-calc.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-orders-form',
  templateUrl: './orders-form.component.html',
  styleUrls: ['./orders-form.component.scss']
})
export class OrdersFormComponent implements OnInit {
  currentOrder: IOrder;
  orders: IOrder[];
  clients: IClient[];

  constructor(
    private lsService: LocalStorageService,
    public orderCalcService: OrderCalcService
  ) { }

  ngOnInit() {
    this.syncLocalOrders();
    this.getClients();
    this.initCurrentOrder();
  }

  syncLocalOrders() {
    this.lsService.orders.subscribe(data => this.orders = data);
  }

  getClients() {
    this.clients = this.lsService.getFromLocalStorage(this.lsService.clientArrKey);
    console.log(this.clients);
  }

  initCurrentOrder() {
    this.currentOrder = {
      client: null,
      paid: false,
      shippingDate: '',
      weapons: {
        tanks: 0,
        jets: 0,
        rockets: 0,
        lightArms: 0
      }
    };
  }

  //// ===================== Save Order ===================================

  saveOrder() {
    this.unshiftOrderToList();
    this.updateClientAnnualSales();
    this.saveOrdersToLS();
    this.saveClientsToLS();
    this.updateServiceClients();
  }

  unshiftOrderToList() {
    const orderDeepCopy = this.prepCurrentOrder();
    this.orders.unshift(this.currentOrder);
    this.initCurrentOrder();
  }

  prepCurrentOrder() {
    const orderDeepCopy = _.cloneDeep(this.currentOrder);
    return orderDeepCopy;
  }

  saveOrdersToLS() {
    this.lsService.setToLocalStorage(this.lsService.orderArrKey, this.orders);
  }

  saveClientsToLS() {
    this.lsService.setToLocalStorage(this.lsService.clientArrKey, this.clients);
  }

  updateServiceClients() {
    this.lsService.setServiceClients(this.lsService.clientArrKey);
  }

  updateClientAnnualSales() {
    const lastUnshiftedClient = _.first(this.orders).client;
    const totalSales = this.orderCalcService.getTotalSales(lastUnshiftedClient, this.orders );
    const targetClientIndex = this.clients.indexOf(lastUnshiftedClient);
    console.log('totalSales', totalSales);
    console.log('targetClientIndex', targetClientIndex);

    this.clients[targetClientIndex].annualSales = totalSales;
    console.log(this.clients);
  }

} // end of component

