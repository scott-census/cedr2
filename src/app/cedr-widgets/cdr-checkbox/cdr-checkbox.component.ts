import { Component, OnInit, Input } from '@angular/core';

import { DispatchService } from '../../core/dispatch.service';
import { SelectionsService } from '../../core/selections.service';
import { SelectorWidgetService } from '../../shared/selector-widget.service';
import { WidgetService } from '../../shared/widget.service';

@Component({
  selector: 'cdr-checkbox',
  templateUrl: './cdr-checkbox.component.html',
  styleUrls: ['./cdr-checkbox.component.css']
})
export class CdrCheckboxComponent implements OnInit {
  @Input() id: string;

  private config = null;
  label = '--';
  value = true;
  disabled = false;
  hidden = false;

  constructor(private widgetService: WidgetService,
              private selectorWidgetService: SelectorWidgetService,
              private dispatchService: DispatchService,
              private selectionsService: SelectionsService) { }

  ngOnInit() {
    this.config = this.widgetService.register(this.id, this);
    if (this.config.label) { this.label = this.config.label; }
    if (this.config.disabled) { this.disabled = this.config.disabled; }
    if (this.config.hidden) { this.hidden = this.config.hidden; }
    const selected = this.selectorWidgetService.getInitialSelections(this.id, this.config);
    if (selected && selected.length > 0) {
      this.value = (selected[0] === this.config.data[0].id);
    }
    this.widgetService.ready(this.id);
  }

  update_selected(item) {
    if (!item) {
      item = (this.value ? this.config.data[0] : this.config.data[1]);
    }
    this.value = (item.id === this.config.data[0].id);
    this.selectionsService.update(this.id, item);
  }

  set(idx, option) {
    const skipUrl = (option && option.skipUrl);
    this.value = (idx === 0);
    this.selectionsService.update(this.id, this.config.data[idx], skipUrl);
  }

  // function specified in HTML to handle click event
  clicked(e) {
    const idx = e.currentTarget.checked ? 0 : 1;
    this.value = e.currentTarget.checked;
    this.selectionsService.update(this.id, this.config.data[idx]);
    this.dispatchService.publish('selection_selected', this.id, this.config.data[idx].id);
  }

}
