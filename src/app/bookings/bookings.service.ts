import { Injectable } from '@angular/core';

import {Booking} from './booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  private _bookings: Booking[] = [
        new Booking(
            'b1',
            'p1',
            '10/10/2022',
            10
        ),
        new Booking(
            'b2',
            'p2',
            '06/07/2022',
            7
        ),
        new Booking(
            'b3',
            'p3',
            '02/09/2022',
            3
        )];

  constructor() {
  }

  public getBookings() {
      return [...this._bookings];
  }

  public addBooking(booking: Booking) {
      // prend la réservation en paramètre et modifie l'id (dernier elem.id + 1)
      booking.id = 'b' + (+this._bookings[this._bookings.length - 1].id.split('b')[1] + 1);
      this._bookings.push(booking);
  }

  public deleteBooking(booking: Booking) {
      // cherche une réservation par ID dans bookings, récupère l'index et l'efface de la liste de réservations
      this._bookings.splice(this._bookings.indexOf(this._bookings.find(elem => elem.id === booking.id)), 1);
  }
}
