import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Condominium } from '../../../../shared/models/condominium.model';

@Component({
  selector: 'app-condominium-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './condominium-list.component.html',
  styleUrl: './condominium-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CondominiumListComponent {
  @Input({ required: true }) condominiums: Condominium[] = [];
  @Output() edit = new EventEmitter<Condominium>();
  @Output() delete = new EventEmitter<string>();

  displayedColumns: string[] = ['name', 'address', 'contactPerson', 'contactPhone', 'actions'];

  onEdit(condominium: Condominium): void {
    this.edit.emit(condominium);
  }

  onDelete(id: string): void {
    this.delete.emit(id);
  }
}
