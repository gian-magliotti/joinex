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

export type LevelDetail = {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  steps: LevelStep[];
};

export interface ValidationResult {
  correct: boolean;
  message: string;
  data: any[]; // The SQL result rows
}

export interface JobResponse {
  jobId: string;
}