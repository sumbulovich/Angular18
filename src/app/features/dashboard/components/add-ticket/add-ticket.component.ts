import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, InputSignal, ModelSignal, OnInit, OutputEmitterRef, Signal, input, model, output, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DiscardChangesDirective } from '@app/shared/directives/discardChanges.directive';
import { SaveChangesDirective } from '@app/shared/directives/saveChanges.directive';
import { Observable, map } from 'rxjs';
import { Ticket } from '../../models/ticket.model';

@Component({
  selector: 'app-add-ticket',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule, DiscardChangesDirective, SaveChangesDirective, AsyncPipe, JsonPipe],
  templateUrl: './add-ticket.component.html',
  styleUrl: './add-ticket.component.scss'
})
export class AddTicketComponent implements OnInit {
  private form: Signal<NgForm> = viewChild.required<NgForm>('form');
  isFormUpdated$?: Observable<boolean>;
  create: OutputEmitterRef<Ticket> = output<Ticket>();
  edit: OutputEmitterRef<void> = output<void>();
  close: OutputEmitterRef<void> = output<void>();
  inProgress: InputSignal<boolean> = input<boolean>(false);
  ticket: ModelSignal<Ticket | undefined> = model<Ticket | undefined>(); // @Input() ticket, @Output() ticketChange
  file?: File;

  ngOnInit(): void {
    setTimeout(() => {
      if (this.ticket()) {
        this.form().setValue({
          title: this.ticket()?.title,
          request: this.ticket()?.request,
          image: this.ticket()?.image
        });
      }
      const initialFormValue = { ...this.form().value }
      this.isFormUpdated$ = this.form().valueChanges?.pipe(map((m) => JSON.stringify(m) !== JSON.stringify(initialFormValue)))
    });
  }

  onSubmit(): void {
    if (this.form().invalid) return;
    this.ticket() ? this.editTicket() : this.addTicket();
  }

  addTicket(): void {
    const ticket: Ticket = { ...this.form().value, status: 'open', file: this.file };
    if (this.file) ticket.image = '';

    this.create.emit(ticket);
  }

  editTicket(): void {
    const ticket: Ticket = { ...this.form().value, file: this.file };
    if (this.file) ticket.image = '';

    this.ticket.update((oldTicket?: Ticket) => ({ ...oldTicket, ...ticket }));
    this.edit.emit();
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
