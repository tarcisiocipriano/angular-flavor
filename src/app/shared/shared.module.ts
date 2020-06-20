import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CollapseModule } from 'ngx-bootstrap/collapse';

@NgModule({
  declarations: [
    // to-do alert, spinner, placeholderdirective
  ],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ButtonsModule.forRoot(),
    CollapseModule.forRoot()
  ],
  exports: [
    CommonModule,
    BsDropdownModule,
    ButtonsModule,
    CollapseModule
  ],
  entryComponents: [
    // to-do alert
  ]
})
export class SharedModule { }
