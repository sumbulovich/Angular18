import { effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import {
  getState,
  patchState,
  signalStoreFeature,
  withHooks,
} from '@ngrx/signals';

export function withStorageSync(
  id: string,
  key?: string,
  storageFactory = () => localStorage,
) {
  return signalStoreFeature(
    withHooks({
      onInit(store, platformId = inject(PLATFORM_ID)) {
        if (isPlatformServer(platformId)) return;

        const storage = storageFactory();
        const stateStr = storage.getItem(id);
        if (stateStr) {
          const state: Record<string, any> = JSON.parse(stateStr);
          patchState(store, key ? { [key]: state[key] } : state);
        }

        effect(() => {
          const state: Record<string, any> = getState(store);
          storage.setItem(id, JSON.stringify(key ? { [key]: state[key] } : state));
        });
      }
    }),
  );
}
