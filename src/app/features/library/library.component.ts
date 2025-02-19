import { Component, effect, inject, WritableSignal } from '@angular/core';
import { TaskListComponent, Task} from '@sumbulnpm/storybook-taskbox-lib'
import { LibraryService } from './services/library.service';

@Component({
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss',
  standalone: true,
  imports: [TaskListComponent]
})
export class LibraryComponent {
  private taskService: LibraryService = inject(LibraryService)
  tasks: WritableSignal<Task[]> = this.taskService.tasks;
  isLoading: WritableSignal<boolean> = this.taskService.isLoading;
  error: WritableSignal<boolean> = this.taskService.error;
  
  /**
   * Component method to trigger the archiveTask event
   */
  archiveTask(id: any) {
    this.taskService.archiveTask(id);
  }

  /**
   * Component method to trigger the pinTask event
   */
  pinTask(id: any) {
    this.taskService.pinTask(id);
  }
}
