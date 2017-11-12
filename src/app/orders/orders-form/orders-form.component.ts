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
    private orderCalcService: OrderCalcService
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
    this.pushOrderToList();
    this.updateClientAnnualSales();
    this.saveOrdersToLS();
    this.saveClientsToLS();
    this.updateServiceClients();
  }

  pushOrderToList() {
    this.orders.push(this.currentOrder);
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
    const lastPushedClient = _.last(this.orders).client;
    const totalSales = this.orderCalcService.getTotalSales(lastPushedClient, this.orders );
    const targetClientIndex = this.clients.indexOf(lastPushedClient);
    console.log('totalSales', totalSales);
    console.log('targetClientIndex', targetClientIndex);

    this.clients[targetClientIndex].annualSales = totalSales;
    console.log(this.clients);
  }

} // end of component

