import { NgClass, NgComponentOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackbarData } from '@app/shared/models/snackbar-data.model';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [NgComponentOutlet, NgClass, MatSnackBarModule, MatButtonModule, MatIconModule],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss'
})
export class SnackbarComponent {
  readonly snackBarRef: MatSnackBarRef<SnackbarComponent> = inject(MatSnackBarRef<SnackbarComponent>);
  readonly data?: SnackbarData = inject<SnackbarData>(MAT_SNACK_BAR_DATA);
}
