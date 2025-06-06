import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

import { HouseListComponent } from './components/house-list/house-list.component';
import { HouseDialogComponent } from './components/house-dialog/house-dialog.component';
import { HouseStateService } from '../../core/services/house-state.service';
import { CondominiumStateService } from '../../core/services/condominium-state.service';
import { Condominium } from '../../shared/models/condominium.model';
import { House } from '../../shared/models/house.model';

@Component({
  selector: 'app-houses-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    HouseListComponent,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './houses-page.component.html',
  styleUrl: './houses-page.component.scss'
})
export class HousesPageComponent implements OnInit, OnDestroy {
  private houseState = inject(HouseStateService);
  private condominiumState = inject(CondominiumStateService);
  private dialog = inject(MatDialog);
  private route = inject(ActivatedRoute);
  private routeSub: Subscription | undefined;

  houses = this.houseState.housesForSelectedCondo;
  selectedCondominium: Condominium | undefined;
  selectedCondominiumId: string | null = null;

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.pipe(
      map(params => params.get('condominiumId')),
      filter((id): id is string => id !== null),
      tap(condoId => {
        this.selectedCondominiumId = condoId;
        this.houseState.selectCondominium(condoId);
        this.selectedCondominium = this.condominiumState.condominiums().find(c => c.id === condoId);
      })
    ).subscribe();

    if (!this.selectedCondominiumId) {
        this.houseState.selectCondominium(null);
    }
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  onAddHouse(): void {
    if (!this.selectedCondominiumId) return;
    this.openDialog();
  }

  onEditHouse(house: House): void {
    if (!this.selectedCondominiumId) return;
    this.openDialog(house);
  }

  private openDialog(data?: House): void {
    const dialogRef = this.dialog.open(HouseDialogComponent, {
      width: '500px',
      data: {
        house: data ? { ...data } : null,
        condominiumId: this.selectedCondominiumId
      }
    });

    dialogRef.afterClosed().subscribe((result: Omit<House, 'id'> | House | undefined) => {
      if (result) {
        if ('id' in result) {
          this.houseState.updateHouse(result as House);
        } else {
          this.houseState.addHouse(result as Omit<House, 'id'>);
        }
      }
    });
  }
}
