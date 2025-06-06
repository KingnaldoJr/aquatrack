import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-summary-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './summary-card.component.html',
  styleUrl: './summary-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryCardComponent {
  @Input({ required: true }) title: string = '';
  @Input({ required: true }) value: number | string = 0;
  @Input() unit: string = '';
  @Input() percentageChange: number | null = null;
  @Input() icon: string = '';

  get changeClass(): string {
    if (this.percentageChange === null || this.percentageChange === undefined) {
      return '';
    }
    return this.percentageChange >= 0 ? 'positive' : 'negative';
  }

  get changeIcon(): string {
    if (this.percentageChange === null || this.percentageChange === undefined) {
      return '';
    }
    return this.percentageChange >= 0 ? 'arrow_upward' : 'arrow_downward';
  }
}
