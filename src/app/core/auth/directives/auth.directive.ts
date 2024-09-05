import { Directive, TemplateRef, ViewContainerRef, effect, inject, input } from '@angular/core';
import { AuthStore } from '../state/auth.store';
import { Permission } from '../models/authUser.model';

@Directive({
  selector: '[appAuth]',
  standalone: true
})
export class AuthDirective {
  isAuth = input.required<Permission | boolean>({ alias: 'appAuth' });
  private readonly authStore = inject(AuthStore);
  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);

  constructor() {
    effect(() => {
      if (this.isAuth() === this.authStore.isAuth() || this.isAuth() === this.authStore.user()?.permission) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainerRef.clear();
      }
    })
  }

}
