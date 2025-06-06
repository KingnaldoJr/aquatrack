import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { ChartData } from '../usage-by-house-chart/usage-by-house-chart.component';

@Component({
  selector: 'app-usage-over-time-chart',
  standalone: true,
  imports: [CommonModule],
  template: '<canvas #chartCanvas></canvas>',
  styleUrl: './usage-over-time-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsageOverTimeChartComponent
  implements OnChanges, AfterViewInit, OnDestroy
{
  @Input() chartData: ChartData | null = null;
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  private chartInstance: Chart | null = null;

  ngAfterViewInit(): void {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chartData'] && this.chartInstance) {
      this.updateChart();
    }
  }

  ngOnDestroy(): void {
    this.chartInstance?.destroy();
  }

  private createChart(): void {
    if (!this.chartCanvas || !this.chartData) return;

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    this.chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.chartData.labels,
        datasets: [
          {
            label: 'Usage (L)',
            data: this.chartData.data,
            fill: true,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Total Consumption (L)',
            },
          },
          x: {
            title: {
              display: true,
              text: 'Month',
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }

  private updateChart(): void {
    if (!this.chartInstance || !this.chartData) return;

    this.chartInstance.data.labels = this.chartData.labels;
    this.chartInstance.data.datasets[0].data = this.chartData.data;
    this.chartInstance.update();
  }
}
