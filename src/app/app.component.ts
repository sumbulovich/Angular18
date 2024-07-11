import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLinkActive, RouterModule, RouterOutlet, Routes } from '@angular/router';
import { HeaderComponent } from './core/layout/components/header/header.component';
import { MatListModule } from '@angular/material/list';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HeaderComponent, MatSidenavModule, MatListModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  darkMediaQuery: MediaQueryList;
  mobileMediaQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  routes: Routes = [];

  constructor(changeDetectorRef: ChangeDetectorRef, mediaMatcher: MediaMatcher) {
    // Get Routes
    this.routes = routes;

    // Set Dark theme
    this.darkMediaQuery = mediaMatcher.matchMedia('(prefers-color-scheme: dark)');

    // Toggle sidenav
    this.mobileMediaQuery = mediaMatcher.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    if (this.mobileMediaQuery?.addEventListener) this.mobileMediaQuery.addEventListener('change', this._mobileQueryListener);
    else this.mobileMediaQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    if (this.mobileMediaQuery?.removeEventListener) this.mobileMediaQuery.removeEventListener('change', this._mobileQueryListener);
    else this.mobileMediaQuery.removeListener(this._mobileQueryListener);
  }
}
