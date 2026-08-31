
export enum NavPage {
  LOGIN = 'login',
  DASHBOARD = 'dashboard',
  AI_INSIGHTS = 'ai-insights',
  FINANCIAL = 'financial',
  LOTS = 'lots',
  INVENTORY = 'inventory',
  OPERATIONS = 'operations',
  SETTINGS = 'settings'
}

export type Language = 'es' | 'en';

export interface CropLot {
  id: string;
  name: string;
  sector: string;
  variety: string;
  plantedDate: string;
  maturity: number;
  status: 'active' | 'nearing-harvest' | 'harvested';
  imageUrl: string;
}

export interface Transaction {
  id: string;
  reference: string;
  category: string;
  date: string;
  amount: number;
  status: 'completed' | 'pending';
  description: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  type: 'Insecticide' | 'Fertilizer';
  stock: number;
  unit: string;
  price: number;
  description: string;
}

export interface Activity {
  id: number;
  id_lote: number;
  tipo_operacion: string;
  fecha: string;
  estado: string;
  lote_nombre: string;
  lote_ubicacion: string;
}
