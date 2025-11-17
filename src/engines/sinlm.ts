import { ConceptNode } from './clb';

export interface SchemaSurvivalScore {
  conceptId: string;
  frequencyScore: number;
  driftScore: number;
  persistenceScore: number;
  totalScore: number;
}

/**
 * Schema Intelligence Network Learning Mechanism (SINLM)
 * learns from *behavior* (activations over time), not content.
 */
export class SchemaIntelligenceNetwork {
  private history = new Map<string, ConceptNode[]>();

  recordSnapshot(nodes: ConceptNode[]): void {
    const now = new Date();
    for (const node of nodes) {
      const arr = this.history.get(node.id) ?? [];
      arr.push({ ...node, lastActivatedAt: now });
      this.history.set(node.id, arr);
    }
  }

  computeScores(): SchemaSurvivalScore[] {
    const scores: SchemaSurvivalScore[] = [];
    for (const [conceptId, snapshots] of this.history.entries()) {
      if (snapshots.length === 0) continue;

      const frequencyScore = snapshots.length;

      // naive drift: change in activation
      const first = snapshots[0].activation;
      const last = snapshots[snapshots.length - 1].activation;
      const driftScore = Math.abs(last - first);

      // persistence: how many distinct days it appears on
      const days = new Set(
        snapshots.map(s =>
          s.lastActivatedAt.toISOString().slice(0, 10)
        )
      ).size;
      const persistenceScore = days;

      const totalScore =
        frequencyScore * 0.5 + driftScore * 0.2 + persistenceScore * 0.3;

      scores.push({
        conceptId,
        frequencyScore,
        driftScore,
        persistenceScore,
        totalScore
      });
    }

    return scores.sort((a, b) => b.totalScore - a.totalScore);
  }
}
