import { DomainEvents } from "@/core/events/domain-events";
import { EventHandler } from "@/core/events/event-handler";
import { QuestionRepository } from "@/domain/forum/application/repositories/question-repository";
import { AnswerCreatedEvent } from "@/domain/forum/events/answer-created-event";
import { SendNotificationUseCase } from "../application/use-cases/send-notification";
import { AnswerRepository } from "@/domain/forum/application/repositories/answer-repository";
import { QuestionBestAnswerChoosenEnvet } from "@/domain/forum/events/question-best-answer-choosen-envet";

export class OnQuestionBestAnswerChoosen implements EventHandler {

    constructor(
        private answerRepository: AnswerRepository,
        private sendNotification: SendNotificationUseCase,
    ) {
        this.setupSubscriptions()
    }

    setupSubscriptions(): void {
        DomainEvents.register(
            this.sendQuestionBestAnswerNotification.bind(this),
            QuestionBestAnswerChoosenEnvet.name,
        );
    }

    private async sendQuestionBestAnswerNotification({ question, bestAnswerId }: QuestionBestAnswerChoosenEnvet) {
        const answer = await this.answerRepository.findById(bestAnswerId.toString());
        if (!answer) return;
        await this.sendNotification.execute({
            recipientId: answer.authorId.toString(),
            title: 'Sua resposta foi escolhida',
            content: `A resposta que voce enviou em "${question.title.substring(0, 20).concat('...')}" fois escolhida pelo autor.`,
        });
    }

}