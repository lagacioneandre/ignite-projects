import { Either, left, right } from '@/core/either';
import { Question } from '../../enterprise/entities/question';
import { QuestionRepository } from '../repositories/question-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { NotAllowedError } from './errors/not-allowed-error';
import { QuestionAttachmentRepository } from '../repositories/question-attachment-repository';
import { QuestionAttachmentList } from '../../enterprise/entities/question-attachment-list';
import { QuestionAttachment } from '../../enterprise/entities/question-attachment';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

interface EditQuestionUseCaseRequest {
    authorId: string;
    questionId: string;
    title: string;
    content: string;
    attachmentIds: string[];
}

type EditQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, { question: Question }>;

export class EditQuestionUseCase {

    constructor (
        private questionRepository: QuestionRepository,
        private questionAttachmentRepository: QuestionAttachmentRepository
    ) {}

    async execute({ authorId, questionId, title, content, attachmentIds }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
        const question = await this.questionRepository.findById(questionId);
        if (!question) return left(new ResourceNotFoundError());
        if (authorId !== question.authorId.toString()) return left(new NotAllowedError());
        const currentQuestionAttachment = await this.questionAttachmentRepository.findManyByQuestionId(questionId);
        const questionAttachmentList = new QuestionAttachmentList(currentQuestionAttachment);
        const questionAttachments = attachmentIds.map(item => {
            return QuestionAttachment.create({
                attachmentId: new UniqueEntityId(item),
                questionId: question.id
            });
        });
        questionAttachmentList.update(questionAttachments);
        question.attachments = questionAttachmentList;
        question.title = title;
        question.content = content;
        await this.questionRepository.save(question);
        return right({ question });
    }
}