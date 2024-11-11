
import { PageEvent } from '@angular/material/paginator';
import { signalState, signalStoreFeature, withState } from '@ngrx/signals';


const initialSate = signalState<{ pageEvent: PageEvent }>({
  pageEvent: { pageSize: 5, pageIndex: 0, length: 0 }
});

export function withPagination() {
  return signalStoreFeature(
    withState<{ pageEvent: PageEvent }>(initialSate),
  );
}
