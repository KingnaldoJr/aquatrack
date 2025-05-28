import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // For *ngFor
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, NativeDateAdapter } from '@angular/material/core'; // For Datepicker
import { MatButtonModule } from '@angular/material/button';

interface Condo {
  id: string;
  name: string;
}

interface House {
  id: string;
  number: string;
  condoId: string; // To simulate filtering if needed later
}

@Component({
  selector: 'app-data-entry',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule, // Provides NativeDateAdapter
    MatButtonModule
  ],
  templateUrl: './data-entry.component.html',
  styleUrl: './data-entry.component.scss',
  // providers: [NativeDateAdapter] // Not needed if MatNativeDateModule is imported
})
export class DataEntryComponent implements OnInit {
  dataEntryForm: FormGroup;

  condominiums: Condo[] = [
    { id: 'condo1', name: 'Sunshine Condos' },
    { id: 'condo2', name: 'Ocean View Towers' },
    { id: 'condo3', name: 'Mountain Ridge Estates' }
  ];

  houses: House[] = [ // Mock houses, can be filtered by selected condominium in a real app
    { id: 'h1', number: 'A101', condoId: 'condo1' },
    { id: 'h2', number: 'A102', condoId: 'condo1' },
    { id: 'h3', number: 'B203', condoId: 'condo2' },
    { id: 'h4', number: 'C305', condoId: 'condo3' },
    { id: 'h5', number: 'D401', condoId: 'condo1' },
  ];

  constructor(private fb: FormBuilder) {
    this.dataEntryForm = this.fb.group({
      condominium: ['', Validators.required],
      houseNumber: ['', Validators.required],
      currentReading: ['', [Validators.required, Validators.min(0)]],
      previousReading: ['', [Validators.required, Validators.min(0)]],
      readingDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Form initialization is done in the constructor
    // In a real app, you might fetch condominium and house lists here
  }

  onSubmit(): void {
    if (this.dataEntryForm.valid) {
      console.log('Data Entry Form Submitted:', this.dataEntryForm.value);
      this.dataEntryForm.reset();
      // Optionally, reset dropdowns to a default state or clear them
      // this.dataEntryForm.get('condominium')?.setValue('');
      // this.dataEntryForm.get('houseNumber')?.setValue('');
    } else {
      console.log('Form is invalid');
      // Mark all fields as touched to display validation errors
      this.dataEntryForm.markAllAsTouched();
    }
  }
}
