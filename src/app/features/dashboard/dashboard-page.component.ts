import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryCardComponent } from './components/summary-card/summary-card.component';
import { UsageByHouseChartComponent } from './components/usage-by-house-chart/usage-by-house-chart.component';
import { UsageOverTimeChartComponent } from './components/usage-over-time-chart/usage-over-time-chart.component';
import { DetailedUsageTableComponent } from './components/detailed-usage-table/detailed-usage-table.component';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UsageStateService } from '../../core/services/usage-state.service';
import { HouseStateService } from '../../core/services/house-state.service';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    CommonModule,
    SummaryCardComponent,
    UsageByHouseChartComponent,
    UsageOverTimeChartComponent,
    DetailedUsageTableComponent
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  private usageState = inject(UsageStateService);
  private houseState = inject(HouseStateService);
  private route = inject(ActivatedRoute);
  private routeSub: Subscription | undefined;

  averageConsumption = this.usageState.averageConsumption;
  totalConsumption = this.usageState.totalConsumption;
  housesWithHighUsage = this.usageState.housesWithHighUsage;
  usageByHouseData = this.usageState.usageByHouseChartData;
  usageOverTimeData = this.usageState.usageOverTimeChartData;
  detailedUsageData = this.usageState.detailedUsageTableData;

  avgConsumptionChange = 5;
  totalConsumptionChange = -2;
  highUsageChange = 10;

  selectedCondominiumId: string | null = null;

  constructor() {}

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.pipe(
      map(params => params.get('condominiumId')),
      tap(condoId => {
        this.selectedCondominiumId = condoId;
        this.houseState.selectCondominium(condoId);
      })
    ).subscribe();

    if (!this.selectedCondominiumId) {
        this.houseState.selectCondominium(null);
    }
  }

  ngOnDestroy(): void {
      this.routeSub?.unsubscribe();
  }
}
