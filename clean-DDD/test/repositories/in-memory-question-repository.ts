import { PaginateParams } from "@/core/repositories/pagination-params";
import { QuestionAttachmentRepository } from "@/domain/forum/application/repositories/question-attachment-repository";
import { QuestionRepository } from "@/domain/forum/application/repositories/question-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestionRepository implements QuestionRepository {
    items: Question[] = [];

    constructor(
        private questionAttachmentRepository: QuestionAttachmentRepository,
    ) {}

    async create(question: Question): Promise<void> {
        this.items.push(question); 
    }

    async findBySlug(slug: string): Promise<Question | null> {
        const question = this.items.find(item => item.slug.value === slug);
        return question || null;
    }

    async findById(id: string): Promise<Question | null> {
        const question = this.items.find(item => item.id.toString() === id);
        return question || null;
    }

    async delete(question: Question): Promise<void> {
        const itemIndex = this.items.findIndex(item => item.id === question.id);
        this.items.splice(itemIndex, 1);
        this.questionAttachmentRepository.deleteManyByQuestionId(question.id.toString());
    }
    
    async save(question: Question): Promise<void> {
        const itemIndex = this.items.findIndex(item => item.id === question.id);
        this.items[itemIndex] = question;
    }

    async findManyRecent({ page }: PaginateParams): Promise<Question[]> {
        const questions = this.items
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            .slice((page - 1) * 20, page * 20);
        return questions;
    }
}