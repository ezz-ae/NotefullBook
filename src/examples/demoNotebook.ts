import { NotefullBookOS } from '../os';
import { NotebookEntry } from '../notebookml/notebookTypes';

async function main() {
  const os = new NotefullBookOS();

  const nbDef = os.createNotebookFromML(`
# Notebook: Trading Journal
Purpose: Track learning, not profit.
Ethics:
  - No revenge trades
  - No trading when emotionally unstable
Metrics:
  - Weekly review
Reflection: meso
  `);

  console.log('Notebook created:', nbDef);

  const entries: NotebookEntry[] = [
    {
      id: 'e1',
      notebookId: nbDef.id,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      rawText: 'Today I overtraded because I chased a breakout on BTC.',
      tags: ['overtrading', 'emotion', 'btc']
    },
    {
      id: 'e2',
      notebookId: nbDef.id,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
      rawText: 'I respected my stop-loss and did not add to a losing ETH position.',
      tags: ['discipline', 'stop-loss', 'eth']
    },
    {
      id: 'e3',
      notebookId: nbDef.id,
      createdAt: new Date(),
      rawText: 'Skipped a tempting scalp because market structure was unclear.',
      tags: ['patience', 'discipline', 'risk']
    }
  ];

  const snapshot = os.runCognitiveCycle(entries);

  console.log('\n--- Cognitive Loop Snapshot ---');
  console.log('Behaviors:', snapshot.behaviors);
  console.log('\nSimplified Concepts:', snapshot.simplifiedConcepts);
  console.log('\nForgetting Decisions:', snapshot.forgettingDecisions);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
