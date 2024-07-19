import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogComponent } from '@app/shared/components/dialog/dialog.component';
import { Task } from '../../models/task.model';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-add-task-dialog',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule
  ],
  templateUrl: './add-task-dialog.component.html',
  styleUrl: './add-task-dialog.component.scss'
})
export class AddTaskDialogComponent {
  readonly dialogRef: MatDialogRef<DialogComponent> = inject(MatDialogRef<DialogComponent>);
  readonly data: Task = inject<Task>(MAT_DIALOG_DATA);
  readonly today: Date = new Date();
  form: FormGroup = new FormGroup({
    title: new FormControl<string>('', Validators.required),
    summary: new FormControl<string>('', Validators.required),
    dueDate: new FormControl<Date | null>(null, Validators.required)
  });

  constructor() {
    this.dialogRef.componentInstance.submit.subscribe(() => this.onSubmit());
    if (this.data.title) this.form.patchValue(this.data);
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    const task: Task = { ...this.data, ...this.form.value, date: this.data.date || new Date() };
    this.dialogRef.close(task);
  }
}
