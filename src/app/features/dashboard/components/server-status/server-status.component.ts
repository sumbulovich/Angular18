import { AsyncPipe, NgClass } from '@angular/common';
import { Component, DestroyRef, OnInit, Signal, WritableSignal, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { WebsocketService } from '@app/shared/services/websocket.service';
import { Observable, interval } from 'rxjs';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [NgClass, AsyncPipe, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.scss'
})
export class ServerStatusComponent {
  private destroyRef: DestroyRef = inject(DestroyRef)
  // Convert a Signal in to an Observable (it subscribes when signal changes)
  status: WritableSignal<'online' | 'offline' | 'paused'> = signal('paused');
  status$: Observable<"online" | "offline" | "paused"> = toObservable(this.status);
  // Convert an Observable in to a Signal
  interval$: Observable<number> = interval(1000)
  interval: Signal<number> = toSignal(this.interval$, { initialValue: 0 });
  websocketService: WebsocketService = inject(WebsocketService);
  isPaused: boolean = true;

  constructor() {
    // Server Side Render (SSR) needs call this method to start on the client side only
    // afterNextRender(() => {
    // setInterval(() => { ... })
    // });
    const subscription = this.websocketService.getMessages().subscribe((message) => {
      this.status.set(message.status);
      this.isPaused = message.status === 'paused';
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  toggleStatus(): void {
    const data = this.isPaused ? 'resume' : 'pause';
    this.websocketService.sendMessage({ data });
    this.isPaused = true;
  }
}
