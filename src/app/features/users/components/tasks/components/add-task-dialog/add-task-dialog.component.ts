import { JsonPipe } from '@angular/common';
import { Component, DestroyRef, InputSignal, OnInit, inject, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DialogComponent } from '@app/shared/components/dialog/dialog.component';
import { Task, TaskStatus } from '../../models/task.model';

@Component({
  selector: 'app-add-task-dialog',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    JsonPipe
  ],
  templateUrl: './add-task-dialog.component.html',
  styleUrl: './add-task-dialog.component.scss'
})
export class AddTaskDialogComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  readonly dialogRef: MatDialogRef<DialogComponent> = inject(MatDialogRef<DialogComponent>);
  submit$ = this.dialogRef.componentInstance.submit.asObservable();
  task: InputSignal<Task> = input.required<Task>();
  today: Date = new Date();
  form = new FormGroup({
    title: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    summary: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    dueDate: new FormControl<Date | undefined>(undefined, { nonNullable: true, validators: Validators.required }),
    status: new FormControl<TaskStatus>('open', { nonNullable: true })
  });

  ngOnInit(): void {
    this.form.patchValue(this.task());
    // Listen to submit event on DialogComponent
    const subscription = this.submit$?.subscribe(() => this.onSubmit());
    this.destroyRef.onDestroy(() => subscription?.unsubscribe());
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    this.dialogRef.close({ ...this.task(), ...this.form.value });
  }
}
