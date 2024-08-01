import { Injectable, inject } from '@angular/core';
import { HttpService } from '@app/shared/services/http.service';
import { Observable, map } from 'rxjs';
import { Place } from '../models/place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private httpService: HttpService = inject(HttpService);
  private readonly url: string = 'http://localhost:3000';

  constructor() { }

  getPlaces(): Observable<Place[]> {
    return this.httpService.get<{ places: Place[] }>(`${this.url}/places`)
      .pipe((map((m) => m.places)));
  }

  getUserPlaces(): Observable<Place[]> {
    return this.httpService.get<{ places: Place[] }>(`${this.url}/user-places`)
      .pipe((map((m) => m.places)));
  }

  addUserPlace(place: Place): Observable<Place[]> {
    return this.httpService.put<{ userPlaces: Place[] }>(`${this.url}/user-places`, { placeId: place.id })
      .pipe((map((m) => m.userPlaces)));
  }
}
