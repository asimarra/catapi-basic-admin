import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { ToastrService } from 'ngx-toastr';
import { INotifyData } from '../interfaces/INotify';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(private socket: Socket, private toastr: ToastrService, private router: Router) {
    this.attachSocketListener()
  }

  attachSocketListener() {
    this.socket.on('notify', (data: INotifyData) => {
      // console.log('Emitted from server ', data)
      this.toastr.info(data.message, data.title);
    })
  }

  login(idUser: number, idProfile: number): void {
    this.socket.emit('logged-in', idUser, idProfile);
  }

  logout(idUser: number): void {
    this.socket.emit('logout', idUser);
  }
}
