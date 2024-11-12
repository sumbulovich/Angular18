import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, DestroyRef, InputSignal, OnInit, Signal, WritableSignal, effect, inject, input, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DiscardChangesDirective } from '@app/shared/directives/discardChanges.directive';
import { SaveChangesDirective } from '@app/shared/directives/saveChanges.directive';
import { Ticket } from '../../models/ticket.model';
import { TicketsStore } from '../../state/tickets.store';

@Component({
  selector: 'app-add-ticket',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule, DiscardChangesDirective, SaveChangesDirective, RouterLink],
  templateUrl: './add-ticket.component.html',
  styleUrl: './add-ticket.component.scss'
})
export class AddTicketComponent implements OnInit {
  readonly ticketsStore = inject(TicketsStore);
  private destroyRef = inject(DestroyRef)
  private form: Signal<NgForm> = viewChild.required<NgForm>('form');
  isFormUpdated: WritableSignal<boolean> = signal(false);
  ticket: InputSignal<Ticket | undefined> = input<Ticket | undefined>();
  file?: File;

  constructor(router: Router, route: ActivatedRoute) {
    this.destroyRef.onDestroy(() => this.ticketsStore.setSelectedEntityId(undefined));

    // Navigate once request is completed
    effect(() => {
      if (this.ticketsStore.isCompleted() && this.form().submitted) {
        this.isFormUpdated.set(false); // Disable canDeactivate
        router.navigate(['../'], { relativeTo: route })
      }
    }, { allowSignalWrites: true });
  }

  ngOnInit(): void {
    setTimeout(() => {
      const initialFormValue = {
        title: this.ticket()?.title || '',
        request: this.ticket()?.request || '',
        image: this.ticket()?.image || ''
      }

      this.form().setValue(initialFormValue);
      this.form().valueChanges?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
        const isUpdated = JSON.stringify(value) !== JSON.stringify(initialFormValue);
        this.isFormUpdated.set(isUpdated);
      });
    });
  }

  onSubmit(): void {
    if (this.form().invalid) return;
    this.ticket() ? this.editTicket() : this.addTicket();
  }

  addTicket(): void {
    const ticket: Ticket = { ...this.form().value, status: 'open', file: this.file };
    if (this.file) ticket.image = '';

    this.ticketsStore.addTicket(ticket);
  }

  editTicket(): void {
    const ticket: Ticket = { ...this.ticket(), ...this.form().value, file: this.file };
    if (this.file) ticket.image = '';

    this.ticketsStore.editTicket(ticket);
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files?.item(0);
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => this.form().controls['image'].setValue(reader.result);
    reader.readAsDataURL(file)
    this.file = file;
  }

  onResetImage() {
    this.file = undefined;
    this.form().controls['image'].reset();
  }
}
