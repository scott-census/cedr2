import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@Injectable()
export class DataService {

  constructor() { }

  getData(url: string): Promise<any> {
    return this.http
      .get(url)
      .map( (res: Response) => res.json() )
      .toPromise()
      .then((data: any) => data)
      .catch((error: any) => {
        console.log('Error reading application configuration file:', error);
        return Promise.resolve();
      });
  }

  dataQuery(queryConfig, outputType, extras): string {
    // return configService.getDataServer("data") + processDataQuery(queryConfig, outputType, extras);
    // TODO: construct actual query
    return 'query';
  }

  // maybe should add app-specific subdirectories?
  mapServer(service) {
    // return configService.getMapServer(service);
    // TODO: do we even want this here, or get directly from configService?
    return 'query';
  }

  lookupQuery(query, extra) {
    // return configService.getDataServer("lookup") + processDataQuery(queryConfig, CDR_DATA.OUTPUT_JSON, extras);
    // TODO: construct actual query
    return 'query';
  }
}
