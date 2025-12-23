export interface FigureDeStyle {
  nom: string;
  definition: string;
  exemple: string;
}

export interface Module {
  id: string;
  titre: string;
  description: string;
  figures: FigureDeStyle[];
  isRecap: boolean;
  requiredModules?: string[];
  minPercentage?: number;
  isLocked?: boolean;
}

export interface Question {
  question: string;
  reponses: string[];
  correct: number;
  explication: string;
  indice: string;
}

export interface ExerciceModule {
  moduleId: string;
  questions: Question[];
}
