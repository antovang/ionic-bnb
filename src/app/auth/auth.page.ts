import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoadingController } from '@ionic/angular';

import { AuthService } from './auth.service';
import {NativeStorage} from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class AuthPage implements OnInit {
  isLoading = false;
  isLogin = true;

  constructor(
    private nativeStorage: NativeStorage,
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  onLogin() {
    this.isLoading = true;
    this.authService.login();
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Authentification en cours...' })
      .then(loadingEl => {
        loadingEl.present();
        setTimeout(() => {
          this.isLoading = false;
          loadingEl.dismiss();
          this.router.navigateByUrl('/places/tabs/discover');
        }, 1500);
      });
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    console.log(email, password);

    if (this.isLogin) {
      // Send a request to login servers
      this.getItemOnLocalStorage(email)
          .then(
              data => {
                console.log(data);
                if (data.password === password) {
                  this.onLogin();
                }
              },
              error => {
                  console.error('Error getting item', error);
              }
          );
    } else {
      // Send a request to signup servers
      this.setItemOnLocalStorage(email, password)
          .then(
              () => {
                this.onLogin();
                console.log('Stored item!');
              },
              error => console.error('Error storing item', error)
          );
    }
  }

  public getItemOnLocalStorage(email): Promise<any> {
    return this.nativeStorage.getItem(email);
  }

  public setItemOnLocalStorage(email: string, password: string): Promise<any> {
    return this.nativeStorage.setItem(email, {password: password});
  }
}
