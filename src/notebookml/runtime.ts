import { NotebookDefinition, NotebookEntry } from './notebookTypes';

export interface ReflectionSignal {
  notebookId: string;
  level: 'micro' | 'meso' | 'macro';
  reason: string;
}

/**
 * Decide when to trigger reflection based on notebook policy + entry stats.
 */
export function computeReflectionSignals(
  notebook: NotebookDefinition,
  entries: NotebookEntry[]
): ReflectionSignal[] {
  const signals: ReflectionSignal[] = [];
  const count = entries.length;

  if (count === 0) return signals;

  // simple heuristics:
  if (notebook.reflectionPolicy === 'micro') {
    signals.push({
      notebookId: notebook.id,
      level: 'micro',
      reason: 'micro policy: reflect on every new entry batch'
    });
  }

  if (notebook.reflectionPolicy !== 'micro' && count % 5 === 0) {
    signals.push({
      notebookId: notebook.id,
      level: notebook.reflectionPolicy,
      reason: `${notebook.reflectionPolicy} policy: reflect every 5 entries`
    });
  }

  return signals;
}
