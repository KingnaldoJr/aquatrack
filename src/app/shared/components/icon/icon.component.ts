import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-icon',
  imports: [NgClass],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
})
export class IconComponent {
  @Input() name = '';
  @Input() fill = false;

  get iconClass() {
    return {
      filled: this.fill,
    };
  }
}
