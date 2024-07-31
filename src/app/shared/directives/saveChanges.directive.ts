import { Directive, Input, inject, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';
import { MatButton } from '@angular/material/button';

@Directive({
  selector: '[saveChanges]',
  standalone: true,
  host: {
    '(mousedown)': 'openDialog($event)'
  }

})
export class SaveChangesDirective {
  @Input() saveChangesDisabled?: boolean;
  @Input() saveChangesMessage: string = 'Do you want save changes?';
  readonly dialog = inject(MatDialog);

  constructor(private el: ElementRef) {}

  openDialog(event: MouseEvent): void {
    if (this.saveChangesDisabled) return;
    event.preventDefault();
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: 'Save changes',
        content: this.saveChangesMessage,
        btnText: 'Save'
      }
    });
    dialogRef.afterClosed().subscribe((value: any) => {
      if (value) (this.el.nativeElement as any).click();
    });
  }
 }
