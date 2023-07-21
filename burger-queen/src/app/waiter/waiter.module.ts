import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WaiterRoutingModule } from './waiter-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { PendingOrdersComponent } from './pending-orders/pending-orders.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../plantillas/header/header.component';


@NgModule({
  declarations: [
    OrdersComponent,
    PendingOrdersComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    WaiterRoutingModule,
    FormsModule,
    
  ]
})
export class WaiterModule { }
