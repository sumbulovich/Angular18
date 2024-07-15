import { NgComponentOutlet } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { DialogData } from '@app/shared/models/dialog-data.model';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [NgComponentOutlet, MatDialogModule, MatIconModule, MatButtonModule, MatFormFieldModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  dialogData?: DialogData;
  submit: EventEmitter<void> = new EventEmitter<void>();
}
