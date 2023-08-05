// socket.service.ts

import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(
      'http://neurobrave-task-server-42c104f7d364.herokuapp.com/'
    );
  }

  getSocket(): Socket {
    return this.socket;
  }
}
