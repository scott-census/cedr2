import { Injectable } from '@angular/core';

import * as _ from 'lodash';
import { SelectionsService } from '../core/selections.service';

@Injectable()
export class WhenService {

  constructor(private selectionsService: SelectionsService) { }

  // returns true or false, depending on whether the when clause is satisfied with current selections
  when(whenClause): boolean {
    return this.process_clause(whenClause);
  }

  private process_condition(clause): boolean {
    // "against" should hold the id of an item that might have selections
    const selected_ids = (this.selectionsService.selectedIds(clause.against))[clause.against];
    if (clause.value !== undefined) {
      return _.isEqual(selected_ids, clause.value);
    } else if (clause.in !== undefined) {
      // clause.in is expected to be an array
      if (!_.isArray(clause.in)) {
        console.warn('when clause has an "in" element that is not an array', clause);
      }
      return (_.intersection(selected_ids, clause.in).length > 0);
    } else {
      // no value? It's an existence test.
      return !!(this.selectionsService.getAllSelectorIds())[clause.against];
    }
  }

  private process_clause(clause): boolean {
    if (clause === undefined) {
      return true;
    } else {
      const keys = _.keys(clause);
      // Handle keywords and recurse
      if (keys.length === 1) {
        switch (keys[0]) {
          case 'and':
            return _.reduce(clause.and, function (acc, andClause) {
              return this.process_clause(andClause) && acc;
            }, true);
          case 'or':
            return _.reduce(clause.or, function (acc, orClause) {
              return this.process_clause(orClause) || acc;
            }, false);
          case 'not':
            return !(this.process_clause(clause.not));
          default:
            return this.process_condition(clause);
        }
      } else {
        // Must be a condition
        return this.process_condition(clause);
      }
    }
  }

}
