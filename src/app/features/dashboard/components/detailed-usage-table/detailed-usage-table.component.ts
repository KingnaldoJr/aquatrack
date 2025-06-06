import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';

export interface DetailedUsageRow {
  houseNumber: string;
  owner: string;
  averageUsage: number;
  totalUsage: number;
  status: 'Normal' | 'High';
}

@Component({
  selector: 'app-detailed-usage-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatChipsModule],
  templateUrl: './detailed-usage-table.component.html',
  styleUrl: './detailed-usage-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailedUsageTableComponent {
  @Input({ required: true }) usageData: DetailedUsageRow[] = [];

  displayedColumns: string[] = [
    'house',
    'owner',
    'averageUsage',
    'totalUsage',
    'status',
  ];

  getStatusColor(status: 'Normal' | 'High'): 'primary' | 'warn' {
    return status === 'High' ? 'warn' : 'primary';
  }
}
