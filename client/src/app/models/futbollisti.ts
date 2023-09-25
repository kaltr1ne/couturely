// File: Futbollisti.ts in models folder
export interface Footballer {
    id: number;
    emri: string;
    skuadra: string;
  }

  export interface FutbollistiParams {
    emri: string[];
    skuadra: string[];
    pageNumber: number;
    pageSize: number;
}