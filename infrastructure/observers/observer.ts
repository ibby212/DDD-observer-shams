import type { DomainEvent } from "../../domain/events/events.js";

// The observer now strictly depends on the DomainEvent union, NOT the Account!
export type Observer = (event: DomainEvent) => void;