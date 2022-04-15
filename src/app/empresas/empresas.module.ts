import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { EmpresasRoutingModule } from './empresas-routing.module';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, EmpresasRoutingModule],
  declarations: [LayoutComponent, ListComponent, AddEditComponent],
})
export class EmpresasModule {}
