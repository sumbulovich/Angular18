import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EllipsisTooltipDirective } from '@app/shared/directives/ellipsisTooltip.directive';
import { Place } from './models/place.model';
import { PlacesStore } from './state/places.store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-places',
  standalone: true,
  imports: [EllipsisTooltipDirective, MatTooltipModule, MatProgressSpinnerModule],
  templateUrl: './places.component.html',
  styleUrl: './places.component.scss'
})
export class PlacesComponent implements OnInit {
  placesStore = inject(PlacesStore)
  places: WritableSignal<Place[]> = signal<Place[]>([]);

  ngOnInit(): void {
    this.placesStore.get();
  }

  onSelectPlace(place: Place): void {

  }
}
