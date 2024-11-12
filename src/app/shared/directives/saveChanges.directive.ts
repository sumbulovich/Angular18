import { Directive, ElementRef, Input, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';

@Directive({
  selector: '[saveChanges]',
  standalone: true,
  host: {
    '(mousedown)': 'openDialog($event)'
  }

})
export class SaveChangesDirective {
  @Input() saveChangesDisabled?: boolean;
  @Input() saveChangesMessage = 'Do you want save changes?';
  private dialog = inject(MatDialog);

  constructor(private el: ElementRef) { }

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
