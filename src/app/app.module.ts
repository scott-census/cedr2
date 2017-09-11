import { NgModule, APP_INITIALIZER, FactoryProvider, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CedrWidgetsModule } from './cedr-widgets/cedr-widgets.module';
import { ConfigService } from './core/config.service';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    CedrWidgetsModule,
    CoreModule
  ],
  providers: [
    { provide: APP_INITIALIZER,
      deps: [ConfigService],
      // Angular compiler has an issue with arrow functions in useFactory, so use old syntax for immediate function
      useFactory: (configService: ConfigService) => function() { return configService.load(); },
      multi: true
    }
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
