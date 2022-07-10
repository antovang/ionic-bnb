import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {LoadingController, ToastController} from '@ionic/angular';

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
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
  ) {}

  ngOnInit() {}

  onLogin(email: string) {
    this.isLoading = true;
    this.authService.login();
    this.authService.userId = email;
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
      this.authService.getItemOnLocalStorage(email)
          .then(
              data => {
                if (data.password === password) {
                  this.onLogin(email);
                } else {
                  this.presentToast('Mot de passe incorrect!');
                }
              },
              error => {
                  console.error('Error getting item', error);
                  // J'ai choisi volontairement de ne pas ajouter le mot de passe dans le local storage automatiquement
                  // mais de faire que l'utilisateur s'inscrive
                  this.presentToast('Compte inexistant. Inscrivez vous!');
                  // on change le mode d'authentification pour que l'utilisateur s'inscrive
                  this.isLogin = !this.isLogin;
              }
          );
    } else {
      // On vérifie que le compte n'existe pas
      this.authService.getItemOnLocalStorage(email)
          .then(
              () => {
                  this.presentToast('Votre compte existe déjà !');
              },
              () => {
                  // Si le compte n'existe pas on l'enregistre
                  this.authService.setItemOnLocalStorage(email, password)
                      .then(
                          () => {
                              this.onLogin(email);
                              this.presentToast('Utilisateur enregistré avec succès');
                          },
                          () => {
                              console.error('Error setting item');
                              this.presentToast('Erreur lors de l\'enregistrement');
                          }
                      );
              }
          );
    }
  }

  async presentToast(message: string) {
      const toast = await this.toastCtrl.create({
          message: message,
          duration: 2000
      });
      toast.present();
  }
}
