import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DataService} from './data.service';
import {WhenService} from './when.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    DataService,
    WhenService
  ]
})
export class SharedModule { }
