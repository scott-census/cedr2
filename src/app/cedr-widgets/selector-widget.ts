import * as _ from 'lodash';
import { Widget } from '../core/widget';
import { DataService } from '../shared/data.service';
import { SelectionsService } from '../core/selections.service';

export class SelectorWidget extends Widget {

  constructor(protected dataService: DataService,
              protected selectionsService: SelectionsService) {
    super();
  }

  // -----------SELECTOR WIDGETS-----------------

  // there are multiple situations where widgets have information about their selected items:
  // 1. when config.data is an array of items (config.has_own_data may or may not be true)
  //   a. the data has a member (or members) that is selected
  //   b. config.default_value exists
  //     - if "none", selection is []
  //     - if "first", selection is first item
  //     - else it is the selection (an array with one or more {id:x,label:y} members)
  //   c. config.selection_required is true (same as "first" above)
  // 2. when config.data does not exist
  //   a. config.default_value exists
  //     - if "none", selection is []
  //     - if an array, it is the selection (one or more {id:x,label:y} members)
  //     - if "first", need to fetch from the database using &selectedIndexes=1
  // defaultToFirst is a CDR_WIDGET constant: DEFAULT_SELECT_FIRST (true) or NO_DEFAULT_SELECTION (false)
  protected findSelected(config, defaultToFirst?) {
    let selected = [];
    if (config.data) {
      if (!defaultToFirst) {
        defaultToFirst = ((config.selection_required && _.isUndefined(config.default_value))
          || config.default_value === 'first');
      }
      selected = this.scanForSelected(config.data, defaultToFirst);
    }
    if (_.isEmpty(selected) && _.isArray(config.default_value)) {
      selected = config.default_value;
    }
    return selected;
  }

  // if selections from URL, get names and send message (in case button needs them)
  // else see if there is anything selected by default and get that, either from config or database
  // and if there is update the selections service and send the message with labels
  protected getInitialSelections(id) {
    if (this.selectionsService.hasSelections(id)) {
      // these are from bookmarks, so let buttons know to set names (may have timing issue)
      // TODO: implement defaultNamesReady or whatever system we use to get names for initial selections
      // this.selectionsService.defaultNamesReady().then(function () {
      //   this.dispatchService.publish(CDR_DISPATCH.SELECTED_NAMES_UPDATED, id, this.selectionsService.selectedLabelsForAWidget(id));
      // });
    } else {
      // see if we need to initialize
      const selected = this.findSelected(this.config);
      if (_.isEmpty(selected) && (this.config.selection_required || this.config.default_value === 'first')) {
        // fetch the data from the database, using a special syntax to request just the first item
        const extras = {
          filterRows: 'S', // make this an enum? CDR_DATA.RETURN_TYPE_SELECTED_ONLY,
          firstItemOnly: true
        };
        this.dataService.getData(this.dataService.lookupQuery(this.config.data_query, extras)).then(function (data) {
          this.selectionsService.setDefault(id, data.data);
          this.dispatchService.publish('selected_names_updated', id, this.selectionsService.selectedLabelsForAWidget(id));
        });
      } else if (selected) {
        this.selectionsService.setDefault(id, selected);
        if (!_.isEmpty(selected)) {
          this.dispatchService.publish('selected_names_updated', id, this.selectionsService.selectedLabelsForAWidget(id));
        }
      }
    }
  }

  private scanForSelected(data: Array<any>, first: boolean): Array<any> {
    let selected = [];
    _.forEach(data, (item) => {
      if (item.selected) {
        selected.push(item);
      }
    });
    if (_.isEmpty(selected) && first) {
      data[0].selected = true;
      selected.push(data[0]);
    }
    return selected;
  }
}
