import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import { DateTime } from 'luxon';

@Component({
  selector: 'mouse-pos-graph',
  template: `
    <div class="chart-container">
      <canvas #chartCanvas></canvas>
    </div>
  `,
  styles: [
    `
      .chart-container {
        width: 100%;
        height: 400px; /* Adjust the height as needed */
      }
    `,
  ],
})
export class MousePositionGraphComponent implements AfterViewInit {
  @ViewChild('chartCanvas')
  private chartCanvas!: ElementRef<HTMLCanvasElement>;
  private chart: Chart | undefined;
  private data: ChartData = {
    datasets: [
      {
        label: 'Mouse Position X',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: false,
      },
      {
        label: 'Mouse Position Y',
        data: [],
        borderColor: 'rgba(32,40,169,1)',
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  private options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Mouse Positions',
        position: 'top',
      },
    },
  };

  ngAfterViewInit(): void {
    Chart.register(...registerables);
    const canvas = this.chartCanvas.nativeElement.getContext('2d');
    if (canvas) {
      this.chart = new Chart(canvas, {
        type: 'line',
        data: this.data,
        options: this.options,
      });
    }
  }

  public updateData(newData: { x: number; y: number; ts: number }[]): void {
    const xValues = newData.map((item) =>
      DateTime.fromMillis(item.ts).toFormat('HH:mm:ss:SSS')
    );
    const mousePosX = newData.map((item) => item.x);
    const mousePosY = newData.map((item) => item.y);

    this.data.labels = xValues;
    this.data.datasets[0].data = mousePosX;
    this.data.datasets[1].data = mousePosY;

    this.chart?.update();
  }
}
