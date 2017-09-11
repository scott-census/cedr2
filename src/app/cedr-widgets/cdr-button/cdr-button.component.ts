import { Component, OnInit, Input } from '@angular/core';

import { WidgetService } from '../../shared/widget.service';

@Component({
  selector: 'cdr-button',
  templateUrl: './cdr-button.component.html',
  styleUrls: ['./cdr-button.component.css']
})
export class CdrButtonComponent implements OnInit {
  @Input() id: string;

  config = null;
  label = '';
  disabled = false;
  hidden = false;

  constructor(private widgetService: WidgetService) { }

  ngOnInit() {
    this.config = this.widgetService.register(this.id, this);
    if (this.config.label) { this.label = this.config.label; }
    if (this.config.disabled) { this.disabled = this.config.disabled; }
    if (this.config.hidden) { this.hidden = this.config.hidden; }
    this.widgetService.ready(this.id);
  }

}
