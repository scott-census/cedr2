import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { WhenService } from '../shared/when.service';

interface Subscription {
  msg: string;    // message id - should be changed to enum
  when: any;      // optional condition - must be valid when clause
  func: any;      // callee function to execute when activated
  callee: any;    // subscriber
  id: string;     // subscriber id
}

interface ConfigSub {
  target: string;   // id of publisher to listen for
  func: string;     // name of function to execute when activated
  when?: any;       // optional condition - must be valid when clause
  event: string;    // message id - should be changed to enum
}

@Injectable()
export class DispatchService {
  private subscriptions: {key?: [Subscription]} = {};

  constructor(private whenService: WhenService) { }

  registerAll(subsToRegister: Array<ConfigSub>, scope: any, id: string): void {
    _.forEach(subsToRegister, (subscr: ConfigSub) => {
      if (typeof scope[subscr.func] === 'function') {
        this.subscribe(subscr.target, subscr.event, scope[subscr.func], subscr.when, scope, id);
      } else {
        // issue exception?
        console.log(id + ': Trying to subscribe to event ' + subscr.event + ' with non-function ' + subscr.func);
      }
    });
  }

  // Alert any subscribers for this message
  publish(msg: string, publisherID: string, payload: any): void {
    if (!publisherID) {
      publisherID = 'system';
    }
    this.subscriptions[publisherID].forEach(function(subscr: Subscription) {
      if (subscr.msg === msg && this.whenService.when(subscr.when)) {
        subscr.func.call(subscr.callee, payload, msg);
      }
    });
  }

  // Register a listener for a specific message
  private subscribe(target: string, msg: string, listener: any, whenClause: any, subscriber: any, id: string): void {
    if (!this.subscriptions[target]) {
      this.subscriptions[target] = [];
    }
    this.subscriptions[target].push({ 'msg': msg, 'when': whenClause, 'func': listener, 'callee': subscriber, 'id': id });
  }

}
