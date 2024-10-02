import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksManagementComponent } from './tasks-management.component';

describe('TasksManagement', () => {
  let component: TasksManagementComponent;
  let fixture: ComponentFixture<TasksManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
