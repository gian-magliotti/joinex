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

export type ValidationResult = {
  correct: boolean;
  message: string;
  results: any[]; 
};