// Angular modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// Modules
import { MyCustomMaterialModule } from './material.module';


// Components
import { AppComponent } from './app.component';
import { ClientsComponent } from './clients/clients.component';
import { OrdersComponent } from './orders/orders.component';
import { NavComponent } from './common/nav/nav.component';
import { OrdersListComponent } from './orders/orders-list/orders-list.component';
import { ClientsListComponent } from './clients/clients-list/clients-list.component';
import { ClientsFormComponent } from './clients/clients-form/clients-form.component';
import { OrdersFormComponent } from './orders/orders-form/orders-form.component';
import { CountryService } from './country.service';
import { LocalStorageService } from './local-storage.service';
import { ClientEditDialogComponent } from './clients/clients-list/client-edit-dialog/client-edit-dialog.component';
import { OrderCalcService } from './orders/order-calc.service';
import { TruncatePipe } from './pipes/truncate.pipe';
import { OrderDetailComponent } from './orders/orders-list/order-detail/order-detail.component';

const appRoutes: Routes = [
  { path: 'clients', component: ClientsComponent },
  { path: 'orders', component: OrdersComponent },
  { path: '', redirectTo: '/clients',  pathMatch: 'full' },
  { path: '**', redirectTo: '/clients', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    OrdersComponent,
    NavComponent,
    OrdersListComponent,
    ClientsListComponent,
    ClientsFormComponent,
    OrdersFormComponent,
    ClientEditDialogComponent,
    TruncatePipe,
    OrderDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MyCustomMaterialModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  entryComponents: [
    ClientEditDialogComponent,
  ],
  providers: [CountryService, LocalStorageService, OrderCalcService],
  bootstrap: [AppComponent]
})
export class AppModule { }
