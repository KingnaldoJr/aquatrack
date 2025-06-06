import { Injectable, signal, computed } from '@angular/core';
import { House } from '../../shared/models/house.model';

const MOCK_HOUSES: House[] = [
  {
    id: 'h101',
    condominiumId: '1',
    houseNumber: '101',
    residentName: 'Sophia Clark',
    contactEmail: 'sophia.clark@email.com',
    contactPhone: '555-1010',
  },
  {
    id: 'h102',
    condominiumId: '1',
    houseNumber: '102',
    residentName: 'Ethan Bennett',
    contactEmail: 'ethan.bennett@email.com',
    contactPhone: '555-1020',
  },
  {
    id: 'h103',
    condominiumId: '1',
    houseNumber: '103',
    residentName: 'Olivia Carter',
    contactEmail: 'olivia.carter@email.com',
    contactPhone: '555-1030',
  },
  {
    id: 'h104',
    condominiumId: '1',
    houseNumber: '104',
    residentName: 'Liam Harper',
    contactEmail: 'liam.harper@email.com',
    contactPhone: '555-1040',
  },
  {
    id: 'h105',
    condominiumId: '1',
    houseNumber: '105',
    residentName: 'Ava Foster',
    contactEmail: 'ava.foster@email.com',
    contactPhone: '555-1050',
  },
  {
    id: 'h201',
    condominiumId: '2',
    houseNumber: 'A1',
    residentName: 'Noah King',
    contactEmail: 'noah.king@email.com',
    contactPhone: '555-2010',
  },
  {
    id: 'h301',
    condominiumId: '3',
    houseNumber: 'Unit 5',
    residentName: 'Isabella Scott',
    contactEmail: 'isabella.scott@email.com',
    contactPhone: '555-3010',
  },
];

@Injectable({
  providedIn: 'root',
})
export class HouseStateService {
  private readonly _houses = signal<House[]>([]);
  private readonly _selectedCondominiumId = signal<string | null>(null);

  readonly allHouses = this._houses.asReadonly();
  readonly selectedCondominiumId = this._selectedCondominiumId.asReadonly();
  readonly housesForSelectedCondo = computed(() => {
    const houses = this._houses();
    const condoId = this._selectedCondominiumId();
    if (!condoId) {
      return [];
    }
    return houses.filter((house) => house.condominiumId === condoId);
  });

  constructor() {
    this.loadHouses();
  }

  private loadHouses(): void {
    this._houses.set(MOCK_HOUSES);
  }

  selectCondominium(condominiumId: string | null): void {
    this._selectedCondominiumId.set(condominiumId);
  }

  addHouse(house: Omit<House, 'id'>): void {
    const newHouse: House = {
      ...house,
      id: crypto.randomUUID(),
    };
    this._houses.update((current) => [...current, newHouse]);
  }

  updateHouse(updatedHouse: House): void {
    this._houses.update((current) =>
      current.map((house) =>
        house.id === updatedHouse.id ? updatedHouse : house,
      ),
    );
  }
}
