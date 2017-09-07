import { Injectable } from '@angular/core';
import * as _ from 'lodash';

interface SelectionItem {
  id: string;
  label: string;
  selected?: boolean;
  disabled?: boolean;
}

@Injectable()
export class SelectionsService {
  private selectedItems: {key?: {selections: Array<SelectionItem>, count: number}} = {};
  private updateCounter = 0;
  private allLabels: {key?: Array<string>} = {};

  constructor() { }

  initializeFromBookmarks(): void {
    // TODO: set initial selections from bookmarks, if any
  }

  setDefault(id: string, items: any): void {
    // TODO: set default selections from configuration, if not already set by bookmarks
  }

  registerAllLabel(id: string, label: string): void {
    this.allLabels[id] = label;
  }

  update(id: string, items: any, silent?: boolean): number {
    // TODO: update selections for the given id
    return this.updateCounter;
  }

  hasSelections(id: string): boolean {
    return !!this.selectedItems[id];
  }

  needRefresh(ids?: Array<string>|string, count = 0): boolean {
    let maxCount = 0;
    _.forEach(this.selectedItems, (item, key) => {
      if (this.isMatch(key, ids) && (item.count > maxCount)) {
        maxCount = item.count;
      }
    });
    return maxCount > count;
  }

  getRefreshCounter(): number {
    return this.updateCounter;
  }

  selectedObjects(ids?: Array<string>|string): {key?: Array<SelectionItem>} {
    return _.transform(this.selectedItems, (result, item, key) => {
      if (this.isMatch(key, ids)) { result[key] = item.selections; }
    }, {});
  }

  selectedIds(ids?: Array<string>|string): {key?: Array<string>} {
    return _.transform(this.selectedItems, (result, item, key) => {
      if (this.isMatch(key, ids)) { result[key] = _.map(item.selections, 'id'); }
    }, {});
  }

  selectedIdsForAWidget(id: string): Array<string> {
    return this.selectedIds(id)[id] || [];
  }

  selectedLabels(ids?: Array<string>|string): {key?: Array<string>} {
    return _.transform(this.selectedItems, (result, item, key) => {
      if (this.isMatch(key, ids)) { result[key] = _.map(item.selections, 'label'); }
    }, {});
  }

  selectedLabelsForAWidget(id: string): Array<string> {
    return this.selectedLabels(id)[id] || [];
  }

  getAllSelectorIds(): Array<string> {
    return _.keys(this.selectedItems);
  }

  private isMatch(id: string, keys: Array<string>|string): boolean {
    return (_.isUndefined(keys) || (_.isArray(keys) && !!_.find(keys, id)) || id === keys);
  }

  private makeItem(id: string, label = id, selected = true, disabled = false): SelectionItem {
    return {id: id, label: label, selected: selected, disabled: disabled};
  }

  private idsToItems(items: Array<string>): Array<SelectionItem> {
    return _.map(items, item => this.makeItem(item));
  }

  private storeItems(key: string, items: any, updateOverride = false): void {
    if (_.isUndefined(this.selectedItems[key])) {
      this.selectedItems[key] = {};
    }
    if (_.isEmpty(items)) {
      this.selectedItems[key].selections = [];
    } else if (_.isArray(items)) {
      this.selectedItems[key].selections = (_.isString(items[0]) ? this.idsToItems(items) : items);
    } else {
      this.selectedItems[key].selections = (_.isString(items) ? [this.makeItem(items)] : [items]);
    }
    if (!updateOverride) {
      this.selectedItems[key].counter = ++this.updateCounter;
    } else {
      this.selectedItems[key].counter = this.updateCounter;
    }
  }
}
