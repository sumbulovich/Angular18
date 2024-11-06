import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '@env/environment';
import { Observable, of } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket$?: WebSocketSubject<string>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Check if running in the browser
    if (isPlatformBrowser(this.platformId)) {
      this.socket$ = webSocket<string>(environment.wsUrl);
    }
  }

  // Method to send messages
  sendMessage(msg: any): void {
    this.socket$?.next(msg);
  }

  // Method to receive messages
  getMessages(): Observable<any> {
    return this.socket$?.asObservable() || of(); // Return an empty observable if not connected
  }

  // Method to close the socket
  closeConnection() {
    this.socket$?.complete();
  }
}
