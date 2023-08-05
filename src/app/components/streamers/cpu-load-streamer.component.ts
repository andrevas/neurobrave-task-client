import { Component } from '@angular/core';
import { StreamerComponent } from './streamer.component';

@Component({
  selector: 'app-cpu-load-streamer',
  template: `
    <div>
      <h1>CPU Load</h1>
      <p>
        Generate Period (ms):
        <input
          type="number"
          [(ngModel)]="generatePeriod"
          (input)="updateGenerateInterval()"
        />
      </p>
      <p>
        Send Period (ms):
        <input
          type="number"
          [(ngModel)]="sendPeriod"
          (input)="updateSendInterval()"
        />
      </p>
      <button (click)="toggleStreaming()">
        {{ isStreaming ? 'Stop' : 'Start' }} Stream
      </button>
    </div>
  `,
})
export class CpuLoadStreamerComponent extends StreamerComponent {
  public cpuLoad = 0;

  protected override getData(): any {
    // Generate a random number between 0 and 100 to simulate CPU load
    return { load: Math.floor(Math.random() * 101) };
  }

  protected override sendData(): void {
    this.socket.emit('add-cpu-load', { buffer: this.buffer });
  }

  public toggleStreaming(): void {
    if (this.isStreaming) {
      super.stopStreaming();
    } else {
      this.startStreaming();
    }
  }
}
