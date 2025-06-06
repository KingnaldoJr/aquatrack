export interface WaterUsage {
  id: string;
  houseId: string;
  condominiumId: string;
  readingDate: Date;
  currentMeterReading: number;
  previousMeterReading: number;
  consumption: number;
}

export interface DetailedUsage extends WaterUsage {
  houseNumber: string;
  owner: string;
  averageUsage: number;
  totalUsage: number;
  status: 'Normal' | 'High';
}
