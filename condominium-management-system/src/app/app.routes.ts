import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CondominiumsComponent } from './components/condominiums/condominiums.component';
import { HousesComponent } from './components/houses/houses.component';
import { DataEntryComponent } from './components/data-entry/data-entry.component';

export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'condominiums', component: CondominiumsComponent },
    { path: 'houses', component: HousesComponent },
    { path: 'data-entry', component: DataEntryComponent },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' } 
];
