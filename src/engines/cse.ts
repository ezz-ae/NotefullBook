import { SchemaSurvivalScore } from './sinlm';

export interface SimplifiedConcept {
  id: string;
  importance: number;
  role: 'core' | 'support' | 'noise';
}

/**
 * Cognitive Simplification Engine:
 * takes survival scores and decides what is core vs support vs removable noise.
 */
export function simplifySchemas(
  scores: SchemaSurvivalScore[]
): SimplifiedConcept[] {
  if (scores.length === 0) return [];

  const maxScore = scores[0].totalScore || 1;

  return scores.map(s => {
    const importance = s.totalScore / maxScore;
    let role: 'core' | 'support' | 'noise';

    if (importance > 0.66) role = 'core';
    else if (importance > 0.2) role = 'support';
    else role = 'noise';

    return {
      id: s.conceptId,
      importance,
      role
    };
  });
}
