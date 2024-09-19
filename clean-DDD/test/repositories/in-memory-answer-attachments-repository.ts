import { AnswerAttachmentRepository } from "@/domain/forum/application/repositories/answer-attachment-repository";
import { AnswerAttachment } from "@/domain/forum/enterprise/entities/answer-attachment";

export class InMemoryAnswerAttachmentRepository implements AnswerAttachmentRepository {
    items: AnswerAttachment[] = [];

    async findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
        const answerAttachments = this.items
            .filter(item => item.answerId.toString() === answerId);
        return answerAttachments;
    }

    async deleteManyByAnswerId(answerId: string): Promise<void> {
        const answerAttachments = this.items
            .filter(item => item.answerId.toString() !== answerId);
        this.items = answerAttachments;
    }
}
