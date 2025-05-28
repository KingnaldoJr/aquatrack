import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

interface Condo {
  id: string;
  name: string;
}

interface House {
  id: string;
  number: string;
  condoId: string;
}

@Component({
  selector: 'app-data-entry',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
],
  templateUrl: './data-entry.component.html',
  styleUrl: './data-entry.component.scss',
})
export class DataEntryComponent {
  dataEntryForm: FormGroup;

  condominiums: Condo[] = [
    { id: 'condo1', name: 'Sunshine Condos' },
    { id: 'condo2', name: 'Ocean View Towers' },
    { id: 'condo3', name: 'Mountain Ridge Estates' }
  ];

  houses: House[] = [
    { id: 'h1', number: 'A101', condoId: 'condo1' },
    { id: 'h2', number: 'A102', condoId: 'condo1' },
    { id: 'h3', number: 'B203', condoId: 'condo2' },
    { id: 'h4', number: 'C305', condoId: 'condo3' },
    { id: 'h5', number: 'D401', condoId: 'condo1' },
  ];

  constructor(private readonly fb: FormBuilder) {
    this.dataEntryForm = this.fb.group({
      condominium: ['', Validators.required],
      houseNumber: ['', Validators.required],
      currentReading: ['', [Validators.required, Validators.min(0)]],
      previousReading: ['', [Validators.required, Validators.min(0)]],
      readingDate: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.dataEntryForm.valid) {
      console.log('Data Entry Form Submitted:', this.dataEntryForm.value);
      this.dataEntryForm.reset();
      this.dataEntryForm.get('houseNumber')?.setValue('');
    } else {
      console.log('Form is invalid');
      this.dataEntryForm.markAllAsTouched();
    }
  }
}
