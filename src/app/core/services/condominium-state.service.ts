import { Injectable, signal } from '@angular/core';
import { Condominium } from '../../shared/models/condominium.model';

const MOCK_CONDOMINIUMS: Condominium[] = [
  {
    id: '1',
    name: 'The Grand Residences',
    address: '123 Ocean View Drive, Apt 4B, Coastal City, CA 90210',
    contactPerson: 'Sarah Miller',
    contactEmail: 'sarah.miller@grandres.com',
    contactPhone: '555-1234',
  },
  {
    id: '2',
    name: 'Harbor Lights Towers',
    address: '456 Marina Way, Unit 12A, Harbor Town, CA 90218',
    contactPerson: 'David Lee',
    contactEmail: 'david.lee@harborlights.com',
    contactPhone: '555-5678',
  },
  {
    id: '3',
    name: 'Sunset Vista Estates',
    address: '789 Hilltop Road, Suite 201, Mountain View, CA 90212',
    contactPerson: 'Emily Chen',
    contactEmail: 'emily.chen@sunsetvista.com',
    contactPhone: '555-9012',
  },
  {
    id: '4',
    name: 'The Palms Condos',
    address: '101 Palm Avenue, Unit 3C, Palm Springs, CA 90216',
    contactPerson: 'Michael Davis',
    contactEmail: 'michael.davis@thepalms.com',
    contactPhone: '555-3456',
  },
  {
    id: '5',
    name: 'Ocean Breeze Apartments',
    address: '222 Seaside Blvd, Apt 6D, Beachside, CA 90218',
    contactPerson: 'Jessica Wilson',
    contactEmail: 'jessica.wilson@oceanbreeze.com',
    contactPhone: '555-6789',
  }, // Added based on prototype
];

@Injectable({
  providedIn: 'root',
})
export class CondominiumStateService {
  private readonly _condominiums = signal<Condominium[]>([]);
  readonly condominiums = this._condominiums.asReadonly();

  constructor() {
    this.loadCondominiums();
  }

  private loadCondominiums(): void {
    this._condominiums.set(MOCK_CONDOMINIUMS);
  }

  addCondominium(condominium: Omit<Condominium, 'id'>): void {
    const newCondo: Condominium = {
      ...condominium,
      id: crypto.randomUUID(),
    };
    this._condominiums.update((current) => [...current, newCondo]);
  }

  updateCondominium(updatedCondo: Condominium): void {
    this._condominiums.update((current) =>
      current.map((condo) =>
        condo.id === updatedCondo.id ? updatedCondo : condo,
      ),
    );
  }
}
