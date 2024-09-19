import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Question } from '../../enterprise/entities/question';
import { QuestionRepository } from '../repositories/question-repository';
import { Either, right } from '@/core/either';
import { QuestionAttachment } from '../../enterprise/entities/question-attachment';
import { QuestionAttachmentList } from '../../enterprise/entities/question-attachment-list';

interface CreateQuestionUseCaseRequest {
    authorId: string;
    title: string;
    content: string;
    attachmentIds: string[];
}

type CreateQuestionUseCaseResponse = Either<null, { question: Question }>;

export class CreateQuestionUseCase {

    constructor (
        private questionRepository: QuestionRepository
    ) {}

    async execute({ authorId, title, content, attachmentIds }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
        const question = Question.create({
            authorId: new UniqueEntityId(authorId),
            title,
            content,
        });
        const questionAttachments = attachmentIds.map(item => {
            return QuestionAttachment.create({
                attachmentId: new UniqueEntityId(item),
                questionId: question.id,
            });
        });
        question.attachments = new QuestionAttachmentList(questionAttachments);
        await this.questionRepository.create(question);
        return right({ question });
    }
}