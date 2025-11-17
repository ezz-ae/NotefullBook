import { NotebookDefinition } from './notebookTypes';

/**
 * Extremely simple NotebookML-style parser.
 * In real life this would be a proper grammar; here it's a structured Markdown convention.
 *
 * Example:
 *   # Notebook: Trading Journal
 *   Purpose: Track learning, not PnL.
 *   Ethics:
 *     - No revenge trades
 *     - No copy trading without understanding
 *   Metrics:
 *     - Weekly review
 *   Reflection: micro
 */
export function parseNotebookML(source: string): NotebookDefinition {
  const lines = source.split(/\r?\n/).map(l => l.trim());

  const titleLine = lines.find(l => l.toLowerCase().startsWith('# notebook'));
  const title = titleLine ? titleLine.split(':').slice(1).join(':').trim() : 'Untitled Notebook';

  const purposeLine = lines.find(l => l.toLowerCase().startsWith('purpose:'));
  const purpose = purposeLine ? purposeLine.split(':').slice(1).join(':').trim() : '';

  const ethics: string[] = [];
  const metrics: string[] = [];
  let reflectionPolicy: 'micro' | 'meso' | 'macro' = 'micro';

  let mode: 'ethics' | 'metrics' | null = null;
  for (const line of lines) {
    if (line.toLowerCase().startsWith('ethics')) {
      mode = 'ethics';
      continue;
    }
    if (line.toLowerCase().startsWith('metrics')) {
      mode = 'metrics';
      continue;
    }
    if (line.toLowerCase().startsWith('reflection:')) {
      const v = line.split(':').slice(1).join(':').trim().toLowerCase();
      if (v === 'meso' || v === 'macro') reflectionPolicy = v;
      continue;
    }
    if (line.startsWith('- ')) {
      if (mode === 'ethics') ethics.push(line.slice(2).trim());
      if (mode === 'metrics') metrics.push(line.slice(2).trim());
    }
  }

  return {
    id: `nb_${Math.random().toString(36).slice(2)}`,
    title,
    purpose,
    ethics,
    metrics,
    reflectionPolicy
  };
}
