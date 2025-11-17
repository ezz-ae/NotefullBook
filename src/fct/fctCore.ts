import { EventTag, RecallContext, ReconstructedMemory, Schema } from './types';

/**
 * Apply Emotional Softening Filter (ESF):
 * reduce intensity of older tags so recall never revives full past pain.
 */
export function softenTags(schema: Schema, now: Date): Schema {
  const softenedTags = schema.tags.map(tag => {
    const ageDays =
      (now.getTime() - tag.createdAt.getTime()) / (1000 * 60 * 60 * 24);
    let intensity = tag.intensity;

    if (ageDays > 365 && intensity === 'high') intensity = 'medium';
    if (ageDays > 5 * 365 && intensity === 'medium') intensity = 'low';

    return { ...tag, intensity };
  });

  return { ...schema, tags: softenedTags };
}

/**
 * Interpretive Recall Layer (IRL):
 * decides how “far” we’re allowed to go when reconstructing memory.
 */
export function interpretiveRecall(
  schema: Schema,
  ctx: RecallContext
): ReconstructedMemory {
  const softenedSchema =
    ctx.safetyLevel === 'strict' ? softenTags(schema, ctx.now) : schema;

  const strongestTag = softenedSchema.tags[0]?.label ?? softenedSchema.label;

  let baseConfidence = 0.7;
  if (ctx.urgency === 'high') baseConfidence += 0.1;
  if (ctx.purpose === 'example') baseConfidence -= 0.1;

  const narrative = `Reconstructed view of "${softenedSchema.label}" focused on "${strongestTag}". ` +
    `This is a present-time simulation, not an exact replay of the original event.`;

  return {
    schemaId: softenedSchema.id,
    narrative,
    softened: ctx.safetyLevel !== 'default',
    confidence: Math.max(0, Math.min(1, baseConfidence))
  };
}

/**
 * Meaning-First Retrieval (MFR):
 * choose which schemas to retrieve based on pattern/meaning, not raw event similarity.
 */
export function rankSchemasByMeaning(
  schemas: Schema[],
  query: string
): Schema[] {
  const q = query.toLowerCase();
  return [...schemas].sort((a, b) => {
    const scoreA = meaningScore(a, q);
    const scoreB = meaningScore(b, q);
    return scoreB - scoreA;
  });
}

function meaningScore(schema: Schema, q: string): number {
  let score = 0;
  if (schema.label.toLowerCase().includes(q)) score += 2;
  if (schema.description.toLowerCase().includes(q)) score += 1;

  const tagHit = schema.tags.some(t => t.label.toLowerCase().includes(q));
  if (tagHit) score += 1.5;

  // frequency as proxy for schema survival
  score += schema.frequency.count * 0.05;
  score += schema.frequency.persistenceScore * 0.2;

  return score;
}
