import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {PlacesService} from '../../places.service';
import {Place} from '../../place.model';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss']
})
export class NewOfferPage implements OnInit {
  form: FormGroup;

  constructor(
      private _location: Location,
      private placesService: PlacesService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)]
      }),
      price: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)]
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

  onCreateOffer() {
    if (!this.form.valid) {
      return;
    }
    this.placesService.addPlace(
        new Place(
            null,
            this.form.value.title,
            this.form.value.description,
            'https://picsum.photos/seed/picsum/200/300',
            this.form.value.price,
            true
        )
    );
    this._location.back();
  }
}
