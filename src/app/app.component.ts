import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, inject, input, OnDestroy } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule, Routes } from '@angular/router';
import { AuthStore } from '@app/core/auth/state/auth.store';
import { HeaderComponent } from './core/layout/components/header/header.component';
import { SidenavComponent } from './core/layout/components/sidenav/sidenav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HeaderComponent, MatSidenavModule, MatListModule, SidenavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy {
  darkMediaQuery: MediaQueryList;
  mobileMediaQuery: MediaQueryList;
  routes: Routes = [];
  private _mobileQueryListener: () => void;
  readonly authStore = inject(AuthStore);

  constructor(changeDetectorRef: ChangeDetectorRef, mediaMatcher: MediaMatcher) {
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
