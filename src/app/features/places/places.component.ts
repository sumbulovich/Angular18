import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EllipsisTooltipDirective } from '@app/shared/directives/ellipsisTooltip.directive';
import { Place } from './models/place.model';
import { PlacesStore } from './state/places.store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { JsonPipe } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-places',
  standalone: true,
  imports: [EllipsisTooltipDirective, MatTooltipModule, MatProgressSpinnerModule, MatDividerModule, JsonPipe],
  templateUrl: './places.component.html',
  styleUrl: './places.component.scss'
})
export class PlacesComponent implements OnInit {
  placesStore = inject(PlacesStore)

  ngOnInit(): void {
    this.placesStore.loadPlaces();
    this.placesStore.loadUserPlaces();
  }

  onSelectPlace(place: Place): void {
    this.placesStore.addUserPlace(place);
  }
}
