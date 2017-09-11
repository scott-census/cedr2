import { Component } from '@angular/core';

import { ConfigService } from './core/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  ids: Array<string>;

  constructor(private configService: ConfigService) {
    this.title = configService.appName;
    this.ids = this.configService.getConfigIds();
  }
}
