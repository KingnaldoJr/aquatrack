import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CondominiumListComponent } from './components/condominium-list/condominium-list.component';
import { CondominiumDialogComponent } from './components/condominium-dialog/condominium-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Condominium } from '../../shared/models/condominium.model';
import { CondominiumStateService } from '../../core/services/condominium-state.service';

@Component({
  selector: 'app-condominiums-page',
  standalone: true,
  imports: [
    CommonModule,
    CondominiumListComponent,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './condominiums-page.component.html',
  styleUrl: './condominiums-page.component.scss',
})
export class CondominiumsPageComponent {
  private condominiumState = inject(CondominiumStateService);
  private dialog = inject(MatDialog);

  condominiums = this.condominiumState.condominiums;

  onAddCondominium(): void {
    this.openDialog();
  }

  onEditCondominium(condominium: Condominium): void {
    this.openDialog(condominium);
  }

  private openDialog(data?: Condominium): void {
    const dialogRef = this.dialog.open(CondominiumDialogComponent, {
      width: '500px',
      data: data ? { ...data } : null,
    });

    dialogRef
      .afterClosed()
      .subscribe(
        (result: Omit<Condominium, 'id'> | Condominium | undefined) => {
          if (result) {
            if ('id' in result) {
              this.condominiumState.updateCondominium(result as Condominium);
            } else {
              this.condominiumState.addCondominium(
                result as Omit<Condominium, 'id'>,
              );
            }
          }
        },
      );
  }
}
