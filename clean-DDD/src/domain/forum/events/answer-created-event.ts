import { DomainEvent } from "@/core/events/domain-event";
import { Answer } from "../enterprise/entities/answer";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

export class AnswerCreatedEvent implements DomainEvent {
    ocurredAt: Date;
    answer: Answer;

    constructor(anser: Answer) {
        this.answer = anser;
        this.ocurredAt = new Date();
    }

    getAggregateId(): UniqueEntityId {
        return this.answer.id;
    }
}