import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {CheckinService} from './checkin.service';
import {ConfigService} from './config.service';
import {DispatchService} from './dispatch.service';
import {SelectionsService} from './selections.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    CheckinService,
    ConfigService,
    DispatchService,
    SelectionsService
  ]
})
export class CoreModule { }
