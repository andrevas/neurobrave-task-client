import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import { DateTime } from 'luxon';

@Component({
  selector: 'cpu-load-graph',
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
export class CpuLoadGraphComponent implements AfterViewInit {
  @ViewChild('chartCanvas')
  protected chartCanvas!: ElementRef<HTMLCanvasElement>;

  public chart: Chart | undefined;
  private data: ChartData = {
    datasets: [
      {
        label: 'CPU Load',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
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
        text: 'CPU Load',
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

  public updateData(newData: { load: number; ts: number }[]): void {
    const xValues = newData.map((item) =>
      DateTime.fromMillis(item.ts).toFormat('HH:mm:ss:SSS')
    );
    const yValues = newData.map((item) => item.load);

    this.data.labels = xValues;
    this.data.datasets[0].data = yValues;

    this.chart?.update();
  }
}
