export interface TableColumn {
  key: string;
  label: string;
  minWidth?: number;
  isContent?: boolean;
  align?: 'start' | 'center' | 'end';
}
