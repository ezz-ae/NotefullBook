export interface NotebookDefinition {
  id: string;
  title: string;
  purpose: string;
  ethics: string[];
  metrics: string[];
  reflectionPolicy: 'micro' | 'meso' | 'macro';
}

export interface NotebookEntry {
  id: string;
  notebookId: string;
  createdAt: Date;
  rawText: string;
  tags: string[];
}
