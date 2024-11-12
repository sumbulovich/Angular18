import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EllipsisTooltipDirective } from '@app/shared/directives/ellipsisTooltip.directive';
import { environment } from '@env/environment';
import { PlacesStore } from './state/places.store';
import { UserPlacesStore } from './state/userPlaces.store';

@Component({
  standalone: true,
  imports: [EllipsisTooltipDirective, MatTooltipModule, MatProgressSpinnerModule, MatCardModule],
  templateUrl: './places.component.html',
  styleUrl: './places.component.scss'
})
export class PlacesComponent implements OnInit {
  placesStore = inject(PlacesStore);
  userPlacesStore = inject(UserPlacesStore);
  urlImages = `${environment.apiUrl}/public/places/`;

  ngOnInit(): void {
    this.placesStore.loadPlaces();
    this.userPlacesStore.loadUserPlaces();
  }
}
