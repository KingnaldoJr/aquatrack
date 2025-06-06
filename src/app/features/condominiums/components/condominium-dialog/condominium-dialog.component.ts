import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Condominium } from '../../../../shared/models/condominium.model';

@Component({
  selector: 'app-condominium-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './condominium-dialog.component.html',
  styleUrl: './condominium-dialog.component.scss'
})
export class CondominiumDialogComponent  {
  private fb = inject(FormBuilder);
  dialogRef = inject<MatDialogRef<CondominiumDialogComponent>>(MatDialogRef);
  data = inject<Condominium | null>(MAT_DIALOG_DATA);

  form: FormGroup;
  isEditMode: boolean;

  constructor() {
    const data = this.data;

    this.isEditMode = !!data;
    this.form = this.fb.group({
      id: [data?.id],
      name: [data?.name ?? '', Validators.required],
      address: [data?.address ?? '', Validators.required],
      contactPerson: [data?.contactPerson ?? '', Validators.required],
      contactEmail: [data?.contactEmail ?? '', [Validators.required, Validators.email]],
      contactPhone: [data?.contactPhone ?? '', Validators.required]
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
