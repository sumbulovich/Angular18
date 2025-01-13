import { Breakpoints } from '@angular/cdk/layout';
import { Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { HeaderComponent } from './core/layout/components/header/header.component';
import { SidenavComponent } from './core/layout/components/sidenav/sidenav.component';
import { layoutFeature } from './core/layout/state/layout.reducer';
import { BreakpointService } from './core/layout/services/breakpoint.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, MatSidenavModule, SidenavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [BreakpointService] // This service will be used only here
})
export class AppComponent {
  private store = inject(Store);
  // Convert Observable to Signal (Also read about toObservable())
  private isMobile$ = this.store.select(layoutFeature.selectBreakpoint).pipe((map((m) =>
    [Breakpoints.Small, Breakpoints.XSmall].includes(m)
  )))
  isMobile: Signal<boolean> = toSignal(this.isMobile$, { initialValue: false });

  // Set breakpoint on the store
  constructor(private breakpointService: BreakpointService) {
    this.breakpointService.observeBreakpoints();
  }
}
