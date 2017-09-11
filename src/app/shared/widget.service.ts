import { Injectable } from '@angular/core';

import { CheckinService } from '../core/checkin.service';
import { ConfigService } from '../core/config.service';
import { DispatchService } from '../core/dispatch.service';

@Injectable()
export class WidgetService {

  constructor( private checkinService: CheckinService,
               private configService: ConfigService,
               private dispatchService: DispatchService) { }

  register(id: string, widget: any): {keys?: any} {
    this.checkinService.checkin(id);
    const config = this.configService.getConfig(id);
    if (!config) {
      console.warn('widget-service did not find config data for widget ' + id);
    } else if (config['subscribe']) {
      this.dispatchService.registerAll(config['subscribe'], widget, id);
    }
    return config;
  }

  ready(id: string): void {
    this.checkinService.ready(id);
  }
}
