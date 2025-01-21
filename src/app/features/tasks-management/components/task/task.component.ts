import { DatePipe, registerLocaleData } from '@angular/common';
import { Component, InputSignal, LOCALE_ID, ModelSignal, OutputEmitterRef, computed, inject, input, model, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthStore } from '@app/core/auth/state/auth.store';
import { EllipsisTooltipDirective } from '@app/shared/directives/ellipsisTooltip.directive';
import { Task, TaskStatus } from '../../models/task.model';
// Registerer new local
import localeEs from '@angular/common/locales/es';
import { AuthUser } from '@app/core/auth/models/authUser.model';
registerLocaleData(localeEs);

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatTooltipModule, EllipsisTooltipDirective, DatePipe, MatTooltipModule, MatSelectModule, MatFormFieldModule],
  // providers: [AuthStore],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  providers: [
    { provide: LOCALE_ID, useValue: 'es-ES' },
    // {
    //   provide: LOCALE_ID,
    //   deps: [SessionService],
    //   useFactory: (sessionService: SessionService) => sessionService.getLocale()
    // }
  ]
})
export class TaskComponent {
  authUser: InputSignal<AuthUser | undefined> = input<AuthUser>()
  task: ModelSignal<Task> = model.required<Task>();
  delete: OutputEmitterRef<void> = output<void>();
  edit: OutputEmitterRef<void> = output<void>();
  isExpired = computed(() => new Date(this.task().dueDate).getTime() < new Date().getTime())

  updateStatus(status: TaskStatus): void {
    this.task.update((task) => ({ ...task, status }));
  }
}
