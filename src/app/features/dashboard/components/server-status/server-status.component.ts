import { AsyncPipe, NgClass } from '@angular/common';
import { Component, DestroyRef, OnInit, Signal, WritableSignal, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { WebsocketService } from '@app/shared/services/websocket.service';
import { Observable, interval } from 'rxjs';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [NgClass, AsyncPipe, MatCardModule, MatIconModule],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.scss'
})
export class ServerStatusComponent {
  private destroyRef: DestroyRef = inject(DestroyRef)
  // Convert a Signal in to an Observable (it subscribes when signal changes)
  status: WritableSignal<'online' | 'offline' | 'unknown'> = signal('offline');
  status$: Observable<"online" | "offline" | "unknown"> = toObservable(this.status);
  // Convert an Observable in to a Signal
  interval$: Observable<number> = interval(1000)
  interval: Signal<number> = toSignal(this.interval$, { initialValue: 0 });
  websocketService: WebsocketService = inject(WebsocketService);

  constructor() {
    // Server Side Render (SSR) needs call this method to start on the client side only
    // afterNextRender(() => {
    // setInterval(() => { ... })
    // });

    this.interval = toSignal(this.websocketService.getMessages(), { initialValue: 0 });
    const subscription = this.websocketService.getMessages().subscribe((number) => {
      if (number > 50) this.status.set('online');
      else if (number < 50) this.status.set('offline');
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
