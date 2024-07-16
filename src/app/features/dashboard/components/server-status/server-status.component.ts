import { AsyncPipe } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, OnDestroy, OnInit, WritableSignal, afterNextRender, afterRender, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Observable, Subscription, interval, map, timer } from 'rxjs';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [AsyncPipe, MatCardModule, MatIconModule],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.scss'
})
export class ServerStatusComponent {
  status: WritableSignal<'online' | 'offline' | 'unknown'> = signal('offline');
  interval?: NodeJS.Timeout;
  private destroyRef: DestroyRef = inject(DestroyRef)

  constructor() {
    // Server Side Render (SSR) needs call this method to start interval on the client side only
    afterNextRender(() => {
      this.interval = setInterval(() => {
        const rdm: number = Math.random();
        if (rdm < .5) this.status.set('online');
        else if (rdm < .9) this.status.set('offline');
        else this.status.set('unknown');
      }, 1000);
    });

    this.destroyRef.onDestroy(() => {
      clearInterval(this.interval)
    });
  }
}
