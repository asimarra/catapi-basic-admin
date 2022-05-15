import { Component } from '@angular/core';

import { NotifyService } from './services/notify.service';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontEnd';
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(private notifyService: NotifyService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser().basicData;
      this.username = user.username;
    }
  }

  logout(): void {
    const userData = this.tokenStorageService.getUser();
    if (userData) {
      this.notifyService.logout(userData.basicData.idUser);
    }
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
