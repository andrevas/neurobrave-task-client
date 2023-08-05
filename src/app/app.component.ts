// app.component.ts

import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Socket } from 'socket.io-client';
import { CpuLoadGraphComponent } from './components/graphs/cpu-load-graph.component';
import { MousePositionGraphComponent } from './components/graphs/mouse-pos-graph.component';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <p>Socket Status: {{ isConnected ? 'Connected' : 'Not Connected' }}</p>
      <div class="grid-container">
        <app-mouse-position-streamer
          [socket]="socket"
        ></app-mouse-position-streamer>
        <app-cpu-load-streamer [socket]="socket"></app-cpu-load-streamer>
      </div>
      <div class="grid-container">
        <mouse-pos-graph></mouse-pos-graph>
        <cpu-load-graph></cpu-load-graph>
      </div>
    </div>
  `,
  styles: [
    `
      .grid-container {
        display: grid;
        grid-template-columns: 1fr 1fr; /* Two equal-width columns */
        grid-gap: 20px;
      }
    `,
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  socket!: Socket;
  isConnected = false;

  @ViewChild(CpuLoadGraphComponent)
  cpuLoadGraphComponent!: CpuLoadGraphComponent;
  @ViewChild(MousePositionGraphComponent)
  mousePositionGraphComponent!: MousePositionGraphComponent;

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.socket = this.socketService.getSocket();

    this.socket.on('connect', () => {
      this.isConnected = true;
    });

    this.socket.on('cpu-load', (data) => {
      this.cpuLoadGraphComponent.updateData(data);
    });

    this.socket.on('mouse-pos', (data) => {
      this.mousePositionGraphComponent.updateData(data);
    });

    this.socket.on('disconnect', () => {
      this.isConnected = false;
    });
  }

  ngOnDestroy(): void {
    this.socket.disconnect();
  }
}
