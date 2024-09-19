import { PaginateParams } from "@/core/repositories/pagination-params";
import { AnswerAttachmentRepository } from "@/domain/forum/application/repositories/answer-attachment-repository";
import { AnswerRepository } from "@/domain/forum/application/repositories/answer-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswerRepository implements AnswerRepository {
    items: Answer[] = [];

    constructor(
        private answerAttachmentRepository: AnswerAttachmentRepository,
    ) {}

    async create(answer: Answer): Promise<void> {
        this.items.push(answer); 
    }

    async findById(id: string): Promise<Answer | null> {
        const answer = this.items.find(item => item.id.toString() === id);
        return answer || null;
    }

    async delete(answer: Answer): Promise<void> {
        const itemIndex = this.items.findIndex(item => item.id === answer.id);
        this.items.splice(itemIndex, 1);
        this.answerAttachmentRepository.deleteManyByAnswerId(answer.id.toString());
    }
    
    async save(answer: Answer): Promise<void> {
        const itemIndex = this.items.findIndex(item => item.id === answer.id);
        this.items[itemIndex] = answer;
    }

    async findManyByQuestionId(questionId: string, { page }: PaginateParams): Promise<Answer[]> {
        const answers = this.items
            .filter(item => item.questionId.toString() === questionId)
            .slice((page - 1) * 20, page * 20);
        return answers;
    }
}