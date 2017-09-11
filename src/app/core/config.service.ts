import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@Injectable()
export class ConfigService {

  appName = '';
  private serverConfig: any = null;
  private config: {keys?: any} = null;

  constructor(private http: Http) { }

  getConfig(id: string): {keys?: any} {
    return this.config[id];
  }

  getConfigIds(): Array<string> {
    return Object.keys(this.config);
  }

  getDataServer(service: string): string {
    const dataServer = this.getActive('dataServer');
    const requestedService = service ? this.serverConfig.dataServices[service] : '';
    const dataUrl = dataServer.url + dataServer.path + dataServer.search;
    return dataUrl.replace('{{service}}', requestedService).replace('{{appName}}', this.appName);
  }

  getMapServer(service?: string): string {
    const mapServer = this.getActive('mapServer');
    const requestedService = service ? this.serverConfig.dataServices[service] : '';
    const mapUrl = mapServer.url + mapServer.path;
    return mapUrl.replace('{{service}}', requestedService);
  }

  load(): Promise<any> {
    return this.http
      .get('./assets/config.json')
      .map( (res: Response) => res.json() )
      .toPromise()
      .then((data: any) => {
      // TODO: maybe get rid of inactive servers right away, keeping only the active ones
        this.serverConfig = data;
        // may want to have option to get appName from URL bookmark
        this.appName = data.appName;
        // TODO: prime selections service with any bookmarks?
        return this.loadAppConfig();
      })
      .catch((error: any) => {
        console.log('Error reading server configuration file:', error);
        return Promise.resolve();
      });
  }

  private getActive(type: string): any {
    // TODO: check to see if there is a URL or environment variable that specifies something other than the default first item
    return this.serverConfig[type][0];
  }

  private getConfigLocation(): string {
    const configConfig = this.getActive('configurationServer');
    return (configConfig.url + configConfig.path + configConfig.name);
  }

  private loadAppConfig(): Promise<any> {
    const appConfigLocation = this.getConfigLocation();
    return this.http
      .get(appConfigLocation)
      .map( (res: Response) => res.json() )
      .toPromise()
      .then((data: any) => this.config = data)
      .catch((error: any) => {
        console.log('Error reading application configuration file:', error);
        return Promise.resolve();
      });
  }
}
