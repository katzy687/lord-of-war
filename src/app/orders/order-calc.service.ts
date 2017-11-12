import { Injectable, OnInit } from '@angular/core';
import { IWeaponField } from '../models/order';
import { IOrder } from '../models/order';
import { IClient } from '../models/client';
import { LocalStorageService } from '../local-storage.service';


@Injectable()
export class OrderCalcService {
  weaponFields: IWeaponField[];
  filterValue;

  constructor(private lsService: LocalStorageService) {
    this.initWeaponFields();
  }

  initWeaponFields() {
    this.weaponFields = [
      { weapon: 'tanks', pricePerUnit: 9e6, priceLabel: '9 M' },
      { weapon: 'jets', pricePerUnit: 19e6, priceLabel: '19 M' },
      { weapon: 'rockets', pricePerUnit: 1e6, priceLabel: '1 M' },
      { weapon: 'lightArms', pricePerUnit: 7e3, priceLabel: '7 K' }
    ];
  }

  //// ===================== Calculations ===================================

  getTotalPerWeapon(weaponField: IWeaponField, order: IOrder) {
    // PPU * quantity
    return weaponField.pricePerUnit * order.weapons[weaponField.weapon];
  }

  getOrderTotal(order: IOrder) {
    let total = 0;
    for (const weaponField in order.weapons) {
      if (weaponField) {
        total += (order.weapons[weaponField] * this.getPricePerWeapon(weaponField));
      }
    }
    return total;
  }

  getPricePerWeapon(weapon: string) {
    const matchingWeapon = this.weaponFields.find((weaponField) => {
      return weaponField.weapon === weapon;
    });
    return matchingWeapon.pricePerUnit;
  }

  getTotalSales(client: IClient, orders: IOrder[]) {
    const totalSales = orders.reduce((total, order) => {
      if (order.client.country.code === client.country.code) {
        total += this.getOrderTotal(order);
      }
      return total;
    }, 0);
    console.log(totalSales);
    return totalSales;
  }

   //// ===================== helpers ===================================
  
   getIconPNG(weapon) {
    switch (weapon) {
      case 'tanks':
        return 'tank';
      case 'jets':
        return 'jet';
      case 'rockets':
        return 'missile';
      case 'lightArms':
        return 'rifle';
    }
  }

  showTooltip(str, length) {
    return str.length >= length ? str : '';
  }

}
