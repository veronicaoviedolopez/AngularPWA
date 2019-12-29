import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '@material/material.module';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { DialogComponent } from './home/dialog/dialog.component';


@NgModule({
  declarations: [HomeComponent, DialogComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    MatOptionModule,
    FormsModule
  ],
  entryComponents: [
    DialogComponent
  ]

})
export class HomeModule {
  panelOpenState = false;
 }
