import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './components/siderbar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    ConfirmDialogComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
  ],
  exports: [
    SidebarComponent,
    HeaderComponent,
    LoadingSpinnerComponent
  ]
})
export class SharedModule { }
