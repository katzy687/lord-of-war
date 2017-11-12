import { IClient } from './client';

export interface IOrder {
  client: IClient;
  shippingDate: string;
  paid: boolean;
  weapons: {
    tanks: number;
    jets: number;
    rockets: number;
    lightArms: number;
  };
}

export interface IWeaponField {
  weapon: string;
  pricePerUnit: number;
  priceLabel: string;
}
