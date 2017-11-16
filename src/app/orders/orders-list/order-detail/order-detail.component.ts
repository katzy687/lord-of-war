import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { IOrder } from '../../../models/order';
import { OrderCalcService } from '../../order-calc.service';
import { LocalStorageService } from '../../../local-storage.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit, AfterViewInit {
  @Input() orders: IOrder[];
  @Input() orderIndex: number;
  @Input() selectedOrder: IOrder;


  weapons;

  constructor(
    private orderCalcService: OrderCalcService,
    private lsService: LocalStorageService
  ) { }

  ngOnInit() {
    this.initWeaponsList();
    console.log(this.weapons);
    // this.trackScroll();
  }

  ngAfterViewInit() {
    this.trackScroll();
  }

  trackScroll() {
    const appOrder = document.getElementsByTagName('app-order-detail')[0];
    window.addEventListener('scroll', () => {
      if (pageYOffset > 300) {
        console.log(pageYOffset);
        appOrder.style.position = 'fixed';
      } else if (pageYOffset < 300) {
        appOrder.style.position = 'absolute';
        
      }
    });
  }

  initWeaponsList() {
    if (this.selectedOrder) {
      this.weaponsObjectToArr(this.selectedOrder.weapons);
    }
  }

  weaponsObjectToArr(weapons) {
    if (weapons) {
      this.weapons = _.toPairs(weapons);
    } else {
      return;
    }
  }


}


