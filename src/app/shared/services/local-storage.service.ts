import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  localStorage?: Storage;

  constructor(@Inject(PLATFORM_ID) private platformId: object, @Inject(DOCUMENT) document: Document) {
    // Check if running in the browser or in the server (SSR)
    // isPlatformServer(platformId)
    if (isPlatformBrowser(this.platformId)) this.localStorage = document.defaultView?.localStorage;
  }

  getItem(key: string): any | undefined {
    const value = this.localStorage?.getItem(key);
    return value ? JSON.parse(value) : undefined;
  }

  setItem(key: string, value: any): void {
    this.localStorage?.setItem(key, JSON.stringify(value));
  }

  updateItem(key: string, value: any): void {
    let storageData = this.getItem(key) || {};
    storageData = { ...storageData, ...value };
    this.setItem(key, storageData);
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
