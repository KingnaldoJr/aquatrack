import { Directive, inject, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appColumnContent]',
})
export class ColumnContentDirective {
  @Input('appColumnContent') columnKey!: string;
  public template = inject(TemplateRef<unknown>);
}
