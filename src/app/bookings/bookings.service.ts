import { Injectable } from '@angular/core';

import {Booking} from './booking.model';
import {AuthService} from '../auth/auth.service';
import {NativeStorage} from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  private _bookings: Booking[] = [
        new Booking(
            'b1',
            'admin@gmail.com',
            'p1',
            '10/10/2022',
            10
        ),
        new Booking(
            'b2',
            'admin@gmail.com',
            'p2',
            '06/07/2022',
            7
        ),
        new Booking(
            'b3',
            'admin@gmail.com',
            'p3',
            '02/09/2022',
            3
        ),
        new Booking(
            'b4',
            'antovang@gmail.com',
            'p3',
            '09/09/2022',
            3
        ),
        new Booking(
            'b5',
            'antovang@gmail.com',
            'p4',
            '12/12/2022',
            3
        )];

  constructor(
      private authService: AuthService,
      private nativeStorage: NativeStorage,
  ) {
      this.getBookingsOnLocalStorage()
          .then(
              data => {
                  console.log('Réservations récupérées depuis le local storage');
                  this._bookings = [];
                  data.map(
                      elem => {
                          this._bookings.push(new Booking(elem.id, elem.userId, elem.placeId, elem.date, elem.nbJours));
                      }
                  );
              },
              () => {
                  console.log('Enregistrement de réservations dans le local storage');
                  this.setBookingsOnLocalStorage()
                      .then(
                          () => console.log('Enregistrement effectué avec succès'),
                          error => console.error('Erreur lors de l\'enregistrement', error)
                      );
              }
          );
  }

  public getBookings() {
      return this._bookings.filter(elem => elem.userId === this.authService.userId);
  }
  // prend la réservation en paramètre et modifie l'id (dernier elem.id + 1)
  public addBooking(booking: Booking) {
      booking.id = 'b' + (+this._bookings[this._bookings.length - 1].id.split('b')[1] + 1);
      this._bookings.push(booking);
      this.setBookingsOnLocalStorage()
          .then(
              () => console.log('Enregistrement effectué'),
              error => console.error('Erreur lors de l\'enregistrement', error)
          );
  }
  // cherche une réservation par ID dans bookings, récupère l'index et l'efface de la liste de réservations
  public deleteBooking(booking: Booking) {
      this._bookings.splice(this._bookings.indexOf(this._bookings.find(elem => elem.id === booking.id)), 1);
      this.setBookingsOnLocalStorage()
          .then(
              () => console.log('Suppression effectué'),
              error => console.error('Erreur lors de la suppression', error)
          );
  }

  public getBookingsOnLocalStorage(): Promise<any> {
    return this.nativeStorage.getItem('bookings');
  }

  public setBookingsOnLocalStorage(): Promise<any> {
    return this.nativeStorage.setItem('bookings', Object.assign(this._bookings, {}));
  }
}
