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

export interface ChartData {
  labels: string[];
  data: number[];
}

@Component({
  selector: 'app-usage-by-house-chart',
  standalone: true,
  imports: [CommonModule],
  template: '<canvas #chartCanvas></canvas>',
  styleUrl: './usage-by-house-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsageByHouseChartComponent
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
      type: 'bar',
      data: {
        labels: this.chartData.labels,
        datasets: [
          {
            label: 'Usage (L)', // Adjust label as needed
            data: this.chartData.data,
            backgroundColor: 'rgba(54, 162, 235, 0.6)', // Blue bars
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
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
              text: 'Consumption (L)',
            },
          },
          x: {
            title: {
              display: true,
              text: 'House',
            },
          },
        },
        plugins: {
          legend: {
            display: false, // Hide legend as per prototype
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
