import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { House } from '../../../../shared/models/house.model';

export interface HouseDialogData {
  house: House | null;
  condominiumId: string;
}

@Component({
  selector: 'app-house-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './house-dialog.component.html',
  styleUrl: './house-dialog.component.scss'
})
export class HouseDialogComponent {
  private fb = inject(FormBuilder);
  dialogRef = inject<MatDialogRef<HouseDialogComponent>>(MatDialogRef);
  data = inject<HouseDialogData>(MAT_DIALOG_DATA);

  form: FormGroup;
  isEditMode: boolean;
  condominiumId: string;

  constructor() {
    const data = this.data;

    this.isEditMode = !!data.house;
    this.condominiumId = data.condominiumId;

    this.form = this.fb.group({
      id: [data.house?.id],
      condominiumId: [this.condominiumId, Validators.required],
      houseNumber: [data.house?.houseNumber ?? '', Validators.required],
      residentName: [data.house?.residentName ?? '', Validators.required],
      contactEmail: [data.house?.contactEmail ?? '', [Validators.required, Validators.email]],
      contactPhone: [data.house?.contactPhone ?? '', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
