import { DomainEvent } from "@/core/events/domain-event";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Question } from "../enterprise/entities/question";

export class QuestionBestAnswerChoosenEnvet implements DomainEvent {
    ocurredAt: Date;
    question: Question;
    bestAnswerId: UniqueEntityId;

    constructor(question: Question, bestAnswerId: UniqueEntityId) {
        this.question = question;
        this.bestAnswerId = bestAnswerId;
        this.ocurredAt = new Date();
    }

    getAggregateId(): UniqueEntityId {
        return this.question.id;
    }
}