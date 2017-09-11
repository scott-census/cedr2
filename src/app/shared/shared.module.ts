import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DataService} from './data.service';
import {SelectorWidgetService} from './selector-widget.service';
import {VizWidgetService} from './viz-widget.service';
import {WhenService} from './when.service';
import {WidgetService} from './widget.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    DataService,
    SelectorWidgetService,
    VizWidgetService,
    WhenService,
    WidgetService
  ]
})
export class SharedModule { }
