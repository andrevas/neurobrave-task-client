import { Component } from '@angular/core';
import { StreamerComponent } from './streamer.component';

@Component({
  selector: 'app-mouse-position-streamer',
  template: `
    <div>
      <h1>Mouse Position</h1>
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
export class MousePositionStreamerComponent extends StreamerComponent {
  public mousePosition = { x: 0, y: 0 };

  protected override getData(): any {
    return { ...this.mousePosition };
  }

  protected override sendData(): void {
    this.socket.emit('add-mouse-pos', { buffer: this.buffer });
  }

  public toggleStreaming(): void {
    this.isStreaming = !this.isStreaming;
    if (this.isStreaming) {
      this.addMouseMoveListener();
      super.startStreaming();
    } else {
      super.stopStreaming();
      this.removeMouseMoveListener();
    }
  }

  private addMouseMoveListener(): void {
    document.addEventListener('mousemove', this.handleMouseMove);
  }

  private removeMouseMoveListener(): void {
    document.removeEventListener('mousemove', this.handleMouseMove);
  }

  private handleMouseMove = (event: MouseEvent) => {
    this.mousePosition = { x: event.clientX, y: event.clientY };
  };
}
