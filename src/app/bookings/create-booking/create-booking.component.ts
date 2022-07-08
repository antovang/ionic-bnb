import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Place } from '../../places/place.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {formatDate, Location} from '@angular/common';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss']
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedPlace: Place;
  form: FormGroup;

  constructor(
      private modalCtrl: ModalController,
      private _location: Location
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      lastname: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      dateFrom: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      dateTo: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onBookPlace() {
    if (!this.form.valid) {
      return;
    }
    this.modalCtrl.dismiss({
      date: formatDate(new Date(this.form.value.dateFrom), 'dd/MM/yyyy', 'fr'),
      days: Math.ceil((new Date(this.form.value.dateTo).getTime() - (new Date(this.form.value.dateFrom).getTime())) / (1000 * 3600 * 24))
    }, 'confirm');
    this._location.back();
  }
}
