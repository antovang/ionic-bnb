import {Injectable} from '@angular/core';

import {Place} from './place.model';
import {AuthService} from '../auth/auth.service';
import {NativeStorage} from '@ionic-native/native-storage/ngx';

@Injectable({
    providedIn: 'root'
})
export class PlacesService {
    private _places: Place[] = [
        new Place(
            'p1',
            'antovang@gmail.com',
            'Chalet Cartusien',
            'The place to be.',
            'https://a0.muscache.com/im/pictures/miso/Hosting-23976121/original/0832bc7e-8c9f-45a5-ba50-d82db5dbf2e9.jpeg?im_w=720',
            219.99,
        ),
        new Place(
            'p2',
            'antovang@gmail.com',
            'Pension Manhattan',
            'Au coeur de New York.',
            'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
            149.99,
        ),
        new Place(
            'p3',
            'antovang@gmail.com',
            'L\'Amour Toujours',
            'Endroit romantique à Paris.',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Paris_Night.jpg/1024px-Paris_Night.jpg',
            189.99,
        ),
        new Place(
            'p4',
            'admin@gmail.com',
            'Palace des Brumes',
            'Le fog de San Francisco.',
            'https://upload.wikimedia.org/wikipedia/commons/0/01/San_Francisco_with_two_bridges_and_the_fog.jpg',
            99.99,
        ),
        new Place(
            'p5',
            'admin@gmail.com',
            'Datcha Moscovite',
            'A 2 pas de la place rouge.',
            'http://linguarik.com/wp-content/uploads/2019/10/1-datcha-bf0a0-f8c7a.jpg',
            119.99,
        )
    ];

    constructor(
        private authService: AuthService,
        private nativeStorage: NativeStorage,
    ) {
        this.getPlacesOnLocalStorage()
            .then(
                data => {
                    console.log('Places récupérées depuis le local storage');
                    this._places = [];
                    data.map(
                        elem => {
                            this._places.push(new Place(elem.id, elem.userId, elem.title, elem.description, elem.imageUrl, elem.price));
                        }
                    );
                },
                () => {
                    console.log('Enregistrement de places dans le local storage');
                    this.setPlacesOnLocalStorage()
                        .then(
                            () => console.log('Enregistrement effectué avec succès'),
                            error => console.error('Erreur lors de l\'enregistrement', error)
                        );
                }
            );
    }

    get otherPlaces() {
        return this._places.filter(p => p.userId !== this.authService.userId);
    }

    get myPlaces() {
        return this._places.filter(p => p.userId === this.authService.userId);
    }

    public addPlace(place: Place) {
        // on attribue un id en fonction du dernier élément de la liste
        place.id = 'p' + (+this._places[this._places.length - 1].id.split('p')[1] + 1);
        this._places.push(place);
        this.setPlacesOnLocalStorage()
            .then(
                () => console.log('Enregistrement effectué'),
                error => console.error('Erreur lors de l\'enregistrement', error)
            );
    }

    public getPlace(id: string) {
        return {...this._places.find(p => p.id === id)};
    }

    public getPlacesOnLocalStorage(): Promise<any> {
        return this.nativeStorage.getItem('places');
    }

    public setPlacesOnLocalStorage(): Promise<any> {
        return this.nativeStorage.setItem('places', Object.assign(this._places, {}));
    }
}
