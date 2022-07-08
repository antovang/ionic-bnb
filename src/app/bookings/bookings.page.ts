import { Component, OnInit } from '@angular/core';
import {Booking} from './booking.model';
import {BookingsService} from './bookings.service';
import {PlacesService} from '../places/places.service';
import {Place} from '../places/place.model';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  bookings: Booking[];
  places: Place[];
  constructor(
      private bookingsService: BookingsService,
      private placesService: PlacesService,
  ) { }

  ngOnInit() {
    this.bookings = this.bookingsService.getBookings();
    this.places = this.placesService.otherPlaces;
  }
}
