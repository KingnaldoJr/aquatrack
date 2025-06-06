import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { House } from '../../../../shared/models/house.model';

@Component({
  selector: 'app-house-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './house-list.component.html',
  styleUrl: './house-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HouseListComponent {
  @Input({ required: true }) houses: House[] = [];
  @Output() edit = new EventEmitter<House>();
  @Output() delete = new EventEmitter<string>();

  displayedColumns: string[] = ['houseNumber', 'residentName', 'contactInformation', 'actions'];

  onEdit(house: House): void {
    this.edit.emit(house);
  }

  onDelete(id: string): void {
    this.delete.emit(id);
  }
}
