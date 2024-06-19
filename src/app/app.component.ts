import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/layout/components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, MatSidenavModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  darkMediaQuery: MediaQueryList;
  mobileMediaQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

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
