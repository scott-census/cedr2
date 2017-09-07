import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdrButtonComponent } from './cdr-button/cdr-button.component';
import { CdrCheckboxComponent } from './cdr-checkbox/cdr-checkbox.component';
import { CdrInstructionsComponent } from './cdr-instructions/cdr-instructions.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CdrButtonComponent,
    CdrCheckboxComponent,
    CdrInstructionsComponent
  ]
})
export class CedrWidgetsModule { }
