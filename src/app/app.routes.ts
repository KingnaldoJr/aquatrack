import { Routes } from '@angular/router';
import { DashboardPageComponent } from './features/dashboard/dashboard-page.component';
import { CondominiumsPageComponent } from './features/condominiums/condominiums-page.component';
import { HousesPageComponent } from './features/houses/houses-page.component';
import { DataEntryPageComponent } from './features/data-entry/data-entry-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardPageComponent },
  { path: 'condominiums', component: CondominiumsPageComponent },
  { path: 'condominium/:condominiumId/houses', component: HousesPageComponent },
  { path: 'data-entry', component: DataEntryPageComponent },
];
