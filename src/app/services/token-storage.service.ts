import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
const { storageKeys } = environment

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  signOut(): void {
    window.localStorage.clear();
  }

  public saveToken(token: string): void {
    console.log({ token })
    window.localStorage.removeItem(storageKeys.TOKEN_KEY);
    window.localStorage.setItem(storageKeys.TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.localStorage.getItem(storageKeys.TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(storageKeys.USER_KEY);
    window.localStorage.setItem(storageKeys.USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.localStorage.getItem(storageKeys.USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  public getIdUserAndIdProfile(): any {
    const user = this.getUser();
    if (user && user.userData) {
      return { idUser: user.userData.idUser, idProfile: user.userData.idProfile }
    }

    return null
  }
}
