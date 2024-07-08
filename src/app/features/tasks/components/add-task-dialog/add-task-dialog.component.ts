import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-add-task-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose
  ],
  templateUrl: './add-task-dialog.component.html',
  styleUrl: './add-task-dialog.component.scss'
})
export class AddTaskDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AddTaskDialogComponent>);
  readonly data = inject<{ userId: number }>(MAT_DIALOG_DATA);

  form: FormGroup = new FormGroup({
    title: new FormControl<string>('', Validators.required),
    summary: new FormControl<string>(''),
  })

  confirm(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    const task: Task = { ...this.form.value, ...this.data, dueDate: new Date() };
    this.dialogRef.close(task);
  }
}
