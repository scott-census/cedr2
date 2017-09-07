import { NgModule, APP_INITIALIZER, FactoryProvider } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ConfigService } from './core/config.service';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    CoreModule
  ],
  providers: [
    ConfigService,
    { provide: APP_INITIALIZER,
      useFactory: (configService: ConfigService) => () => configService.load(),
      deps: [ConfigService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
