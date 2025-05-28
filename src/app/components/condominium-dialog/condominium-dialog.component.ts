import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // Import ReactiveFormsModule
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

export interface CondominiumData {
  id?: string;
  name: string;
  address: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
}

@Component({
  selector: 'app-condominium-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
],
  templateUrl: './condominium-dialog.component.html',
  styleUrl: './condominium-dialog.component.scss'
})
export class CondominiumDialogComponent {
  condominiumForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CondominiumDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CondominiumData | null, // Allow null for new entries
    private readonly fb: FormBuilder
  ) {
    this.condominiumForm = this.fb.group({
      name: [this.data?.name ?? '', Validators.required],
      address: [this.data?.address ?? '', Validators.required],
      contactPerson: [this.data?.contactPerson ?? ''],
      contactEmail: [this.data?.contactEmail ?? '', Validators.email],
      contactPhone: [this.data?.contactPhone ?? '']
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.condominiumForm.valid) {
      const formData: CondominiumData = {
        ...this.data,
        ...this.condominiumForm.value
      };
      console.log('Saving Condominium:', formData);
      this.dialogRef.close(formData);
    }
  }
}
