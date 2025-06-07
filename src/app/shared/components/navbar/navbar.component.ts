import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterModule,
    NgOptimizedImage,
    IconComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  menuItems = [
    { label: 'Dashboard', route: '/dashboard' },
    { label: 'Condominiums', route: '/condominiums' },
    { label: 'Houses', route: '/houses' },
    { label: 'Consumption', route: '/data-entry' },
  ];
}
