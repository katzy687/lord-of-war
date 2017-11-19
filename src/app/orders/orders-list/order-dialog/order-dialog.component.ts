import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OrderCalcService } from '../../order-calc.service';
import * as _ from 'lodash';


@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.scss']
})
export class OrderDialogComponent implements OnInit {
  weapons;
  
  constructor(
    public dialogRef: MatDialogRef<OrderDialogComponent>,
    public orderCalcService: OrderCalcService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.initWeaponsList();
    
  }

  initWeaponsList() {
    if (this.data.selectedOrder) {
      this.weaponsObjectToArr(this.data.selectedOrder.weapons);
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
