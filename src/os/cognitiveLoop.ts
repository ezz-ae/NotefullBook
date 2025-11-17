import { CognitiveLightingBackend } from '../engines/clb';
import { SchemaIntelligenceNetwork } from '../engines/sinlm';
import { simplifySchemas } from '../engines/cse';
import { computeForgettingDecisions } from '../engines/afa';
import { BehaviorLog, BehaviorEvent } from './behaviorLog';
import { NotebookEntry } from '../notebookml/notebookTypes';

export interface CognitiveLoopSnapshot {
  behaviors: BehaviorEvent[];
  simplifiedConcepts: ReturnType<typeof simplifySchemas>;
  forgettingDecisions: ReturnType<typeof computeForgettingDecisions>;
}

/**
 * CognitiveLoop orchestrates:
 * 1) Lighting (CLB)
 * 2) Learning (SINLM)
 * 3) Simplification (CSE)
 * 4) Forgetting (AFA)
 */
export class CognitiveLoop {
  private clb = new CognitiveLightingBackend();
  private sinlm = new SchemaIntelligenceNetwork();
  private behaviorLog = new BehaviorLog();

  recordBehavior(event: Omit<BehaviorEvent, 'id'>): void {
    this.behaviorLog.log(event);
  }

  run(entries: NotebookEntry[]): CognitiveLoopSnapshot {
    const now = new Date();

    // 1. Lighting
    const litNodes = this.clb.light(entries, { now });

    // 2. Learning
    this.sinlm.recordSnapshot(litNodes);
    const scores = this.sinlm.computeScores();

    // 3. Simplification
    const simplified = simplifySchemas(scores);

    // 4. Forgetting
    const forgettingDecisions = computeForgettingDecisions(simplified);

    return {
      behaviors: this.behaviorLog.recent(50),
      simplifiedConcepts: simplified,
      forgettingDecisions
    };
  }
}
