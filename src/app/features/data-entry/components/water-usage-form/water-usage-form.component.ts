import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';
import { Condominium } from '../../../../shared/models/condominium.model';
import { House } from '../../../../shared/models/house.model';

export interface WaterUsageFormValue {
  condominiumId: string | null;
  houseId: string | null;
  currentMeterReading: number;
  previousMeterReading: number;
  readingDate: string;
}

@Component({
  selector: 'app-water-usage-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ],
  templateUrl: './water-usage-form.component.html',
  styleUrl: './water-usage-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WaterUsageFormComponent implements OnInit, OnDestroy {
  @Input({ required: true }) condominiums: Condominium[] = [];
  @Input({ required: true }) houses: House[] = [];
  @Output() condominiumSelected = new EventEmitter<string | null>();
  @Output() usageSubmit = new EventEmitter<WaterUsageFormValue>();

  private fb = inject(FormBuilder);
  form: FormGroup;
  private condoSub: Subscription | undefined;

  constructor() {
    this.form = this.fb.group({
      condominiumId: [null, Validators.required],
      houseId: [{ value: null, disabled: true }, Validators.required],
      currentMeterReading: [null, [Validators.required, Validators.min(0)]],
      previousMeterReading: [null, [Validators.required, Validators.min(0)]],
      readingDate: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.condoSub = this.form.get('condominiumId')?.valueChanges.subscribe(condoId => {
      const houseControl = this.form.get('houseId');
      houseControl?.reset();
      if (condoId) {
        houseControl?.enable();
        this.condominiumSelected.emit(condoId);
      } else {
        houseControl?.disable();
        this.condominiumSelected.emit(null);
      }
    });
  }

  ngOnDestroy(): void {
    this.condoSub?.unsubscribe();
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
      const submissionValue: WaterUsageFormValue = {
        ...formValue,
        readingDate: formValue.readingDate ? new Date(formValue.readingDate).toISOString() : ''
      };
      this.usageSubmit.emit(submissionValue);
    }
  }
}
