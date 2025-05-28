import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HouseDialogComponent, HouseDialogData } from '../house-dialog/house-dialog.component';

const MOCK_HOUSES: HouseDialogData[] = [
  { id: 'h1', houseNumber: 'S101', residentName: 'Alice Wonderland', contactEmail: 'alice.w@sunshine.com', contactPhone: '555-1111' },
  { id: 'h2', houseNumber: 'S102', residentName: 'Bob The Builder', contactEmail: 'bob.b@sunshine.com', contactPhone: '555-2222' },
  { id: 'h3', houseNumber: 'S201', residentName: 'Charlie Brown', contactEmail: 'charlie.b@sunshine.com', contactPhone: '555-3333' },
  { id: 'h4', houseNumber: 'S202', residentName: 'Diana Prince', contactEmail: 'diana.p@sunshine.com', contactPhone: '555-4444' },
];

@Component({
  selector: 'app-houses',
  standalone: true,
  imports: [
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
],
  templateUrl: './houses.component.html',
  styleUrl: './houses.component.scss'
})
export class HousesComponent {
  displayedColumns: string[] = ['houseNumber', 'residentName', 'contactEmail', 'contactPhone', 'actions'];
  dataSource = new MatTableDataSource<HouseDialogData>(MOCK_HOUSES);
  condominiumName: string = 'Sunshine Condos';

  constructor(public dialog: MatDialog) {}

  openDialog(data?: HouseDialogData): void {
    const dialogRef = this.dialog.open(HouseDialogComponent, {
      width: '500px',
      data: data ? { ...data } : null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dialog result (House):', result);
        if (result.id) {
          const index = this.dataSource.data.findIndex(item => item.id === result.id);
          if (index > -1) {
            const currentData = this.dataSource.data;
            currentData[index] = result;
            this.dataSource.data = currentData;
          }
        } else {
          const newId = 'h' + (Math.max(...this.dataSource.data.map(item => parseInt(item.id?.substring(1) ?? '0'))) + 1); // Simple ID
          const newItem = { ...result, id: newId };
          const currentData = this.dataSource.data;
          currentData.push(newItem);
          this.dataSource.data = currentData;
        }
      }
    });
  }
}
