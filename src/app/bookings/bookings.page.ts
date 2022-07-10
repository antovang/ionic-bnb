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

  // on utilise ionViewWillEnter pour charger la liste de places et réservation à
  // chaque accès à la page
  ionViewWillEnter() {
    this.bookings = this.bookingsService.getBookings();
    this.places = this.placesService.otherPlaces;
  }

  // méthode permettant d'effacer une réservation dans le service on passe
  // par une méthode intermédiaire pour ne pas faire appel au service (private)
  // depuis le template
  public deleteBooking(booking: Booking) {
    this.bookingsService.deleteBooking(booking);
    this.bookings = this.bookingsService.getBookings();
  }

  // on utilise une méhode intermédiaire pour récupérer une place avec un ID donné
  // pour ne pas faire appel au service (private) depuis le template
  public getPlace(placeId: string): Place {
    return this.placesService.getPlace(placeId);
  }
}
