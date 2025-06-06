import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaterUsageFormComponent, WaterUsageFormValue } from './components/water-usage-form/water-usage-form.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CondominiumStateService } from '../../core/services/condominium-state.service';
import { HouseStateService } from '../../core/services/house-state.service';
import { UsageStateService } from '../../core/services/usage-state.service';

@Component({
  selector: 'app-data-entry-page',
  standalone: true,
  imports: [
    CommonModule,
    WaterUsageFormComponent,
    MatSnackBarModule
  ],
  templateUrl: './data-entry-page.component.html',
  styleUrl: './data-entry-page.component.scss'
})
export class DataEntryPageComponent implements OnInit {
  private condominiumState = inject(CondominiumStateService);
  private houseState = inject(HouseStateService);
  private usageState = inject(UsageStateService);
  private snackBar = inject(MatSnackBar);

  condominiums = this.condominiumState.condominiums;
  housesForSelectedCondo = this.houseState.housesForSelectedCondo;

  selectedCondominiumId = signal<string | null>(null);

  ngOnInit(): void {
    this.houseState.selectCondominium(null);
  }

  onCondominiumSelected(condoId: string | null): void {
    this.selectedCondominiumId.set(condoId);
    this.houseState.selectCondominium(condoId);
  }

  onUsageSubmit(formData: WaterUsageFormValue): void {
    if (!formData.houseId || !formData.condominiumId) {
        this.snackBar.open('Please select both condominium and house.', 'Close', { duration: 3000 });
        return;
    }

    try {
        // Prepare data for the service
        const usageToAdd = {
            houseId: formData.houseId,
            condominiumId: formData.condominiumId,
            readingDate: new Date(formData.readingDate),
            currentMeterReading: formData.currentMeterReading,
            previousMeterReading: formData.previousMeterReading,
        };

        this.usageState.addWaterUsage(usageToAdd);

        this.snackBar.open('Water usage data submitted successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
        });
    } catch (error) {
        console.error('Error submitting usage data:', error);
        this.snackBar.open('Failed to submit data. Please try again.', 'Close', { duration: 3000 });
    }
  }
}
