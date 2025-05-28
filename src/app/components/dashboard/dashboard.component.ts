import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface HouseData {
  houseNumber: string;
  residentName: string;
  currentReading: number;
  previousReading: number;
  consumption: number;
  status: 'Above Average' | 'Below Average' | 'Average';
}

const MOCK_DATA: HouseData[] = [
  { houseNumber: 'A101', residentName: 'John Doe', currentReading: 1200, previousReading: 1100, consumption: 100, status: 'Below Average' },
  { houseNumber: 'A102', residentName: 'Jane Smith', currentReading: 1550, previousReading: 1350, consumption: 200, status: 'Above Average' },
  { houseNumber: 'B201', residentName: 'Peter Jones', currentReading: 1300, previousReading: 1150, consumption: 150, status: 'Average' },
  { houseNumber: 'B202', residentName: 'Mary Brown', currentReading: 1100, previousReading: 1000, consumption: 100, status: 'Below Average' },
  { houseNumber: 'C301', residentName: 'David Wilson', currentReading: 1800, previousReading: 1600, consumption: 200, status: 'Above Average' },
  { houseNumber: 'C302', residentName: 'Linda Garcia', currentReading: 1400, previousReading: 1250, consumption: 150, status: 'Average' },
  { houseNumber: 'D401', residentName: 'Michael Miller', currentReading: 1600, previousReading: 1380, consumption: 220, status: 'Above Average' },
  { houseNumber: 'D402', residentName: 'Sarah Davis', currentReading: 1250, previousReading: 1120, consumption: 130, status: 'Below Average' },
];

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements AfterViewInit {
  displayedColumns: string[] = ['houseNumber', 'residentName', 'currentReading', 'previousReading', 'consumption', 'status'];
  dataSource = new MatTableDataSource<HouseData>(MOCK_DATA);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() { }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
