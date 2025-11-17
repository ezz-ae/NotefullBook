# NotefullBook OS Architecture

This document summarizes how the core components of the repo map to the Forgetting Core Thinking (FCT) framework.

## Key Flows

1. **Behavior → Frequency → Schema Survival**
   - BehaviorLog records abstract events (no content).
   - CognitiveLightingBackend turns recent entries into activated concept nodes.
   - SchemaIntelligenceNetwork tracks nodes over time and computes survival scores.

2. **Survival → Simplification → Forgetting**
   - Cognitive Simplification Engine classifies concepts as core / support / noise.
   - Active Forgetting Artifact decides what to keep, compress, or delete.

3. **NotebookML & Reflection**
   - NotebookML defines each notebook's purpose, ethics, and reflection mode.
   - Reflection policies determine how often to run deep cognitive cleanup.

## Safety by Architecture

- No content-based personalization.
- All learning is schema-level and behavior-derived.
- Forgetting is first-class: the system is engineered to decay.
