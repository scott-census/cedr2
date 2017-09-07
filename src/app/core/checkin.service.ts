import { Injectable } from '@angular/core';

@Injectable()
export class CheckinService {
  private registry = {};

  constructor() { }

  checkin(id: string): void {
    this.registry[id] = false;
  }

  ready(id: string): void {
    this.registry[id] = true;
    // TODO: check registry to see if all widgets have checked in and are ready
    // issue message if so
  }
}
