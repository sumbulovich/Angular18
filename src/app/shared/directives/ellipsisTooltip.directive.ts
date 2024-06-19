import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Directive({
  selector: '[ellipsisTooltip] [matTooltip]',
  standalone: true
})
export class EllipsisTooltipDirective {
  @Input() ellipsisTooltipDisabled?: boolean | '';

  constructor(private matTooltip: MatTooltip, private elementRef: ElementRef<HTMLElement>) {
    // Adds the truncate class to the element to show the ellipsis
    this.elementRef.nativeElement.classList.add('truncate');
    if (!this.matTooltip.message) this.matTooltip.message = elementRef.nativeElement.textContent || '';
  }

  /**
   * Listens for the mouseenter event and shows the tooltip when the offsetWidth is greater
   * than the scrollWidth. This indicates to the directive that the ellipsis is being shown
   * and so we will show the tooltip by setting the tooltip disabled state to this condition.
   */
  @HostListener('mouseenter', ['$event'])
  setTooltipState(): void {
    // If the disabled flag is true then don't do anything
    const isTooltipDisabled = this.ellipsisTooltipDisabled || this.ellipsisTooltipDisabled === '';
    this.matTooltip.disabled = isTooltipDisabled || this.elementRef.nativeElement.offsetWidth >= this.elementRef.nativeElement.scrollWidth;
  }
}
