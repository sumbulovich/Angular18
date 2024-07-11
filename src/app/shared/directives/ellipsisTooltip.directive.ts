import { Directive, ElementRef, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Directive({
  selector: '[ellipsisTooltip] [matTooltip]',
  standalone: true
})
export class EllipsisTooltipDirective implements OnInit, OnDestroy {
  @Input() ellipsisTooltipDisabled?: boolean | '';
  private observer?: MutationObserver;

  constructor(private matTooltip: MatTooltip, private el: ElementRef<HTMLElement>) {
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
    this.matTooltip.disabled = isTooltipDisabled || this.el.nativeElement.offsetWidth >= this.el.nativeElement.scrollWidth;
  }

  ngOnInit(): void {
    // Adds the truncate class to the element to show the ellipsis
    this.el.nativeElement.classList.add('truncate');

    // Do not set tooltip message is already set
    if (this.matTooltip.message) return;

    // Create a new instance of MutationObserver
    if (typeof MutationObserver === "undefined") return;
    this.observer = new MutationObserver((mutations: MutationRecord[]) => {
      mutations.forEach(mutation => {
        if (mutation.type === 'characterData' || mutation.type === 'childList') {
          this.matTooltip.message = this.el.nativeElement.textContent || '';
        }
      });
    });
    // Start observing the element for text changes
    this.observer.observe(this.el.nativeElement, {
      characterData: true,
      childList: true,
      subtree: true
    });
  }

  ngOnDestroy(): void {
    // Disconnect the observer when the directive is destroyed
    this.observer?.disconnect();
  }
}
