import { Component, OnInit } from '@angular/core';

import { RouterModule } from '@angular/router'; // For breadcrumbs
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HouseDialogComponent, HouseDialogData } from '../house-dialog/house-dialog.component'; // Adjust path as needed

// Mock Data
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
export class HousesComponent implements OnInit {
  displayedColumns: string[] = ['houseNumber', 'residentName', 'contactEmail', 'contactPhone', 'actions'];
  dataSource = new MatTableDataSource<HouseDialogData>(MOCK_HOUSES);
  condominiumName: string = 'Sunshine Condos'; // Placeholder for dynamic name

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    // Mock data is initialized
    // In a real app, you might fetch the condominium name based on route params
  }

  openDialog(data?: HouseDialogData): void {
    const dialogRef = this.dialog.open(HouseDialogComponent, {
      width: '500px', // Adjust width as needed
      data: data ? { ...data } : null // Pass a copy of data or null for new entry
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dialog result (House):', result);
        // Handle add/edit logic for the table
        if (result.id) { // Existing item
          const index = this.dataSource.data.findIndex(item => item.id === result.id);
          if (index > -1) {
            const currentData = this.dataSource.data;
            currentData[index] = result;
            this.dataSource.data = currentData;
          }
        } else { // New item
          const newId = 'h' + (Math.max(...this.dataSource.data.map(item => parseInt(item.id?.substring(1) || '0'))) + 1); // Simple ID
          const newItem = { ...result, id: newId };
          const currentData = this.dataSource.data;
          currentData.push(newItem);
          this.dataSource.data = currentData;
        }
      }
    });
  }
}
