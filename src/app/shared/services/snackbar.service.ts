import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private snackBar = inject(MatSnackBar);

  open(
    type: 'info' | 'success' | 'error',
    title: string,
    content: string,
  ): void {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      data: { title, content, type },
    });
  }
}
