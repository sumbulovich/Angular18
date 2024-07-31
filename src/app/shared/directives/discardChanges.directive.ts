import { Directive, Input, inject, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';
import { MatButton } from '@angular/material/button';

@Directive({
  selector: '[discardChanges]',
  standalone: true,
  host: {
    '(mousedown)': 'openDialog($event)'
  }

})
export class DiscardChangesDirective {
  @Input() discardChangesDisabled?: boolean;
  @Input() discardChangesMessage: string = 'Do you want discard changes?';
  readonly dialog = inject(MatDialog);

  constructor(private el: ElementRef) {}

  openDialog(event: MouseEvent): void {
    if (this.discardChangesDisabled) return;
    event.preventDefault();
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: 'Discard changes',
        content: this.discardChangesMessage,
        btnText: 'Discard'
      }
    });
    dialogRef.afterClosed().subscribe((value: any) => {
      if (value) (this.el.nativeElement as any).click();
    });
  }
 }
