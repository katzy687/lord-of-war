import { Component, Inject, OnInit, Input } from '@angular/core';
import { IOrder } from '../../../models/order';
import { OrderCalcService } from '../../order-calc.service';
import { LocalStorageService } from '../../../local-storage.service';
import * as _ from 'lodash';


@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  @Input() orders: IOrder[];
  @Input() orderIndex: number;
  @Input() selectedOrder: IOrder;
  weapons;

  constructor(
    public orderCalcService: OrderCalcService,
    private lsService: LocalStorageService
  ) { }

  ngOnInit() {
    this.initWeaponsList();
    console.log(this.weapons);
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


