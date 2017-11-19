import { Component, OnInit, ViewChild, NgZone, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { IOrder } from '../../models/order';
import { IClient } from '../../models/client';
import { LocalStorageService } from '../../local-storage.service';
import { CountryService } from '../../country.service';
import { OrderCalcService } from '../order-calc.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderDialogComponent } from './order-dialog/order-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit, AfterViewInit {
  @ViewChild(OrderDetailComponent) private detailComponent: OrderDetailComponent;
  @ViewChild('detailRef', { read: ElementRef }) detailRef: ElementRef;
  clients: IClient[];
  orders: IOrder[];
  orderIndex: number;
  selectedOrder: IOrder;

  countryParam;
  myControl: FormControl;
  filterValue = '';

  paidFilter: boolean | null = null;

  controlBtns = ['All Orders', 'Unpaid', 'Paid'];
  activeBtn = 'btn0';
  screenWidth: number;
  detailOffset: number;


  constructor(
    private lsService: LocalStorageService,
    public orderCalcService: OrderCalcService,
    private countryService: CountryService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    private ngZone: NgZone,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.syncLocalOrders();
    this.getClients();
    this.orderIndex = 0;
    this.initSelectedOrder();
    this.initQueryParam();
    this.initFormControl();
    this.setInitialScreenSize();
    this.monitorScreenSize();
  }

  ngAfterViewInit() {
    this.detailOffset = this.detailRef.nativeElement.offsetTop;
    console.log(this.detailOffset);

  }


  setChildWeapons() {
    this.detailComponent.weaponsObjectToArr(this.selectedOrder.weapons);
  }

  initFormControl() {
    this.myControl = new FormControl(this.countryParam);
  }

  syncLocalOrders() {
    this.lsService.orders.subscribe(data => this.orders = data);
  }

  getClients() {
    this.clients = this.lsService.getFromLocalStorage(this.lsService.clientArrKey);
    console.log(this.clients);
  }

  initQueryParam() {
    this.route
      .queryParams
      .subscribe(params => {
        this.countryParam = params['countryName'] || null;
        if (this.countryParam) {
          this.filterValue = this.countryParam;
          this.setFirstOrderToDetail(this.countryParam);
        }
        console.log('countryParam', this.countryParam);
      });
  }

  setFirstOrderToDetail(country) {
    console.log('------orders below');
    console.log(this.orders);
    const firstMatchingIndex = this.orders.findIndex(order => order.client.country.name === country);
    this.selectedOrder = this.orders[firstMatchingIndex];
    this.setChildWeapons();
  }

  setDetailHeight(e) {
    const offsetTop = this.getOrderOffsetTop(e);
    const nativeEl = this.detailRef.nativeElement;
    console.log(nativeEl);

    this.renderer.setStyle(this.detailRef.nativeElement, 'top', `${offsetTop}px`);


  }

  getOrderOffsetTop(e) {
    const targetOrder = e.target;
    const orderOffset = targetOrder.closest('.mat-card-wrapper').offsetTop;
    console.log(orderOffset);
    return orderOffset;
  }

  initSelectedOrder() {
    if (this.orders.length) {
      this.selectedOrder = this.orders[0];
    }
  }

  //// ===================== filter by paid status ===================================


  setActiveBtn(index) {
    this.activeBtn = 'btn' + index;
  }

  setPaidFilter(index) {
    switch (index) {
      case 0:
        this.paidFilter = null;
        break;
      case 1:
        this.paidFilter = false;
        break;
      case 2:
        this.paidFilter = true;
        break;
    }
  }

  filterPaidStatus(index) {
    if (this.paidFilter === null) {
      return true;
    } else if (this.paidFilter === true) {
      return this.orders[index].paid === true;
    } else {
      return this.orders[index].paid === false;
    }
  }

  filterByCountry(index) {
    const countryMatchesForm = this.orders[index].client.country.name === this.myControl.value;
    if (this.myControl.value === null) {
      return true;
    } else if (typeof (this.myControl.value) === 'string' && this.myControl.value.length === 0) {
      return true;
    } else if (countryMatchesForm) {
      return true;
    } else {
      return false;
    }
  }

  //// ===================== delete order ===================================

  deleteOrder(index) {
    this.orders.splice(index, 1);
    console.log(this.clients);
    this.updateLocalStorage();
  }

  updateLocalStorage() {
    this.lsService.setToLocalStorage(this.lsService.orderArrKey, this.orders);
  }

  //// ===================== Dialogue ===================================

  openDialog(index): void {

    if (this.screenWidth >= 768) {
      return;
    }

    const dialogRef = this.dialog.open(OrderDialogComponent, {
      width: '500px',
      data: { selectedOrder: this.selectedOrder }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog closed homie');
      this.clients[index].currentLeader = result;
      // this.updateLocalStorage();
    });
  }

  setInitialScreenSize() {
    this.screenWidth = window.innerWidth;
  }

  monitorScreenSize() {
    window.onresize = (e) => {
      this.ngZone.run(() => {
        this.screenWidth = window.innerWidth;
      });
    };
  }
} // end of component
