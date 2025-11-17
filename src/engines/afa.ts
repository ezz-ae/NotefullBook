import { SimplifiedConcept } from './cse';

export interface ForgettingDecision {
  id: string;
  action: 'keep' | 'compress' | 'delete';
}

/**
 * Active Forgetting Artifact (AFA):
 * from simplified concepts, decide what to keep, compress, or delete.
 */
export function computeForgettingDecisions(
  concepts: SimplifiedConcept[]
): ForgettingDecision[] {
  return concepts.map(c => {
    let action: ForgettingDecision['action'] = 'keep';
    if (c.role === 'noise') action = 'delete';
    if (c.role === 'support') action = 'compress';
    return { id: c.id, action };
  });
}
