import { ICountry } from './country';

export interface IClient {
  country: ICountry;
  currentLeader?: string;
  annualSales?: number;
}
