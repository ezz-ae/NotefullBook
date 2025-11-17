/**
 * Behavior log is privacy-centric:
 * we only store abstract events (frequency of interaction),
 * never the full content.
 */

export type BehaviorEventType =
  | 'note_created'
  | 'note_viewed'
  | 'search_performed'
  | 'reflection_triggered';

export interface BehaviorEvent {
  id: string;
  type: BehaviorEventType;
  conceptHints: string[]; // small tokens, never full text
  createdAt: Date;
}

export class BehaviorLog {
  private events: BehaviorEvent[] = [];

  log(event: Omit<BehaviorEvent, 'id'>): BehaviorEvent {
    const full: BehaviorEvent = {
      ...event,
      id: `ev_${Math.random().toString(36).slice(2)}`
    };
    this.events.push(full);
    return full;
  }

  recent(limit = 100): BehaviorEvent[] {
    return this.events.slice(-limit);
  }
}
