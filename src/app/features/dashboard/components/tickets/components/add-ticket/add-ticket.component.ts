import { AfterViewInit, Component, InputSignal, ModelSignal, OnInit, OutputEmitterRef, Signal, afterNextRender, computed, effect, input, model, output, viewChild } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Ticket } from '../../models/ticket.model';
import { DiscardChangesDirective } from '@app/shared/directives/discardChanges.directive';
import { SaveChangesDirective } from '@app/shared/directives/saveChanges.directive';
import { Observable, map } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
  cancel: OutputEmitterRef<void> = output<void>();
  inProgress: InputSignal<boolean> = input<boolean>(false);
  // @Input() ticket, @Output() ticketChange
  ticket: ModelSignal<Ticket | undefined> = model<Ticket | undefined>();
  imagePreview?: string;
  file?: File;

  ngOnInit(): void {
    setTimeout(() => {
      if (this.ticket()) {
        this.form().setValue({ title: this.ticket()?.title, request: this.ticket()?.request });
        this.imagePreview = this.ticket()?.image;
      }
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
    const updatedTicket: Ticket = { ...this.form().value, image: this.form().value.image, file: this.file};
    this.ticket.update((ticket?: Ticket) => ({ ...ticket, ...updatedTicket }));
    this.edit.emit();
  }

  addTicket(): void {
    const ticket: Ticket = {
      status: 'open',
      file: this.file,
      ...this.form().value,
    };
    this.create.emit(ticket);
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files?.item(0);
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => this.imagePreview = reader.result?.toString();
    reader.readAsDataURL(file)
    this.file = file
  }

  onResetImage(control: NgModel) {
    control.reset(null);
    this.file = undefined;
    this.imagePreview = undefined;
  }
}
