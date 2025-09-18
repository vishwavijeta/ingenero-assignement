export interface ElementPart {
  position: number;
  id: string;
  status?: 'ready-for-repair' | 'ready-for-assemble' | 'default';
  isSelected?: boolean;
}

export interface Electrolyzer {
  id: number;
  elements: ElementPart[];
}

export interface ChecklistItem {
  id: string;
  label: string;
  isSelected: boolean;
}

export interface Comment {
  elementId: string;
  comment: string;
}
