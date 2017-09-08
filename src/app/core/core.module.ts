import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import {CheckinService} from './checkin.service';
import {ConfigService} from './config.service';
import {DispatchService} from './dispatch.service';
import {SelectionsService} from './selections.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
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
