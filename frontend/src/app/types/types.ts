export type Level = {
  id: number;
  title: string;
  description: string;
  difficulty?: string;
};

export type LevelStep = {
  id: number;
  instruction: string;
  hint: string;
};

export interface ColumnSchema {
  name: string;
  type: string;
  pk: boolean;
  fk: boolean;
}

export interface TableSchema {
  name: string;
  columns: ColumnSchema[];
}

export type LevelDetail = {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  steps: LevelStep[];
  schemas: TableSchema[]; 
};

export interface ValidationResult {
  correct: boolean;
  message: string;
  data: any[]; 
}

export interface JobResponse {
  jobId: string;
}