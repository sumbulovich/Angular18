import { Component, InputSignal, OutputEmitterRef, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { AuthDirective } from '@app/core/auth/directives/auth.directive';
import { AccountComponent } from "../account/account.component";
import { ThemeToggleComponent } from "../theme-toggle/theme-toggle.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatIconModule, MatButtonModule, AuthDirective, AccountComponent, ThemeToggleComponent],
  // providers: [AuthStore],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isMobile: InputSignal<boolean> = input.required<boolean>()
  toggleSidenav: OutputEmitterRef<void> = output<void>()
}
