import { Injectable } from '@angular/core';
import {NativeStorage} from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userIsAuthenticated = false;
  private _userId: string;

  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }

  constructor(
      private nativeStorage: NativeStorage,
  ) {}

  login() {
    this._userIsAuthenticated = true;
  }

  logout() {
    this.userId = undefined;
    this._userIsAuthenticated = false;
  }

  get userId(): string {
    return this._userId;
  }

  set userId(value: string) {
    this._userId = value;
  }

  public getItemOnLocalStorage(email): Promise<any> {
    return this.nativeStorage.getItem(email);
  }

  public setItemOnLocalStorage(email: string, password: string): Promise<any> {
    return this.nativeStorage.setItem(email, {password: password});
  }

}
