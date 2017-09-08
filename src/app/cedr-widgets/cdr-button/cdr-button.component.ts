import { Component, OnInit, Input } from '@angular/core';

import { Widget } from '../../core/widget';

@Component({
  selector: 'cdr-button',
  templateUrl: './cdr-button.component.html',
  styleUrls: ['./cdr-button.component.css']
})
export class CdrButtonComponent extends Widget implements OnInit {
  @Input() id: string;

  label = '';
  disabled = false;
  hidden = false;

  constructor() { super(); }

  ngOnInit() {
    this.register(this.id);
    if (this.config.label) { this.label = this.config.label; }
    if (this.config.disabled) { this.disabled = this.config.disabled; }
    if (this.config.hidden) { this.hidden = this.config.hidden; }
    this.ready(this.id);
  }

}
