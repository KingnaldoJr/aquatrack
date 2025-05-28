import { Component, Inject, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

export interface HouseDialogData {
  id?: string; // Optional for new entries
  houseNumber: string;
  residentName: string;
  contactEmail: string;
  contactPhone: string;
}

@Component({
  selector: 'app-house-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
],
  templateUrl: './house-dialog.component.html',
  styleUrl: './house-dialog.component.scss'
})
export class HouseDialogComponent implements OnInit {
  houseForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<HouseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: HouseDialogData | null,
    private fb: FormBuilder
  ) {
    this.houseForm = this.fb.group({
      houseNumber: [this.data?.houseNumber || '', Validators.required],
      residentName: [this.data?.residentName || '', Validators.required],
      contactEmail: [this.data?.contactEmail || '', [Validators.required, Validators.email]],
      contactPhone: [this.data?.contactPhone || '']
    });
  }

  ngOnInit(): void {
    // Form is initialized in constructor
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.houseForm.valid) {
      const formData: HouseDialogData = {
        ...this.data, // Preserve ID if editing
        ...this.houseForm.value
      };
      console.log('Saving House:', formData);
      this.dialogRef.close(formData); // Pass data back on save
    }
  }
}
