import { Component } from '@angular/core';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CondominiumDialogComponent, CondominiumData } from '../condominium-dialog/condominium-dialog.component';

const MOCK_CONDOMINIUMS: CondominiumData[] = [
  { id: '1', name: 'Green Valley Condos', address: '123 Green Valley Rd, Springfield', contactPerson: 'Alice Johnson', contactEmail: 'alice@gvcondos.com', contactPhone: '555-1234' },
  { id: '2', name: 'Sunset Heights', address: '456 Sunset Blvd, Metropolis', contactPerson: 'Bob Williams', contactEmail: 'bob@sunset.com', contactPhone: '555-5678' },
  { id: '3', name: 'Ocean View Towers', address: '789 Ocean Dr, Coast City', contactPerson: 'Carol Davis', contactEmail: 'carol@ovt.com', contactPhone: '555-8765' },
  { id: '4', name: 'Mountain Ridge Estates', address: '101 Mountain Pass, Hilltop', contactPerson: 'David Brown', contactEmail: 'david@mrestates.com', contactPhone: '555-4321' },
];

@Component({
  selector: 'app-condominiums',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
],
  templateUrl: './condominiums.component.html',
  styleUrl: './condominiums.component.scss'
})
export class CondominiumsComponent {
  displayedColumns: string[] = ['name', 'address', 'contactPerson', 'actions'];
  dataSource = new MatTableDataSource<CondominiumData>(MOCK_CONDOMINIUMS);

  constructor(public dialog: MatDialog) {}

  openDialog(data?: CondominiumData): void {
    const dialogRef = this.dialog.open(CondominiumDialogComponent, {
      width: '500px',
      data: data ? { ...data } : null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dialog result:', result);
        if (result.id) {
          const index = this.dataSource.data.findIndex(item => item.id === result.id);
          if (index > -1) {
            const currentData = this.dataSource.data;
            currentData[index] = result;
            this.dataSource.data = currentData;
          }
        } else {
          const newId = (Math.max(...this.dataSource.data.map(item => parseInt(item.id || '0'))) + 1).toString(); // Simple ID generation
          const newItem = { ...result, id: newId };
          const currentData = this.dataSource.data;
          currentData.push(newItem);
          this.dataSource.data = currentData;
        }
      }
    });
  }
}
