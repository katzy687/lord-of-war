import { Component, OnInit, NgZone } from '@angular/core';
import { LocalStorageService } from '../../local-storage.service';
import { OrderCalcService } from '../../orders/order-calc.service';
import { IClient } from '../../models/client';
import { MatDialog } from '@angular/material';
import { ClientEditDialogComponent } from './client-edit-dialog/client-edit-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit {
  clients: IClient[];
  responsiveColumns: number;
  screenWidth: number;

  constructor(
    private lsService: LocalStorageService,
    public orderCalcService: OrderCalcService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone
  ) { 
    this.setColumnsOnResize();
  }

  ngOnInit() {
    this.syncLocalClients();
    this.setInitialColumns();
  }

  syncLocalClients() {
    this.lsService.clients.subscribe(data => this.clients = data);
  }

  deleteClient(index) {
    this.clients.splice(index, 1);
    console.log(this.clients);
    this.updateLocalStorage();
  }

  updateLocalStorage() {
    this.lsService.setToLocalStorage(this.lsService.clientArrKey, this.clients); 
  }

  //// ===================== setColumns ===================================
  
  setInitialColumns() {
    this.screenWidth = window.innerWidth;
    this.setColumns();
  }
  
  setColumnsOnResize() {
    window.onresize = (e) => {
        this.ngZone.run(() => {
            this.screenWidth = window.innerWidth;
            this.setColumns();
        });
    };
  }

  setColumns() {
    if (this.screenWidth >= 524 && this.screenWidth < 900) {
      this.responsiveColumns = 2;
    } else if (this.screenWidth >= 900 && this.screenWidth < 1200) {
      this.responsiveColumns = 3;
    } else if (this.screenWidth >= 1200) {
      this.responsiveColumns = 4;
    } else {
      this.responsiveColumns = 1;
    }
  }

  //// ===================== Dialog ===================================
  
  openDialog(index): void {
    
    const dialogRef = this.dialog.open(ClientEditDialogComponent, {
      width: '250px',
      data: { currentLeader: this.clients[index].currentLeader, 
              originalValue: this.clients[index].currentLeader  
            }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog closed man');
      this.clients[index].currentLeader = result;
      this.updateLocalStorage();
    });
  }

  //// ===================== routing to orders ===================================
  
  goToOrders(clientIndex) {
    const countryName = this.clients[clientIndex].country.name;

    this.router.navigate(['/orders'], {queryParams: {countryName}});
    
  }



 

}
