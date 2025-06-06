import { Injectable, signal, computed } from '@angular/core';
import { WaterUsage, DetailedUsage } from '../../shared/models/usage.model';
import { HouseStateService } from './house-state.service';

const MOCK_USAGE: WaterUsage[] = [
  { id: 'u1', houseId: 'h101', condominiumId: '1', readingDate: new Date('2024-05-15'), currentMeterReading: 15000, previousMeterReading: 13400, consumption: 1600 },
  { id: 'u2', houseId: 'h104', condominiumId: '1', readingDate: new Date('2024-05-15'), currentMeterReading: 13000, previousMeterReading: 11600, consumption: 1400 },
  { id: 'u3', houseId: 'h103', condominiumId: '1', readingDate: new Date('2024-05-15'), currentMeterReading: 17000, previousMeterReading: 15200, consumption: 1800 },
  { id: 'u4', houseId: 'h102', condominiumId: '1', readingDate: new Date('2024-05-15'), currentMeterReading: 12000, previousMeterReading: 10700, consumption: 1300 },
  { id: 'u5', houseId: 'h105', condominiumId: '1', readingDate: new Date('2024-05-15'), currentMeterReading: 19000, previousMeterReading: 17000, consumption: 2000 },
  { id: 'u6', houseId: 'h101', condominiumId: '1', readingDate: new Date('2024-04-15'), currentMeterReading: 13400, previousMeterReading: 11900, consumption: 1500 },
  { id: 'u7', houseId: 'h104', condominiumId: '1', readingDate: new Date('2024-04-15'), currentMeterReading: 11600, previousMeterReading: 10300, consumption: 1300 },
  { id: 'u8', houseId: 'h103', condominiumId: '1', readingDate: new Date('2024-04-15'), currentMeterReading: 15200, previousMeterReading: 13500, consumption: 1700 },
  { id: 'u9', houseId: 'h102', condominiumId: '1', readingDate: new Date('2024-04-15'), currentMeterReading: 10700, previousMeterReading: 9500, consumption: 1200 },
  { id: 'u10', houseId: 'h105', condominiumId: '1', readingDate: new Date('2024-04-15'), currentMeterReading: 17000, previousMeterReading: 15100, consumption: 1900 },
];

@Injectable({
  providedIn: 'root'
})
export class UsageStateService {
  private readonly _usageData = signal<WaterUsage[]>([]);
  readonly usageData = this._usageData.asReadonly();

  constructor(private houseState: HouseStateService) {
    this.loadUsageData();
  }

  private loadUsageData(): void {
    this._usageData.set(MOCK_USAGE);
  }

  addWaterUsage(usage: Omit<WaterUsage, 'id' | 'consumption'>): void {
    const newUsage: WaterUsage = {
      ...usage,
      id: crypto.randomUUID(),
      consumption: usage.currentMeterReading - usage.previousMeterReading
    };
    this._usageData.update(current => [...current, newUsage]);
  }

  private usageForSelectedCondo = computed(() => {
    const usage = this._usageData();
    const condoId = this.houseState.selectedCondominiumId();
    if (!condoId) return [];
    return usage.filter(u => u.condominiumId === condoId);
  });

  readonly averageConsumption = computed(() => {
    const usage = this.usageForSelectedCondo();
    if (usage.length === 0) return 0;
    const latestUsagePerHouse = this.getLatestUsagePerHouse(usage);
    const total = latestUsagePerHouse.reduce((sum, u) => sum + u.consumption, 0);
    return Math.round(total / latestUsagePerHouse.length);
  });

  readonly totalConsumption = computed(() => {
    const usage = this.usageForSelectedCondo();
    const latestUsagePerHouse = this.getLatestUsagePerHouse(usage);
    return latestUsagePerHouse.reduce((sum, u) => sum + u.consumption, 0);
  });

  readonly housesWithHighUsage = computed(() => {
    const usage = this.usageForSelectedCondo();
    const latestUsagePerHouse = this.getLatestUsagePerHouse(usage);
    const avg = this.averageConsumption();
    return latestUsagePerHouse.filter(u => u.consumption > avg * 1.1).length;
  });

  readonly usageByHouseChartData = computed(() => {
    const usage = this.usageForSelectedCondo();
    const houses = this.houseState.housesForSelectedCondo();
    const latestUsagePerHouse = this.getLatestUsagePerHouse(usage);

    return {
      labels: latestUsagePerHouse.map(u => houses.find(h => h.id === u.houseId)?.houseNumber ?? 'Unknown'),
      data: latestUsagePerHouse.map(u => u.consumption)
    };
  });

  readonly usageOverTimeChartData = computed(() => {
    const usage = this.usageForSelectedCondo();
    const monthlyConsumption: { [month: string]: number } = {};
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    usage.forEach(u => {
      const monthIndex = u.readingDate.getMonth();
      const year = u.readingDate.getFullYear();
      const key = `${year}-${monthIndex}`;
      const monthLabel = monthNames[monthIndex];

      if (!monthlyConsumption[key]) {
        monthlyConsumption[key] = 0;
      }
      monthlyConsumption[key] += u.consumption;
    });

    const sortedKeys = Object.keys(monthlyConsumption).sort((a, b) => {
        const [yearA, monthA] = a.split('-').map(Number);
        const [yearB, monthB] = b.split('-').map(Number);
        if (yearA !== yearB) return yearA - yearB;
        return monthA - monthB;
    });

    const last6Keys = sortedKeys.slice(-6);

    return {
      labels: last6Keys.map(key => monthNames[parseInt(key.split('-')[1])]),
      data: last6Keys.map(key => monthlyConsumption[key])
    };
  });

  readonly detailedUsageTableData = computed(() => {
    const usage = this.usageForSelectedCondo();
    const houses = this.houseState.housesForSelectedCondo();
    const latestUsagePerHouse = this.getLatestUsagePerHouse(usage);
    const avg = this.averageConsumption();

    return latestUsagePerHouse.map(u => {
      const house = houses.find(h => h.id === u.houseId);
      const status: 'Normal' | 'High' = u.consumption > avg * 1.1 ? 'High' : 'Normal';
      return {
        houseId: u.houseId,
        houseNumber: house?.houseNumber ?? 'N/A',
        owner: house?.residentName ?? 'N/A',
        averageUsage: avg,
        totalUsage: u.consumption,
        status: status
      } as Omit<DetailedUsage, 'id' | 'condominiumId' | 'readingDate' | 'currentMeterReading' | 'previousMeterReading' | 'consumption'> & { houseId: string };
    });
  });

  private getLatestUsagePerHouse(usageData: WaterUsage[]): WaterUsage[] {
    const latestUsageMap = new Map<string, WaterUsage>();
    usageData.forEach(u => {
      const existing = latestUsageMap.get(u.houseId);
      if (!existing || u.readingDate > existing.readingDate) {
        latestUsageMap.set(u.houseId, u);
      }
    });
    return Array.from(latestUsageMap.values());
  }
}
