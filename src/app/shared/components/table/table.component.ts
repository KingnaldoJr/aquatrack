import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  HostListener,
  inject,
  Input,
  OnInit,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { TableColumn } from './table-column.model';
import { NgClass, NgStyle, NgTemplateOutlet } from '@angular/common';
import { ColumnContentDirective } from './column-content.directive';

@Component({
  selector: 'app-table',
  imports: [NgTemplateOutlet, NgClass, NgStyle],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit, AfterContentInit {
  @Input() tableColumns: TableColumn[] = [];
  @Input() tableData: Record<string, unknown>[] = [];

  @ContentChildren(ColumnContentDirective)
  contentTemplates!: QueryList<ColumnContentDirective>;

  private templateMap = new Map<string, TemplateRef<unknown>>();

  private elementRef = inject(ElementRef);
  private currentContainerWidth = 0;

  ngOnInit() {
    this.updateContainerWidth();
  }

  ngAfterContentInit() {
    this.contentTemplates.forEach((item) => {
      this.templateMap.set(item.columnKey, item.template);
    });
  }

  getColumnTemplate(column: TableColumn): TemplateRef<unknown> | undefined {
    return column.key ? this.templateMap.get(column.key) : undefined;
  }

  columnShouldBeHidden(minWidth: number | undefined): boolean {
    if (!minWidth) return false;
    return this.currentContainerWidth < minWidth;
  }

  private updateContainerWidth() {
    const tableElement = this.elementRef.nativeElement.querySelector('.table');
    if (tableElement) {
      this.currentContainerWidth = tableElement.offsetWidth;
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.updateContainerWidth();
  }
}
