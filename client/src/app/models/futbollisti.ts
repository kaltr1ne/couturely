// File: Futbollisti.ts
export interface Footballer {
    id: number;
    emri: string;
    skuadra: string;
  }

  export interface FutbollistiParams {
    orderBy: string;
    searchTerm?: string;
    emri: string[];
    skuadra: string[];
    pageNumber: number;
    pageSize: number;
}
  