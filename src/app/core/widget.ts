import { CheckinService } from './checkin.service';
import { ConfigService } from './config.service';
import { DispatchService } from './dispatch.service';

/**
 * base class for all cedr widgets
 * Note: all members are private, so can only be used by extension
 */
export class Widget {
  protected config: any = null;

  constructor( protected checkinService: CheckinService,
               protected configService: ConfigService,
               protected dispatchService: DispatchService) { }

  protected register(id: string): boolean {
    this.checkinService.checkin(id);
    this.config = this.configService.getConfig(id);
    if (!this.config) {
      console.warn('cdr-widget-setup did not find config data for widget ' + id);
    } else if (this.config.subscribe) {
      this.dispatchService.registerAll(this.config.subscribe, this, id);
    }
    return !!this.config;
  }

  protected ready(id: string): void {
    this.checkinService.ready(id);
  }

  protected notify(msg: string): void {
    console.log(msg);
  }
}
