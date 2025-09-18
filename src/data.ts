import type { Electrolyzer, ChecklistItem } from './types';

export const electrolyzerIds = [6310, 6345, 6350, 6388, 6392];

export const elementIds = [
  { position: 1, id: "TC-080" },
  { position: 2, id: "1869" },
  { position: 3, id: "BR-307" },
  { position: 4, id: "2765" },
  { position: 5, id: "BR-165" },
  { position: 6, id: "1716" },
  { position: 7, id: "2013" },
  { position: 8, id: "2435" },
  { position: 9, id: "2329" },
  { position: 10, id: "2341" },
  { position: 11, id: "1863" },
  { position: 12, id: "BR-201" },
  { position: 13, id: "TA-134" },
];

export const checklistItems: ChecklistItem[] = [
  { id: "anolyte-leaker", label: "Anolyte Leaker", isSelected: false },
  { id: "catholyte-leaker", label: "Catholyte Leaker", isSelected: false },
  { id: "nozzle-1-1.5", label: "1-1.5\" Nozzle", isSelected: false },
  { id: "nozzle-2", label: "2\" Nozzle", isSelected: false },
  { id: "nozzle-4", label: "4\" Nozzle", isSelected: false },
  { id: "nozzle-8", label: "8\" Nozzle", isSelected: false },
  { id: "cathode-screens", label: "Cathode screens", isSelected: false },
  { id: "cathode-perimeter-screens", label: "Cathode perimeter screens", isSelected: false },
  { id: "gasket-surface", label: "Gasket surface", isSelected: false },
  { id: "dye-check-coupling", label: "Dye-Check Coupling", isSelected: false },
  { id: "outside-steel", label: "Outside Steel", isSelected: false },
  { id: "hydrogen-chamber", label: "Hydrogen Chamber", isSelected: false },
  { id: "hydrogen-box", label: "Hydrogen Box", isSelected: false },
  { id: "hydrogen-channel", label: "Hydrogen Channel", isSelected: false },
  { id: "anode-studs-alignment", label: "Anode Studs / Alignmnet", isSelected: false },
];

// Create electrolyzers with elements
export const electrolyzers: Electrolyzer[] = electrolyzerIds.map(id => ({
  id,
  elements: elementIds.map(element => ({
    ...element,
    status: 'default' as const,
    isSelected: false
  }))
}));
