import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { DUMMY_USERS } from '../constants/dummy-users';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()], // Provide HttpClient
    });
    service = TestBed.inject(TasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return tasks', (done: DoneFn) => {
    const userId = DUMMY_USERS[0]._id;
    service.getUserTask(userId);
    setTimeout(() => {
      expect(service.tasks().length).toBeTruthy();
      done();
    }, 500);
  });
});
