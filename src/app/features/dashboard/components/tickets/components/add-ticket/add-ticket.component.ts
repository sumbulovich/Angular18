import { AfterViewInit, Component, ModelSignal, OnInit, OutputEmitterRef, Signal, afterNextRender, computed, effect, model, output, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Ticket } from '../../models/ticket.model';
import { DiscardChangesDirective } from '@app/shared/directives/discardChanges.directive';
import { SaveChangesDirective } from '@app/shared/directives/saveChanges.directive';
import { Observable, map } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-add-ticket',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, DiscardChangesDirective, SaveChangesDirective, AsyncPipe, JsonPipe],
  templateUrl: './add-ticket.component.html',
  styleUrl: './add-ticket.component.scss'
})
export class AddTicketComponent implements OnInit {
  private form: Signal<NgForm> = viewChild.required<NgForm>('form');
  isFormUpdated$?: Observable<boolean>;
  create: OutputEmitterRef<Ticket> = output<Ticket>();
  edit: OutputEmitterRef<void> = output<void>();
  cancel: OutputEmitterRef<void> = output<void>();
  // @Input() ticket, @Output() ticketChange
  ticket: ModelSignal<Ticket | undefined> = model<Ticket | undefined>();

  ngOnInit(): void {
    setTimeout(() => {
      if (this.ticket()) this.form().setValue({ title: this.ticket()?.title, request: this.ticket()?.request });
      const initialFormValue = { ...this.form().value }
      this.isFormUpdated$ = this.form().valueChanges?.pipe(map((m) => JSON.stringify(m) !== JSON.stringify(initialFormValue)))
    });
  }

  onSubmit(): void {
    if (this.form().invalid) return;
    if (this.ticket()) this.editTicket();
    else this.addTicket();
  }

  editTicket(): void {
    this.ticket.update((ticket?: Ticket) => ({ ...ticket, ...this.form().value }));
    this.edit.emit();
  }

  addTicket(): void {
    const ticket: Ticket = {
      id: Math.floor(Math.random() * 100),
      status: 'open',
      ...this.form().value,
    };
    this.create.emit(ticket);
  }
}
