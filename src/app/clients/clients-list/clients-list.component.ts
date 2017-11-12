import { Component, OnInit } from '@angular/core';
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

  constructor(
    private lsService: LocalStorageService,
    private orderCalcService: OrderCalcService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.syncLocalClients();
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
