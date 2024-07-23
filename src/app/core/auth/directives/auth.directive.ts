import { Permission } from './../models/permission.model';
import { Directive, TemplateRef, ViewContainerRef, effect, inject, input } from '@angular/core';
import { AuthStore } from '../state/auth.store';

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

      if (this.isAuth() === this.authStore.isAuth() || this.isAuth() === this.authStore.permission()) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainerRef.clear();
      }
    })
  }

}
