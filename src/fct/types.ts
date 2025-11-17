export type TagIntensity = 'low' | 'medium' | 'high';

export interface EventTag {
  id: string;
  label: string;
  intensity: TagIntensity;
  createdAt: Date;
}

export interface FrequencySignal {
  conceptId: string;
  count: number;
  lastSeenAt: Date;
  driftScore: number;      // how much the concept has changed in context
  persistenceScore: number; // how long it survives without direct use
}

export interface Schema {
  id: string;
  label: string;
  description: string;
  tags: EventTag[];
  frequency: FrequencySignal;
}

export interface RecallContext {
  now: Date;
  purpose: 'self' | 'example' | 'theory';
  urgency: 'low' | 'medium' | 'high';
  safetyLevel: 'default' | 'softened' | 'strict';
}

export interface ReconstructedMemory {
  schemaId: string;
  narrative: string;
  softened: boolean;
  confidence: number; // 0..1
}
