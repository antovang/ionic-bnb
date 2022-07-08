import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';

import { PlacesService } from '../../places.service';
import { Place } from '../../place.model';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';
import {BookingsService} from '../../../bookings/bookings.service';
import {Booking} from '../../../bookings/booking.model';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss']
})
export class PlaceDetailPage implements OnInit {
  place: Place;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private modalCtrl: ModalController,
    private bookingsService: BookingsService,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      }
      this.place = this.placesService.getPlace(paramMap.get('placeId'));
    });
  }

  onBookPlace() {
    this.modalCtrl
      .create({
        component: CreateBookingComponent, // modale à créer
        componentProps: { selectedPlace: this.place } // données transmises à la modale
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss(); // listener qui renvoie une promesse
      })
      .then(resultData => { // resultData : données transmises par la modale
        console.log(resultData.data, resultData.role);
        if (resultData.role === 'confirm') {
          this.bookingsService.addBooking(new Booking('', this.place.id, resultData.data.date, resultData.data.days));
          console.log('BOOKED!');
        }
      });
  }
}
