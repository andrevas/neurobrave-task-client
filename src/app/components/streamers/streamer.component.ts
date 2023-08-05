import { Component, Input, OnDestroy } from '@angular/core';
import { Socket } from 'socket.io-client';

@Component({
  selector: 'app-streamer',
  template: '', // We can provide an empty template as we won't be using it directly
})
export class StreamerComponent implements OnDestroy {
  @Input() socket!: Socket;
  protected generateInterval: any;
  protected sendInterval: any;
  protected buffer: any[] = [];
  public isStreaming = false;
  protected generatePeriod = 500;
  protected sendPeriod = 1500;

  private MAX_SEND_PERIOD_MS = 60000;
  private MIN_SEND_PERIOD_MS = 500;
  private MAX_GENERATE_PERIOD_MS = 60000;
  private MIN_GENERATE_PERIOD_MS = 500;

  ngOnDestroy(): void {
    this.stopStreaming();
  }

  protected startStreaming(): void {
    this.isStreaming = true;
    this.startGenerateInterval();
    this.startSendInterval();
  }

  protected stopStreaming(): void {
    this.isStreaming = false;
    this.stopGenerateInterval();
    this.stopSendInterval();
  }

  protected startGenerateInterval(): void {
    this.generateInterval = setInterval(() => {
      if (this.isStreaming) {
        this.addToBuffer(this.getData());
      }
    }, this.generatePeriod);
  }

  protected stopGenerateInterval(): void {
    clearInterval(this.generateInterval);
  }

  protected startSendInterval(): void {
    this.sendInterval = setInterval(() => {
      if (this.isStreaming && this.buffer.length > 0) {
        this.sendData();
        this.buffer = [];
      }
    }, this.sendPeriod);
  }

  protected stopSendInterval(): void {
    clearInterval(this.sendInterval);
  }

  public updateGenerateInterval(): void {
    this.stopGenerateInterval();
    this.startGenerateInterval();
  }

  protected updateSendInterval(): void {
    this.stopStreaming();
    this.startStreaming();
  }

  protected getData(): any {
    // Implement this method in the derived classes to get the data
    return {};
  }

  protected sendData(): void {
    // Implement this method in the derived classes to send the data via socket
  }

  protected addToBuffer(data: any): void {
    this.buffer.push({ ...data, ts: Date.now() });
  }

  protected validateInput() {
    if (this.generatePeriod > this.MAX_GENERATE_PERIOD_MS) {
      this.generatePeriod = this.MAX_GENERATE_PERIOD_MS;
    }
    if (this.sendPeriod > this.MAX_SEND_PERIOD_MS) {
      this.sendPeriod = this.MAX_SEND_PERIOD_MS;
    }
    if (this.generatePeriod < this.MIN_GENERATE_PERIOD_MS) {
      this.generatePeriod = this.MIN_GENERATE_PERIOD_MS;
    }
    if (this.sendPeriod < this.MIN_SEND_PERIOD_MS) {
      this.sendPeriod = this.MIN_SEND_PERIOD_MS;
    }
  }
}
