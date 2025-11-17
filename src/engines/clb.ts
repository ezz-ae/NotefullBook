import { NotebookEntry } from '../notebookml/notebookTypes';

export interface ConceptNode {
  id: string;
  label: string;
  activation: number;
  lastActivatedAt: Date;
}

export interface LightingContext {
  now: Date;
  focusNotebookId?: string;
}

export class CognitiveLightingBackend {
  private nodes = new Map<string, ConceptNode>();

  /** Light up nodes based on the latest entries. */
  light(entries: NotebookEntry[], ctx: LightingContext): ConceptNode[] {
    for (const entry of entries) {
      const tokens = this.tokenize(entry.rawText);
      for (const token of tokens) {
        const id = token.toLowerCase();
        const existing = this.nodes.get(id);
        if (existing) {
          const updated: ConceptNode = {
            ...existing,
            activation: existing.activation + 1,
            lastActivatedAt: ctx.now
          };
          this.nodes.set(id, updated);
        } else {
          this.nodes.set(id, {
            id,
            label: token,
            activation: 1,
            lastActivatedAt: ctx.now
          });
        }
      }
    }

    // return hottest nodes
    return [...this.nodes.values()].sort((a, b) => b.activation - a.activation);
  }

  getSnapshot(): ConceptNode[] {
    return [...this.nodes.values()];
  }

  private tokenize(text: string): string[] {
    return text
      .toLowerCase()
      .split(/[^a-z0-9_]+/i)
      .filter(Boolean);
  }
}
