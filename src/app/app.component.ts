import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { map, Observable } from 'rxjs';
import { HeaderComponent } from './core/layout/components/header/header.component';
import { SidenavComponent } from './core/layout/components/sidenav/sidenav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, MatSidenavModule, SidenavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private breakpointObserver = inject(BreakpointObserver);
  // Observable for media query matches
  isMobile$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset]).pipe(
    map((result) => result.matches)) // Map the result to a boolean

  // Convert Observable to Signal (Also read about toObservable())
  isMobile: Signal<boolean> = toSignal(this.isMobile$, { initialValue: false });
}
