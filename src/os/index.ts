import { parseNotebookML } from '../notebookml/parser';
import { NotebookEntry } from '../notebookml/notebookTypes';
import { CognitiveLoop, CognitiveLoopSnapshot } from './cognitiveLoop';

export class NotefullBookOS {
  private loop = new CognitiveLoop();

  createNotebookFromML(source: string) {
    return parseNotebookML(source);
  }

  runCognitiveCycle(entries: NotebookEntry[]): CognitiveLoopSnapshot {
    // log basic behaviors (privacy-centric, no raw text)
    for (const e of entries) {
      this.loop.recordBehavior({
        type: 'note_created',
        conceptHints: e.tags,
        createdAt: e.createdAt
      });
    }
    return this.loop.run(entries);
  }
}
