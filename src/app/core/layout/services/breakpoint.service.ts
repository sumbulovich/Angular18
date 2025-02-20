import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { inject, Injectable } from '@angular/core';
import { setBreakpoint } from '../state/layout.actions';
import { Store } from '@ngrx/store';

@Injectable()
export class BreakpointService {
  private breakpointObserver = inject(BreakpointObserver);
  private store = inject(Store);

  observeBreakpoints() {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((result) => {
        // Check which breakpoint is active and update the store
        const breakpoint = Object.keys(result.breakpoints).find(
          (key) => result.breakpoints[key],
        );
        if (breakpoint) this.store.dispatch(setBreakpoint({ breakpoint }));
      });
  }
}
